"use client";

import { cn } from "@/lib/utils";
import { Tag, Filter } from "lucide-react";
import { useSearch } from "@/hooks/use-search";
import type { Article, Category } from "@/types/article";

interface ArticleFilterProps {
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
  className?: string;
}

// Enhanced category definitions with colors
const categoryCategories = [
  { id: "all", label: "All Topics", color: "gray", bgColor: "bg-gray-100 dark:bg-gray-800" },
  { id: "react-internals", label: "React Internals", color: "blue", bgColor: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" },
  { id: "javascript-core", label: "JavaScript", color: "yellow", bgColor: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400" },
  { id: "performance", label: "Performance", color: "green", bgColor: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400" },
  { id: "architecture", label: "Architecture", color: "purple", bgColor: "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400" },
  { id: "browser-apis", label: "Web APIs", color: "indigo", bgColor: "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400" },
  { id: "bundling", label: "Build Tools", color: "orange", bgColor: "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400" },
  { id: "security", label: "Security", color: "red", bgColor: "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400" },
  { id: "accessibility", label: "Testing", color: "pink", bgColor: "bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400" },
  { id: "rendering", label: "CSS", color: "teal", bgColor: "bg-teal-100 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400" },
];

export function ArticleFilter({
  selectedCategory,
  onSelectCategory,
  className,
}: ArticleFilterProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Filter header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#088395]/10 dark:bg-[#7AB2B2]/10">
          <Filter className="w-4 h-4 text-[#088395] dark:text-[#7AB2B2]" />
          <span className="text-sm font-medium text-[#088395] dark:text-[#7AB2B2]">
            Filter by category
          </span>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap items-center gap-3">
        {categoryCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id === "all" ? null : category.id as Category)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              "hover:scale-105 active:scale-95",
              selectedCategory === category.id
                ? "bg-[#088395] text-white shadow-lg"
                : `${category.bgColor} text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:shadow-md`,
              category.id !== "all" && "hover:opacity-90"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
