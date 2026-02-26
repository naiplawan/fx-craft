"use client";

import { useState, useEffect } from "react";
import { learningProgress } from "@/lib/learning-progress";
import type { Article } from "@/types/article";
import { Clock, CheckCircle2, Brain, TrendingUp, Calendar } from "lucide-react";
import Link from "next/link";

interface ReviewQueueProps {
  articles: Article[];
}

export function ReviewQueue({ articles }: ReviewQueueProps) {
  const [dueArticles, setDueArticles] = useState<Article[]>([]);
  const [upcomingArticles, setUpcomingArticles] = useState<Array<{ article: Article; dueDate: Date }>>([]);
  const [stats, setStats] = useState({ due: 0, upcoming: 0 });

  useEffect(() => {
    const calculateReviews = () => {
      const allProgress = learningProgress.getAllProgress();
      const now = Date.now();
      const day = 24 * 60 * 60 * 1000;

      const due: Article[] = [];
      const upcoming: Array<{ article: Article; dueDate: Date }> = [];

      Object.values(allProgress)
        .filter(p => p.readCount > 0) // Only show articles that have been read
        .sort((a, b) => a.nextReviewAt - b.nextReviewAt)
        .forEach((progress) => {
          const article = articles.find(a => a.slug === progress.articleSlug);
          if (!article) return;

          if (progress.nextReviewAt <= now) {
            due.push(article);
          } else if (progress.nextReviewAt <= now + (7 * day)) {
            upcoming.push({
              article,
              dueDate: new Date(progress.nextReviewAt),
            });
          }
        });

      setDueArticles(due);
      setUpcomingArticles(upcoming);
      setStats({
        due: due.length,
        upcoming: upcoming.length,
      });
    };

    calculateReviews();
  }, [articles]);

  const formatDueDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 7) return `In ${diffDays} days`;
    return date.toLocaleDateString();
  };

  if (dueArticles.length === 0 && upcomingArticles.length === 0) {
    return (
      <div className="text-center py-16">
        <Brain className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          No Reviews Due
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Complete some articles to start your spaced review journey!
        </p>
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#088395] dark:bg-[#7AB2B2] text-white dark:text-gray-950 font-medium hover:bg-[#09637E] dark:hover:bg-[#88c4c4] transition-colors"
        >
          Browse Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Due for Review */}
      {dueArticles.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Due for Review ({dueArticles.length})
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            These articles are due for review now. Reviewing them will strengthen your memory!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dueArticles.map((article) => {
              const progress = learningProgress.getArticleProgress(article.slug);
              const daysSinceRead = progress
                ? Math.floor((Date.now() - progress.lastReadAt) / (1000 * 60 * 60 * 24))
                : 0;

              return (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}?mode=review`}
                  className="block p-5 rounded-xl border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 hover:border-orange-400 dark:hover:border-orange-600 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {article.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-10 h-10 rounded-full bg-orange-500 dark:bg-orange-600 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Last read {daysSinceRead} {daysSinceRead === 1 ? 'day' : 'days'} ago</span>
                    </div>
                    {progress && progress.quizScores.length > 0 && (
                      <div>
                        Previous score: {Math.round(progress.quizScores.reduce((a, b) => a + b, 0) / progress.quizScores.length)}%
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Upcoming Reviews */}
      {upcomingArticles.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Upcoming Reviews ({upcomingArticles.length})
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Schedule these reviews for optimal retention
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingArticles.map(({ article, dueDate }) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDueDate(dueDate)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Spaced Repetition Info */}
      <div className="mt-12 p-6 rounded-xl bg-gradient-to-br from-[#EBF4F6] to-white dark:from-[#09637E]/10 dark:to-gray-900 border border-[#088395]/20 dark:border-[#7AB2B2]/20">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          How Spaced Repetition Works
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          Based on the "Forgetting Curve" research by Ebbinghaus, we schedule reviews at optimal intervals
          to strengthen your long-term memory.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[#088395] dark:text-[#7AB2B2]">1 day</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">First Review</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#088395] dark:text-[#7AB2B2]">3 days</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Second Review</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#088395] dark:text-[#7AB2B2]">1 week</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Third Review</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#088395] dark:text-[#7AB2B2]">2 weeks+</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Long-term</div>
          </div>
        </div>
      </div>
    </div>
  );
}
