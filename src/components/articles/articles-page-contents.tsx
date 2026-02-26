import { ArticleGrid } from "./article-grid";

interface ArticlesPageContentsProps {
  articles: any[];
}

export function ArticlesPageContents({ articles }: ArticlesPageContentsProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Articles
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Browse {articles.length} frontend engineering topics
        </p>
      </div>

      <ArticleGrid articles={articles} />
    </div>
  );
}