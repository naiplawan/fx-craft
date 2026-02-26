# SalakCode Learning Experience Features

Complete learning science-based features to enhance user engagement and retention.

## 🎓 Features Implemented

### 1. Progress Tracking System
**File**: `src/lib/learning-progress.ts`

Tracks user learning journey with:
- Article completion status
- Time spent reading
- Quiz scores
- Notes & highlights
- Spaced repetition scheduling
- Reading streaks

**Usage**:
```typescript
import { learningProgress } from '@/lib/learning-progress';

// Start tracking an article
learningProgress.startArticle('react-hooks');

// Update reading progress
learningProgress.updateReadingProgress('react-hooks', 75, 120); // 75%, 120 seconds

// Save quiz attempt
learningProgress.saveQuizAttempt({
  articleSlug: 'react-hooks',
  score: 85,
  totalQuestions: 5,
  answers: { 'q1': true, 'q2': false },
  timestamp: Date.now(),
  timeSpent: 60,
});
```

### 2. Progress Tracker UI
**Component**: `<ProgressTracker />`

Displays user learning statistics:
- Articles completed
- Total study time
- Average quiz score
- Notes & highlights count
- Current streak
- Due reviews

**Usage**:
```tsx
import { ProgressTracker } from '@/components/learning';

<ProgressTracker />
```

### 3. Article Progress Indicator
**Component**: `<ArticleProgressIndicator />`

Sticky header showing:
- Reading status (not started, in progress, completed)
- Progress percentage bar
- Article metadata

**Usage**:
```tsx
import { ArticleProgressIndicator } from '@/components/learning';

<ArticleProgressIndicator
  articleSlug="react-hooks"
  title="React Hooks Deep Dive"
  category="react-internals"
  difficulty="intermediate"
/>
```

### 4. Quiz/Knowledge Check System
**Component**: `<Quiz />`

Interactive quizzes with:
- Multiple choice questions
- Immediate feedback with explanations
- Score tracking
- Retry functionality

**Usage**:
```tsx
import { Quiz } from '@/components/learning';

const questions = [
  {
    id: '1',
    question: 'What is useEffect used for?',
    options: ['Side effects', 'State', 'Props', 'Context'],
    correctAnswer: 0,
    explanation: 'useEffect is for side effects like data fetching.',
    difficulty: 'beginner'
  },
];

<Quiz questions={questions} articleSlug="react-hooks" />
```

### 5. Notes & Annotations Panel
**Components**: `<NotesPanel />`, `<NoteToggleButton />`

Allows users to:
- Take personal notes
- Highlight passages
- Review highlights
- Auto-save functionality

**Usage**:
```tsx
import { NotesPanel, NoteToggleButton } from '@/components/learning';

const [isOpen, setIsOpen] = useState(false);

<NotesPanel
  articleSlug="react-hooks"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
/>
<NoteToggleButton
  onClick={() => setIsOpen(!isOpen)}
  hasNotes={!!note}
/>
```

### 6. Interactive Code Playground
**Component**: `<CodePlayground />`

Live code execution with:
- Syntax highlighting
- Run button
- Reset functionality
- Copy to clipboard

**Usage**:
```tsx
import { CodePlayground } from '@/components/learning';

<CodePlayground
  initialCode={`const [count, setCount] = useState(0);`}
  language="javascript"
  title="Try it yourself!"
  height={300}
/>
```

### 7. Learning Path System
**Component**: `<LearningPath />`

Shows:
- Recommended learning order
- Prerequisites
- Next articles to read
- Path progress

**Usage**:
```tsx
import { LearningPath } from '@/components/learning';
import { getArticleBySlug } from '@/lib/articles';

const article = getArticleBySlug('react-hooks');

<LearningPath currentArticle={article} showFull={false} />
```

### 8. Difficulty Assessment
**Component**: `<DifficultyAssessment />`

Pre-article skill assessment:
- 3 quick questions
- Tailors content difficulty
- Adaptive learning paths

**Usage**:
```tsx
import { DifficultyAssessment, generateAssessmentQuestions } from '@/components/learning';

const questions = generateAssessmentQuestions('react-hooks');

<DifficultyAssessment
  articleSlug="react-hooks"
  articleTitle="React Hooks Deep Dive"
  questions={questions}
  onAssessmentComplete={(level) => {
    // Customize content based on level
  }}
/>
```

### 9. Related Concepts Deep-Dive
**Component**: `<RelatedConcepts />`

Smart content recommendations:
- Reinforcement (already read)
- Prerequisites (foundation)
- Advanced (next level)
- Directly related

**Usage**:
```tsx
import { RelatedConcepts } from '@/components/learning';

<RelatedConcepts currentArticle={article} />
```

### 10. Spaced Review Queue
**Page**: `/articles/review`

Reviews due at optimal intervals:
- Based on forgetting curve
- Scheduled automatically
- Tracks review history

## 🔧 React Hooks

### `useLearningProgress`
Hook for tracking article progress:

```tsx
import { useLearningProgress } from '@/hooks/use-learning-progress';

const { progress, startReading, updateProgress, saveNote, isRead, isStarted } =
  useLearningProgress('article-slug');
```

### `useLearningStats`
Hook for global statistics:

```tsx
import { useLearningStats } from '@/hooks/use-learning-stats';

const { stats, dueReviews, refresh } = useLearningStats();
```

## 📚 Adding to Articles

### Example Article with Learning Features

```tsx
// src/app/articles/[slug]/page.tsx
import { ArticleProgressIndicator } from '@/components/learning';
import { Quiz } from '@/components/learning';
import { NotesPanel } from '@/components/learning';
import { CodePlayground } from '@/components/learning';
import { LearningPath } from '@/components/learning';
import { RelatedConcepts } from '@/components/learning';

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);

  return (
    <>
      <ArticleProgressIndicator {...article} />

      <DifficultyAssessment article={article} />

      <MDXContent>{article.content}</MDXContent>

      <CodePlayground initialCode={exampleCode} />

      <Quiz questions={quizQuestions} articleSlug={article.slug} />

      <LearningPath currentArticle={article} />

      <RelatedConcepts currentArticle={article} />
    </>
  );
}
```

## 🎯 Research-Backed Benefits

1. **Spaced Repetition** - 200% improvement in long-term retention
2. **Retrieval Practice** - One practice = 3 re-readings
3. **Progress Tracking** - 30% improvement with metacognition
4. **Active Learning** - 40% better than passive reading
5. **Dual Coding** - 89% better with visuals + text

## 🚀 Quick Start

1. Import components from `@/components/learning`
2. Add `<ArticleProgressIndicator />` to article pages
3. Add `<Quiz />` at end of articles
4. Add `<CodePlayground />` for code examples
5. Add `<ProgressTracker />` to dashboard/homepage

## 📖 Learning Science References

- **Make It Stick** (Brown, Roediger, McDaniel, 2014)
- **How Learning Works** (Ambrose et al., 2010)
- **Spaced Repetition** (Ebbinghaus, 1885; modern studies)
- **Retrieval Practice** (Roediger & Karpicke, 2006)
- **Cognitive Load Theory** (Sweller, 1988)

## 🔑 Key Concepts

- **Active Recall**: Testing yourself strengthens memory
- **Spaced Repetition**: Review at increasing intervals
- **Metacognition**: Awareness of own learning
- **Scaffolding**: Build on prior knowledge
- **Deliberate Practice**: Focused, goal-oriented practice

---

Built with ❤️ for frontend engineers who love to learn.