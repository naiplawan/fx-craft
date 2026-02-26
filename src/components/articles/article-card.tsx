import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Article } from "@/types/article";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Clock, BookMarked, TrendingUp } from "lucide-react";

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  // Dynamically get the icon component
  const IconComponent = (LucideIcons[article.icon as keyof typeof LucideIcons] ||
    LucideIcons.FileText) as LucideIcon;

  // Calculate reading time
  const readingTime = Math.ceil(article.content.length / 500); // Rough estimate

  return (
    <Link
      href={`/articles/${article.slug}`}
      className={cn(
        "group block relative overflow-hidden p-6 rounded-xl border border-gray-200 dark:border-gray-700",
        "bg-white dark:bg-gray-900",
        "hover:border-[#088395] dark:hover:border-[#7AB2B2]",
        "hover:shadow-xl hover:shadow-[#088395]/20 dark:hover:shadow-[#7AB2B2]/20",
        "shadow-sm dark:shadow-none",
        "transition-all duration-300 transform hover:-translate-y-1",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#088395]/0 before:to-[#088395]/5 before:opacity-0 before:group-hover:before:opacity-100 before:transition-opacity before:duration-300",
        className
      )}
    >
      {/* Sticker for advanced content */}
      {article.difficulty === "advanced" && (
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-red-500 text-white text-xs font-medium">
          <TrendingUp className="w-3 h-3" />
          Advanced
        </div>
      )}

      <div className="relative">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-[#EBF4F6] to-[#f0f9fa] dark:from-[#09637E]/20 dark:to-[#09637E]/40 backdrop-blur-sm">
            <IconComponent className="w-6 h-6 text-[#088395] dark:text-[#7AB2B2]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge category={article.category} />
              {article.status === "stub" && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                  Coming soon
                </span>
              )}
              {article.difficulty !== "beginner" && (
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {article.difficulty} level
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#088395] dark:group-hover:text-[#7AB2B2] transition-colors">
              {article.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {article.description}
            </p>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
                {article.tags.length > 3 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    +{article.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Reading time */}
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4 mr-1" />
              {readingTime} min read
            </div>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#088395]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </Link>
  );
}
