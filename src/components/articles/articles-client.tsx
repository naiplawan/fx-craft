"use client";

import { ArticleGrid } from "@/components/articles/article-grid";
import { SearchBar } from "@/components/articles/search-bar";
import { ArticleFilter } from "@/components/articles/article-filter";
import { useSearch } from "@/hooks/use-search";
import type { Article } from "@/types/article";

interface ArticlesClientProps {
  articles: Article[];
}

export function ArticlesClient({ articles }: ArticlesClientProps) {
  const {
    query,
    setQuery,
    selectedCategory,
    setSelectedCategory,
    filteredArticles,
  } = useSearch(articles);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Articles
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Browse {articles.length} frontend engineering topics
        </p>

        <SearchBar
          value={query}
          onChange={setQuery}
          className="mb-6"
        />

        <ArticleFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {filteredArticles.length > 0 ? (
        <ArticleGrid articles={filteredArticles} />
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-400">
            No articles found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
