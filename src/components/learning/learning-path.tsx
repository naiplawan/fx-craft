"use client";

import { getArticlesByCategory } from "@/lib/articles";
import type { Article } from "@/types/article";
import { useLearningProgress, useLearningStats } from "@/hooks/use-learning-progress";
import { BookOpen, Lock, CheckCircle2, ArrowRight, Circle } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

interface LearningPathProps {
  currentArticle?: Article;
  showFull?: boolean;
}

// Define learning paths based on categories
const learningPaths = {
  "react-internals": {
    name: "React Mastery Path",
    description: "From basic React to advanced internals",
    order: [
      "react-components",
      "react-props",
      "react-state",
      "react-hooks",
      "useEffect-deep-dive",
      "usecontext-patterns",
      "usememo-usecallback",
      "react-fiber",
      "reconciliation-algorithm",
      "suspense",
      "react-server-components",
    ],
  },
  "javascript-core": {
    name: "JavaScript Fundamentals",
    description: "Master core JavaScript concepts",
    order: [
      "javascript-basics",
      "variables-scope",
      "closures",
      "prototypes",
      "this-keyword",
      "async-javascript",
      "promises",
      "async-await",
      "event-loop",
      "es6-features",
      "es2020-features",
    ],
  },
  "performance": {
    name: "Performance Optimization",
    description: "Make your web apps blazing fast",
    order: [
      "performance-basics",
      "lazy-loading",
      "code-splitting",
      "tree-shaking",
      "memoization",
      "virtual-scrolling",
      "web-vitals",
      "performance-monitoring",
    ],
  },
};

export function LearningPath({ currentArticle, showFull = false }: LearningPathProps) {
  const allArticles = getArticlesByCategory(currentArticle?.category || "react-internals");
  const { stats } = useLearningStats();

  // Get the learning path for current article's category
  const pathInfo = currentArticle
    ? learningPaths[currentArticle.category as keyof typeof learningPaths]
    : null;

  // Find current article position in path
  const currentIndex = pathInfo
    ? pathInfo.order.findIndex((slug) => slug === currentArticle?.slug)
    : -1;

  // Get recommended next articles
  const nextInPath = useMemo(() => {
    if (!pathInfo || currentIndex === -1) return [];

    return pathInfo.order
      .slice(currentIndex + 1, currentIndex + 4)
      .map((slug) => allArticles.find((a) => a.slug === slug))
      .filter((a): a is Article => a !== undefined);
  }, [pathInfo, currentIndex, allArticles]);

  // Get prerequisite articles
  const prerequisites = useMemo(() => {
    if (!pathInfo || currentIndex === -1) return [];

    return pathInfo.order
      .slice(Math.max(0, currentIndex - 3), currentIndex)
      .map((slug) => allArticles.find((a) => a.slug === slug))
      .filter((a): a is Article => a !== undefined);
  }, [pathInfo, currentIndex, allArticles]);

  if (!pathInfo && !showFull) return null;

  return (
    <div className="my-8 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {pathInfo?.name || "Learning Path"}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {pathInfo?.description || "Follow our recommended learning path"}
          </p>
        </div>

        {stats.currentStreak > 0 && (
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400">Your streak</div>
            <div className="text-2xl font-bold text-[#088395] dark:text-[#7AB2B2]">
              {stats.currentStreak} days 🔥
            </div>
          </div>
        )}
      </div>

      {/* Progress through path */}
      {pathInfo && currentIndex >= 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">Path Progress</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {currentIndex + 1} of {pathInfo.order.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#088395] to-[#7AB2B2]"
              style={{ width: `${((currentIndex + 1) / pathInfo.order.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Prerequisites */}
      {prerequisites.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Prerequisites
          </h4>
          <div className="space-y-2">
            {prerequisites.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-[#088395] dark:hover:border-[#7AB2B2] transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                    {article.title}
                  </h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {article.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Next in path */}
      {nextInPath.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Circle className="w-4 h-4" />
            Up Next
          </h4>
          <div className="space-y-2">
            {nextInPath.map((article, index) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-[#088395] dark:hover:border-[#7AB2B2] transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#088395]/10 dark:bg-[#7AB2B2]/10 flex items-center justify-center text-sm font-semibold text-[#088395] dark:text-[#7AB2B2]">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                    {article.title}
                  </h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {article.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#088395] dark:text-[#7AB2B2]" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All learning paths */}
      {showFull && (
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            All Learning Paths
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(learningPaths).map(([key, path]) => (
              <Link
                key={key}
                href={`/articles?category=${key}`}
                className="p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-[#088395] dark:hover:border-[#7AB2B2] transition-colors"
              >
                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  {path.name}
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {path.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}