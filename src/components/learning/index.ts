// Learning Experience Components
// Based on learning science research: Spaced Repetition, Active Recall, Retrieval Practice

export { ProgressTracker } from './progress-tracker';
export { ArticleProgressIndicator } from './article-progress-indicator';
export { NotesPanel, NoteToggleButton } from './notes-panel';
export { Quiz } from './quiz';
export { CodePlayground, InlineCodeEditor } from './code-playground';
export { LearningPath } from './learning-path';
export { DifficultyAssessment, generateAssessmentQuestions } from './difficulty-assessment';
export { RelatedConcepts } from './related-concepts';
export { ReviewQueue } from './review-queue';

// Types
export type { ArticleProgress, Highlight, QuizAttempt, LearningSession } from '@/lib/learning-progress';
export type { QuizQuestion } from './quiz';