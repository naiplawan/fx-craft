"use client";

import { useState, useMemo } from "react";
import type { Article, Category } from "@/types/article";

export function useSearch(articles: Article[]) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((article) => article.category === selectedCategory);
    }

    // Filter by search query
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(lowerQuery) ||
          article.description.toLowerCase().includes(lowerQuery) ||
          article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    }

    return filtered;
  }, [articles, query, selectedCategory]);

  return {
    query,
    setQuery,
    selectedCategory,
    setSelectedCategory,
    filteredArticles,
  };
}
