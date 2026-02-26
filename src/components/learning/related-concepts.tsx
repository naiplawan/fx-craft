"use client";

import { useLearningProgress, useLearningStats } from "@/hooks/use-learning-progress";
import { getAllArticles } from "@/lib/articles";
import type { Article } from "@/types/article";
import { Link, BookOpen, TrendingUp, Users, Lightbulb } from "lucide-react";
import { useMemo } from "react";

interface RelatedConceptsProps {
  currentArticle: Article;
}

export function RelatedConcepts({ currentArticle }: RelatedConceptsProps) {
  const { stats } = useLearningStats();
  const allArticles = getAllArticles();

  // Calculate relationship scores
  const relatedArticles = useMemo(() => {
    const scored = allArticles
      .filter((a) => a.slug !== currentArticle.slug && a.status === "published")
      .map((article) => {
        let score = 0;

        // Same category = high score
        if (article.category === currentArticle.category) {
          score += 10;
        }

        // Related articles in frontmatter
        if (currentArticle.related.includes(article.slug)) {
          score += 15;
        }

        // Shared tags
        const sharedTags = article.tags.filter((tag) =>
          currentArticle.tags.includes(tag)
        );
        score += sharedTags.length * 5;

        // Already read = boost score (reinforcement)
        const progress = JSON.parse(
          localStorage.getItem("salakcode-learning-progress") || "{}"
        );
        if (progress[article.slug]?.readCount > 0) {
          score += 8;
        }

        // Similar difficulty
        if (article.difficulty === currentArticle.difficulty) {
          score += 3;
        }

        return { article, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((item) => item.article);

    return scored;
  }, [currentArticle, allArticles, stats]);

  const categories = {
    reinforcement: relatedArticles.filter(
      (a) =>
        JSON.parse(localStorage.getItem("salakcode-learning-progress") || "{}")[
          a.slug
        ]?.readCount > 0
    ),
    prerequisite: relatedArticles.filter(
      (a) =>
        a.difficulty === "beginner" &&
        currentArticle.difficulty !== "beginner" &&
        a.category === currentArticle.category
    ),
    advanced: relatedArticles.filter(
      (a) =>
        a.difficulty === "advanced" &&
        currentArticle.difficulty !== "advanced" &&
        a.category === currentArticle.category
    ),
    related: relatedArticles.filter(
      (a) => currentArticle.related.includes(a.slug)
    ),
  };

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="my-8 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-[#088395] dark:text-[#7AB2B2]" />
        Continue Your Learning Journey
      </h3>

      {/* Reinforcement - Already read, related content */}
      {categories.reinforcement.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Reinforce Your Knowledge
            </h4>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            You've already mastered these related concepts. Quick review recommended!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categories.reinforcement.slice(0, 2).map((article) => (
              <RelatedArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      )}

      {/* Prerequisites - Build foundation */}
      {categories.prerequisite.length > 0 && currentArticle.difficulty !== "beginner" && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Build Your Foundation
            </h4>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            Start with these fundamentals before tackling advanced topics
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categories.prerequisite.slice(0, 2).map((article) => (
              <RelatedArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      )}

      {/* Advanced - Next level */}
      {categories.advanced.length > 0 && currentArticle.difficulty !== "advanced" && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Ready for More?
            </h4>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            Challenge yourself with these advanced topics
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categories.advanced.slice(0, 2).map((article) => (
              <RelatedArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      )}

      {/* Directly related */}
      {categories.related.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Also Explores
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categories.related.slice(0, 4).map((article) => (
              <RelatedArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RelatedArticleCard({ article }: { article: Article }) {
  const progress = JSON.parse(
    localStorage.getItem("salakcode-learning-progress") || "{}"
  );
  const isRead = progress[article.slug]?.readCount > 0;

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="block p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-[#088395] dark:hover:border-[#7AB2B2] transition-colors group"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {isRead ? (
            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {article.difficulty === "advanced"
                  ? "A"
                  : article.difficulty === "intermediate"
                  ? "I"
                  : "B"}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h5 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#088395] dark:group-hover:text-[#7AB2B2] transition-colors mb-1">
            {article.title}
          </h5>
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
            {article.description}
          </p>
        </div>
      </div>
    </Link>
  );
}