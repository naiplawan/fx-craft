"use client";

import { useLearningStats } from "@/hooks/use-learning-progress";
import { BookOpen, Clock, Target, Flame, TrendingUp, Award, Calendar } from "lucide-react";
import Link from "next/link";

export function ProgressTracker() {
  const { stats, dueReviews } = useLearningStats();

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "text-purple-600 dark:text-purple-400";
    if (streak >= 14) return "text-orange-600 dark:text-orange-400";
    if (streak >= 7) return "text-yellow-600 dark:text-yellow-400";
    if (streak >= 3) return "text-green-600 dark:text-green-400";
    return "text-gray-600 dark:text-gray-400";
  };

  return (
    <div className="bg-gradient-to-br from-[#EBF4F6] to-[#f0f9fa] dark:from-[#09637E]/10 dark:to-[#09637E]/20 rounded-xl p-6 border border-[#088395]/20 dark:border-[#7AB2B2]/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Your Learning Progress
        </h3>
        {stats.currentStreak > 0 && (
          <div className={`flex items-center gap-2 ${getStreakColor(stats.currentStreak)}`}>
            <Flame className="w-5 h-5" />
            <span className="font-bold">{stats.currentStreak} day streak</span>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 rounded-full bg-[#088395]/10 dark:bg-[#7AB2B2]/10">
            <BookOpen className="w-5 h-5 text-[#088395] dark:text-[#7AB2B2]" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {stats.articlesRead}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Completed
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 rounded-full bg-blue-500/10">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {formatTime(stats.totalTimeSpent)}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Study Time
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 rounded-full bg-green-500/10">
            <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {Math.round(stats.averageQuizScore)}%
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Avg Quiz Score
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 rounded-full bg-purple-500/10">
            <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {stats.notesCount}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Notes & Highlights
          </div>
        </div>
      </div>

      {/* Due for Review */}
      {dueReviews.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <h4 className="font-semibold text-yellow-900 dark:text-yellow-100">
              Time for Review!
            </h4>
          </div>
          <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
            You have {dueReviews.length} {dueReviews.length === 1 ? 'article' : 'articles'} due for review.
          </p>
          <Link
            href="/articles/review"
            className="inline-flex items-center gap-2 text-sm font-medium text-yellow-700 dark:text-yellow-300 hover:text-yellow-900 dark:hover:text-yellow-100"
          >
            Start Review
            <TrendingUp className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Continue Learning */}
      {stats.articlesInProgress > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Continue Learning
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stats.articlesInProgress} {stats.articlesInProgress === 1 ? 'article' : 'articles'} in progress
              </p>
            </div>
            <Link
              href="/articles?filter=in-progress"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#088395] dark:bg-[#7AB2B2] text-white dark:text-gray-950 text-sm font-medium hover:bg-[#09637E] dark:hover:bg-[#88c4c4] transition-colors"
            >
              Resume
              <BookOpen className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}