"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { learningProgress } from "@/lib/learning-progress";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty?: "easy" | "medium" | "hard";
}

interface QuizProps {
  questions: QuizQuestion[];
  articleSlug: string;
  title?: string;
}

export function Quiz({ questions, articleSlug, title = "Knowledge Check" }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswer = (answerIndex: number) => {
    if (showExplanation) return;

    setSelectedAnswer(answerIndex);
    setAnswers({ ...answers, [currentQuestion]: answerIndex });

    // Auto-show explanation after selecting
    setTimeout(() => {
      setShowExplanation(true);
    }, 500);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate and save final score
      const correctCount = Object.entries(answers).filter(
        ([qIdx, answer]) => questions[Number(qIdx)].correctAnswer === answer
      ).length;
      const finalScore = Math.round((correctCount / questions.length) * 100);

      setScore(finalScore);
      setIsCompleted(true);

      // Save to learning progress
      learningProgress.saveQuizAttempt({
        articleSlug,
        score: finalScore,
        totalQuestions: questions.length,
        answers: Object.entries(answers).reduce((acc, [qIdx, answer]) => ({
          ...acc,
          [qIdx]: questions[Number(qIdx)].correctAnswer === answer,
        }), {}),
        timestamp: Date.now(),
        timeSpent: 0, // Could be tracked if needed
      });
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers({});
    setIsCompleted(false);
    setScore(0);
  };

  if (isCompleted) {
    const percentage = score;
    const passed = percentage >= 70;

    return (
      <div className="my-8 p-6 rounded-xl border-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
            passed
              ? "bg-green-100 dark:bg-green-900/30"
              : "bg-orange-100 dark:bg-orange-900/30"
          }`}>
            {passed ? (
              <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
            ) : (
              <RotateCcw className="w-10 h-10 text-orange-600 dark:text-orange-400" />
            )}
          </div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {passed ? "Great Job!" : "Keep Practicing!"}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You scored {percentage}% ({Math.round((score / 100) * questions.length)}/{questions.length} correct)
          </p>

          {passed && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium mb-4">
              <CheckCircle2 className="w-4 h-4" />
              Concept Mastered!
            </div>
          )}

          {!passed && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Review the article and try again to reinforce your learning.
            </p>
          )}

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#088395] dark:bg-[#7AB2B2] text-white dark:text-gray-950 font-medium hover:bg-[#09637E] dark:hover:bg-[#88c4c4] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
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

        {/* Difficulty Badge */}
        {question.difficulty && (
          <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-4 ${
            question.difficulty === 'easy'
              ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
              : question.difficulty === 'medium'
              ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
              : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
          }`}>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </span>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === question.correctAnswer;

          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showExplanation}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                showExplanation
                  ? isCorrectOption
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : isSelected && !isCorrectOption
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-gray-700 opacity-50'
                  : isSelected
                  ? 'border-[#088395] bg-[#088395]/5 dark:bg-[#7AB2B2]/10'
                  : 'border-gray-200 dark:border-gray-700 hover:border-[#088395] dark:hover:border-[#7AB2B2]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  showExplanation
                    ? isCorrectOption
                      ? 'border-green-500 bg-green-500'
                      : isSelected && !isCorrectOption
                      ? 'border-red-500 bg-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {showExplanation && isCorrectOption && (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  )}
                  {showExplanation && isSelected && !isCorrectOption && (
                    <XCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className={`flex-1 ${
                  showExplanation && isCorrectOption
                    ? 'text-green-700 dark:text-green-300 font-medium'
                    : showExplanation && isSelected && !isCorrectOption
                    ? 'text-red-700 dark:text-red-300'
                    : 'text-gray-900 dark:text-gray-100'
                }`}>
                  {option}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`p-4 rounded-lg mb-6 ${
          isCorrect
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
            : 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800'
        }`}>
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <h4 className={`font-semibold mb-1 ${
                isCorrect
                  ? 'text-green-900 dark:text-green-100'
                  : 'text-orange-900 dark:text-orange-100'
              }`}>
                {isCorrect ? 'Correct!' : 'Not quite...'}
              </h4>
              <p className={`text-sm ${
                isCorrect
                  ? 'text-green-800 dark:text-green-200'
                  : 'text-orange-800 dark:text-orange-200'
              }`}>
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!showExplanation}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            showExplanation
              ? 'bg-[#088395] dark:bg-[#7AB2B2] text-white dark:text-gray-950 hover:bg-[#09637E] dark:hover:bg-[#88c4c4]'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLastQuestion ? 'See Results' : 'Next Question'}
        </button>
      </div>
    </div>
  );
}