"use client";

import React, { useState, useEffect } from "react";
import { ArticleGrid } from "@/components/articles/article-grid";
import { getAllArticles, getArticlesByCategory as filterArticlesByCategory } from "@/lib/articles";

interface ArticleListProps {
  initialCategory?: string;
}

interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: "all", name: "All Topics" },
  { id: "react", name: "React" },
  { id: "javascript", name: "JavaScript" },
  { id: "performance", name: "Performance" },
  { id: "architecture", name: "Architecture" },
  { id: "web-apis", name: "Web APIs" },
  { id: "build-tools", name: "Build Tools" },
  { id: "security", name: "Security" },
  { id: "testing", name: "Testing" },
  { id: "css", name: "CSS" },
  { id: "nextjs", name: "Next.js" },
];

export function ArticleList({ initialCategory = "all" }: ArticleListProps) {
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch articles on the client side
    const fetchArticles = async () => {
      try {
        const allArticles = getAllArticles();
        setArticles(allArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = selectedCategory === "all"
    ? articles
    : articles.filter((article) => article.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#088395]"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Articles
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Browse {articles.length} frontend engineering topics
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {categories.map((category) => {
            const categoryArticles = category.id === "all"
              ? articles
              : articles.filter((article) => article.category === category.id);

            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                  selectedCategory === category.id
                    ? `bg-[#088395] text-white shadow-lg transform scale-105`
                    : `bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:shadow-md`
                }`}
              >
                {category.name}
                {category.id !== "all" && (
                  <span className="text-xs opacity-75">
                    {categoryArticles.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {filteredArticles.length > 0 ? (
        <ArticleGrid articles={filteredArticles} />
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-300">
            No articles found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}