import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Article } from "@/types/article";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  // Dynamically get the icon component
  const IconComponent = (LucideIcons[article.icon as keyof typeof LucideIcons] ||
    LucideIcons.FileText) as LucideIcon;

  return (
    <Link
      href={`/articles/${article.slug}`}
      className={cn(
        "group block p-6 rounded-xl border border-gray-200 dark:border-gray-700",
        "bg-white dark:bg-gray-900",
        "hover:border-[#088395] dark:hover:border-[#7AB2B2]",
        "hover:shadow-lg hover:shadow-[#088395]/10 dark:hover:shadow-[#7AB2B2]/10",
        "shadow-sm dark:shadow-none",
        "transition-all duration-200",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 rounded-lg bg-[#EBF4F6] dark:bg-[#09637E]/30">
          <IconComponent className="w-6 h-6 text-[#088395] dark:text-[#7AB2B2]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge category={article.category} />
            {article.status === "stub" && (
              <span className="text-xs text-gray-400 dark:text-gray-400">
                Coming soon
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-[#088395] dark:group-hover:text-[#7AB2B2] transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {article.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
