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
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Related Topics
      </h3>
      <div className="grid gap-3">
        {relatedArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-[#088395] dark:hover:border-[#7AB2B2] transition-colors"
          >
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#088395] dark:group-hover:text-[#7AB2B2] transition-colors">
                {article.title}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {article.description}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#088395] dark:group-hover:text-[#7AB2B2] transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
