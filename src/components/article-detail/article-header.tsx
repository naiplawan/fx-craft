import { Badge } from "@/components/ui/badge";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Article } from "@/types/article";

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const IconComponent = (LucideIcons[article.icon as keyof typeof LucideIcons] ||
    LucideIcons.FileText) as LucideIcon;

  const difficultyColors = {
    beginner: "text-green-600 dark:text-green-400",
    intermediate: "text-yellow-600 dark:text-yellow-400",
    advanced: "text-red-600 dark:text-red-400",
  };

  return (
    <header className="mb-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-xl bg-[#EBF4F6] dark:bg-[#09637E]/20">
          <IconComponent className="w-8 h-8 text-[#088395] dark:text-[#7AB2B2]" />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge category={article.category} />
          <span className={difficultyColors[article.difficulty]}>
            {article.difficulty.charAt(0).toUpperCase() + article.difficulty.slice(1)}
          </span>
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {article.title}
      </h1>

      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
        {article.subtitle}
      </p>

      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
