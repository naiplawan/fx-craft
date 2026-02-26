/**
 * React hook for learning progress tracking
 * Handles real-time progress updates and statistics
 */

import { useState, useEffect, useCallback } from 'react';
import { learningProgress, type ArticleProgress } from '@/lib/learning-progress';

export function useLearningProgress(articleSlug?: string) {
  const [progress, setProgress] = useState<ArticleProgress | null>(null);
  const [stats, setStats] = useState(learningProgress.getStats());
  const [dueReviews, setDueReviews] = useState<string[]>([]);

  // Load progress on mount
  useEffect(() => {
    if (articleSlug) {
      setProgress(learningProgress.getArticleProgress(articleSlug));
    }
    setStats(learningProgress.getStats());
    setDueReviews(learningProgress.getDueReviews());

    // End session on unmount
    return () => {
      learningProgress.endSession();
    };
  }, [articleSlug]);

  // Start reading an article
  const startReading = useCallback(() => {
    if (!articleSlug) return;
    learningProgress.startArticle(articleSlug);
    setProgress(learningProgress.getArticleProgress(articleSlug));
  }, [articleSlug]);

  // Update reading progress
  const updateProgress = useCallback((percentage: number, timeSpent: number) => {
    if (!articleSlug) return;
    learningProgress.updateReadingProgress(articleSlug, percentage, timeSpent);
    setProgress(learningProgress.getArticleProgress(articleSlug));
    setStats(learningProgress.getStats());
  }, [articleSlug]);

  // Save note
  const saveNote = useCallback((note: string) => {
    if (!articleSlug) return;
    learningProgress.saveNote(articleSlug, note);
    setProgress(learningProgress.getArticleProgress(articleSlug));
  }, [articleSlug]);

  // Add highlight
  const addHighlight = useCallback((text: string, position: number, note?: string) => {
    if (!articleSlug) return;
    learningProgress.addHighlight(articleSlug, text, position, note);
    setProgress(learningProgress.getArticleProgress(articleSlug));
  }, [articleSlug]);

  // Remove highlight
  const removeHighlight = useCallback((highlightId: string) => {
    if (!articleSlug) return;
    learningProgress.removeHighlight(articleSlug, highlightId);
    setProgress(learningProgress.getArticleProgress(articleSlug));
  }, [articleSlug]);

  return {
    progress,
    stats,
    dueReviews,
    startReading,
    updateProgress,
    saveNote,
    addHighlight,
    removeHighlight,
    isRead: progress?.readCount ? progress.readCount > 0 : false,
    isStarted: progress ? progress.completionPercentage > 0 : false,
    completionPercentage: progress?.completionPercentage || 0,
  };
}

export function useLearningStats() {
  const [stats, setStats] = useState(learningProgress.getStats());
  const [dueReviews, setDueReviews] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(learningProgress.getStats());
      setDueReviews(learningProgress.getDueReviews());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    stats,
    dueReviews,
    refresh: () => {
      setStats(learningProgress.getStats());
      setDueReviews(learningProgress.getDueReviews());
    },
  };
}