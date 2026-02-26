"use client";

import { useState } from "react";
import { Brain, CheckCircle2, XCircle, ArrowRight, BarChart3 } from "lucide-react";

interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface DifficultyAssessmentProps {
  articleSlug: string;
  articleTitle: string;
  questions: AssessmentQuestion[];
  onAssessmentComplete: (level: "beginner" | "intermediate" | "advanced") => void;
}

export function DifficultyAssessment({
  articleSlug,
  articleTitle,
  questions,
  onAssessmentComplete,
}: DifficultyAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [recommendedLevel, setRecommendedLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = { ...answers, [currentQuestion]: answerIndex };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      calculateLevel(newAnswers);
    } else {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    }
  };

  const calculateLevel = (userAnswers: Record<number, number>) => {
    let correctCount = 0;
    let beginnerCorrect = 0;
    let intermediateCorrect = 0;
    let advancedCorrect = 0;

    questions.forEach((q, idx) => {
      const isCorrect = userAnswers[idx] === q.correctAnswer;
      if (isCorrect) {
        correctCount++;
        if (q.difficulty === "beginner") beginnerCorrect++;
        else if (q.difficulty === "intermediate") intermediateCorrect++;
        else advancedCorrect++;
      }
    });

    // Determine level based on performance
    if (correctCount >= questions.length * 0.7) {
      if (advancedCorrect >= 1) {
        setRecommendedLevel("advanced");
      } else if (intermediateCorrect >= 1) {
        setRecommendedLevel("intermediate");
      } else {
        setRecommendedLevel("beginner");
      }
    } else {
      setRecommendedLevel("beginner");
    }

    setShowResult(true);
  };

  const handleContinue = () => {
    onAssessmentComplete(recommendedLevel);
  };

  const handleSkip = () => {
    onAssessmentComplete("beginner"); // Default to beginner
  };

  if (showResult) {
    const levelColors = {
      beginner: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400",
      intermediate: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400",
      advanced: "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400",
    };

    const levelDescriptions = {
      beginner: "We recommend starting with the basics. The article will break concepts down step by step.",
      intermediate: "You have solid knowledge! The article will focus on deeper concepts and practical applications.",
      advanced: "You're ready for advanced content! We'll dive into edge cases, optimizations, and expert-level insights.",
    };

    return (
      <div className="p-6 rounded-xl border-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="text-center mb-6">
          <Brain className="w-12 h-12 mx-auto mb-4 text-[#088395] dark:text-[#7AB2B2]" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Assessment Complete!
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Based on your responses, we've customized the article for you.
          </p>
        </div>

        <div className={`p-4 rounded-lg mb-6 ${levelColors[recommendedLevel]}`}>
          <div className="text-center">
            <div className="text-sm font-medium mb-1">Recommended Level</div>
            <div className="text-2xl font-bold capitalize">{recommendedLevel}</div>
          </div>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 text-center mb-6">
          {levelDescriptions[recommendedLevel]}
        </p>

        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#088395] dark:bg-[#7AB2B2] text-white dark:text-gray-950 font-medium hover:bg-[#09637E] dark:hover:bg-[#88c4c4] transition-colors"
          >
            Continue to Article
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl border-2 bg-gradient-to-br from-[#EBF4F6] to-white dark:from-[#09637E]/10 dark:to-gray-900">
      <div className="text-center mb-6">
        <Brain className="w-12 h-12 mx-auto mb-4 text-[#088395] dark:text-[#7AB2B2]" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Quick Skill Check
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Help us tailor "{articleTitle}" to your level by answering {questions.length} quick questions.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion) / questions.length) * 100)}% complete</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#088395] to-[#7AB2B2] transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          {question.question}
        </h4>

        {/* Difficulty indicator */}
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-4 ${
          question.difficulty === 'beginner'
            ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
            : question.difficulty === 'intermediate'
            ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
            : 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
        }`}>
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </span>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="w-full text-left p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-[#088395] dark:hover:border-[#7AB2B2] hover:bg-[#088395]/5 dark:hover:bg-[#7AB2B2]/10 transition-all"
          >
            <span className="text-gray-900 dark:text-gray-100">{option}</span>
          </button>
        ))}
      </div>

      {/* Skip option */}
      <div className="text-center">
        <button
          onClick={handleSkip}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline"
        >
          Skip assessment • Read at beginner level
        </button>
      </div>
    </div>
  );
}

// Sample assessment questions generator
export function generateAssessmentQuestions(articleSlug: string): AssessmentQuestion[] {
  // This would be customized based on the article content
  return [
    {
      id: "1",
      question: "What is the primary purpose of this concept?",
      options: [
        "To optimize performance",
        "To improve code organization",
        "To handle asynchronous operations",
        "To manage application state",
      ],
      correctAnswer: 0,
      difficulty: "beginner",
    },
    {
      id: "2",
      question: "Which scenario best demonstrates when to use this concept?",
      options: [
        "Simple static content",
        "Large dataset processing",
        "User authentication",
        "All of the above",
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
    },
    {
      id: "3",
      question: "What's a common pitfall when implementing this concept?",
      options: [
        "Forgetting to import dependencies",
        "Not handling edge cases",
        "Over-optimizing prematurely",
        "All of the above",
      ],
      correctAnswer: 3,
      difficulty: "advanced",
    },
  ];
}