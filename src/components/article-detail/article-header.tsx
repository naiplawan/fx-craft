import { Badge } from "@/components/ui/badge";
import type { Article } from "@/types/article";

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <header className="mb-12">
      {/* Category & Difficulty */}
      <div className="flex items-center gap-3 mb-6">
        <Badge category={article.category} />
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {article.difficulty.charAt(0).toUpperCase() + article.difficulty.slice(1)}
        </span>
      </div>

      {/* Title - Notion style */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4 leading-tight">
        {article.title}
      </h1>

      {/* Subtitle */}
      <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
        {article.subtitle}
      </p>

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors cursor-default"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
