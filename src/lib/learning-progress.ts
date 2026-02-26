/**
 * Learning Progress Tracking System
 * Based on Spaced Repetition and Retrieval Practice research
 */

export interface ArticleProgress {
  articleSlug: string;
  firstReadAt: number;
  lastReadAt: number;
  readCount: number;
  completionPercentage: number;
  timeSpent: number; // in seconds
  quizScores: number[];
  notes: string;
  highlights: Highlight[];
  nextReviewAt: number; // For spaced repetition
}

export interface Highlight {
  id: string;
  text: string;
  position: number;
  note?: string;
  createdAt: number;
}

export interface QuizAttempt {
  articleSlug: string;
  score: number;
  totalQuestions: number;
  answers: Record<string, boolean>;
  timestamp: number;
  timeSpent: number;
}

export interface LearningSession {
  sessionStart: number;
  sessionEnd: number;
  articlesRead: string[];
  quizzesCompleted: string[];
  timeSpent: number;
}

export class LearningProgressManager {
  private storageKey = 'salakcode-learning-progress';
  private sessionKey = 'salakcode-current-session';

  // Get all progress data
  getAllProgress(): Record<string, ArticleProgress> {
    if (typeof window === 'undefined') return {};

    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  // Get progress for a specific article
  getArticleProgress(slug: string): ArticleProgress | null {
    const all = this.getAllProgress();
    return all[slug] || null;
  }

  // Mark article as started
  startArticle(slug: string): void {
    const all = this.getAllProgress();
    const now = Date.now();

    if (!all[slug]) {
      all[slug] = {
        articleSlug: slug,
        firstReadAt: now,
        lastReadAt: now,
        readCount: 0,
        completionPercentage: 0,
        timeSpent: 0,
        quizScores: [],
        notes: '',
        highlights: [],
        nextReviewAt: this.calculateNextReview(now, 0),
      };
    }

    all[slug].lastReadAt = now;
    this.saveProgress(all);
    this.startSession();
  }

  // Update reading progress
  updateReadingProgress(slug: string, percentage: number, timeSpent: number): void {
    const all = this.getAllProgress();

    if (all[slug]) {
      all[slug].completionPercentage = Math.max(all[slug].completionPercentage, percentage);
      all[slug].timeSpent += timeSpent;

      // Mark as complete if 90%+ read
      if (percentage >= 90 && all[slug].readCount === 0) {
        all[slug].readCount = 1;
        all[slug].nextReviewAt = this.calculateNextReview(Date.now(), 1);
      }

      this.saveProgress(all);
    }
  }

  // Save quiz attempt
  saveQuizAttempt(attempt: QuizAttempt): void {
    const all = this.getAllProgress();

    if (all[attempt.articleSlug]) {
      all[attempt.articleSlug].quizScores.push(attempt.score);
      this.saveProgress(all);
    }
  }

  // Save note
  saveNote(slug: string, note: string): void {
    const all = this.getAllProgress();

    if (all[slug]) {
      all[slug].notes = note;
      this.saveProgress(all);
    }
  }

  // Add highlight
  addHighlight(slug: string, text: string, position: number, note?: string): void {
    const all = this.getAllProgress();

    if (all[slug]) {
      const highlight: Highlight = {
        id: `${Date.now()}-${Math.random()}`,
        text,
        position,
        note,
        createdAt: Date.now(),
      };
      all[slug].highlights.push(highlight);
      this.saveProgress(all);
    }
  }

  // Remove highlight
  removeHighlight(slug: string, highlightId: string): void {
    const all = this.getAllProgress();

    if (all[slug]) {
      all[slug].highlights = all[slug].highlights.filter(h => h.id !== highlightId);
      this.saveProgress(all);
    }
  }

  // Get articles due for review (spaced repetition)
  getDueReviews(): string[] {
    const all = this.getAllProgress();
    const now = Date.now();

    return Object.values(all)
      .filter(p => p.nextReviewAt <= now && p.readCount > 0)
      .sort((a, b) => a.nextReviewAt - b.nextReviewAt)
      .map(p => p.articleSlug);
  }

  // Calculate next review time based on spaced repetition
  private calculateNextReview(lastRead: number, readCount: number): number {
    // SuperMemo-2 style spaced repetition intervals
    const intervals = [
      1 * 24 * 60 * 60 * 1000,      // 1 day
      3 * 24 * 60 * 60 * 1000,      // 3 days
      7 * 24 * 60 * 60 * 1000,      // 1 week
      14 * 24 * 60 * 60 * 1000,     // 2 weeks
      30 * 24 * 60 * 60 * 1000,     // 1 month
      90 * 24 * 60 * 60 * 1000,     // 3 months
    ];

    const index = Math.min(readCount, intervals.length - 1);
    return lastRead + intervals[index];
  }

  // Get learning statistics
  getStats() {
    const all = this.getAllProgress();
    const articles = Object.values(all);

    return {
      articlesRead: articles.filter(a => a.readCount > 0).length,
      articlesInProgress: articles.filter(a => a.readCount === 0 && a.completionPercentage > 0).length,
      totalTimeSpent: articles.reduce((sum, a) => sum + a.timeSpent, 0),
      averageQuizScore: articles.length > 0
        ? articles.flatMap(a => a.quizScores).reduce((sum, s) => sum + s, 0) /
          articles.flatMap(a => a.quizScores).length || 0
        : 0,
      currentStreak: this.calculateStreak(),
      notesCount: articles.reduce((sum, a) => sum + (a.notes ? 1 : 0) + a.highlights.length, 0),
    };
  }

  // Calculate reading streak
  private calculateStreak(): number {
    const sessions = this.getPastSessions();
    if (sessions.length === 0) return 0;

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
      const dateStr = currentDate.toISOString().split('T')[0];
      if (sessions.includes(dateStr)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (i === 0) {
        // Today doesn't count if no session, check yesterday
        currentDate.setDate(currentDate.getDate() - 1);
        continue;
      } else {
        break;
      }
    }

    return streak;
  }

  // Session tracking
  startSession(): void {
    if (typeof window === 'undefined') return;

    const session = {
      sessionStart: Date.now(),
      articlesRead: [] as string[],
      quizzesCompleted: [] as string[],
    };

    localStorage.setItem(this.sessionKey, JSON.stringify(session));
  }

  trackArticleRead(slug: string): void {
    if (typeof window === 'undefined') return;

    const sessionData = localStorage.getItem(this.sessionKey);
    if (sessionData) {
      const session = JSON.parse(sessionData);
      if (!session.articlesRead.includes(slug)) {
        session.articlesRead.push(slug);
        localStorage.setItem(this.sessionKey, JSON.stringify(session));
      }
    }
  }

  trackQuizCompleted(slug: string): void {
    if (typeof window === 'undefined') return;

    const sessionData = localStorage.getItem(this.sessionKey);
    if (sessionData) {
      const session = JSON.parse(sessionData);
      if (!session.quizzesCompleted.includes(slug)) {
        session.quizzesCompleted.push(slug);
        localStorage.setItem(this.sessionKey, JSON.stringify(session));
      }
    }
  }

  endSession(): void {
    if (typeof window === 'undefined') return;

    const sessionData = localStorage.getItem(this.sessionKey);
    if (sessionData) {
      const session = JSON.parse(sessionData);
      session.sessionEnd = Date.now();
      session.timeSpent = session.sessionEnd - session.sessionStart;

      // Save session to history
      const historyKey = 'salakcode-session-history';
      const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
      history.push({
        ...session,
        date: new Date().toISOString().split('T')[0],
      });
      localStorage.setItem(historyKey, JSON.stringify(history.slice(-30))); // Keep last 30 sessions
      localStorage.removeItem(this.sessionKey);
    }
  }

  getPastSessions(): string[] {
    if (typeof window === 'undefined') return [];

    const historyKey = 'salakcode-session-history';
    const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
    return [...new Set(history.map((s: any) => s.date))] as string[];
  }

  // Private helper to save progress
  private saveProgress(progress: Record<string, ArticleProgress>): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.storageKey, JSON.stringify(progress));
  }

  // Export/Import for backup
  exportProgress(): string {
    return JSON.stringify({
      progress: this.getAllProgress(),
      sessions: JSON.parse(localStorage.getItem('salakcode-session-history') || '[]'),
      exportedAt: new Date().toISOString(),
    });
  }

  importProgress(data: string): boolean {
    try {
      const parsed = JSON.parse(data);
      if (parsed.progress) {
        localStorage.setItem(this.storageKey, JSON.stringify(parsed.progress));
      }
      if (parsed.sessions) {
        localStorage.setItem('salakcode-session-history', JSON.stringify(parsed.sessions));
      }
      return true;
    } catch {
      return false;
    }
  }

  // Clear all progress
  clearProgress(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem('salakcode-session-history');
    localStorage.removeItem(this.sessionKey);
  }
}

// Singleton instance
export const learningProgress = new LearningProgressManager();