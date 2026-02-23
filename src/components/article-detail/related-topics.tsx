import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getArticleBySlug } from "@/lib/articles";

interface RelatedTopicsProps {
  slugs: string[];
  className?: string;
}

export function RelatedTopics({ slugs, className }: RelatedTopicsProps) {
  if (!slugs || slugs.length === 0) {
    return null;
  }

  const relatedArticles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is NonNullable<typeof article> => article !== null);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className={cn("mt-12 pt-8 border-t border-gray-200 dark:border-gray-800", className)}>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
        Related Topics
      </h3>
      <div className="grid gap-2">
        {relatedArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors -ml-3"
          >
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#088395] dark:group-hover:text-[#7AB2B2] transition-colors text-sm">
                {article.title}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-[#088395] dark:group-hover:text-[#7AB2B2] transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
