"use client";

import { cn } from "@/lib/utils";
import { categories } from "@/lib/constants";
import type { Category } from "@/types/article";

interface ArticleFilterProps {
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
  className?: string;
}

export function ArticleFilter({
  selectedCategory,
  onSelectCategory,
  className,
}: ArticleFilterProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <button
        onClick={() => onSelectCategory(null)}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-colors",
          selectedCategory === null
            ? "bg-[#088395] text-white"
            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
        )}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            selectedCategory === category.id
              ? "bg-[#088395] text-white"
              : cn(
                  category.bgColor,
                  category.color,
                  "hover:opacity-80"
                )
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
