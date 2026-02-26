"use client";

import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";

interface CategoryFilterProps {
  categories: Array<{
    id: string;
    name: string;
    color?: string;
  }>;
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="relative">
      {/* Filter header */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#088395]/10 dark:bg-[#7AB2B2]/10">
          <Filter className="w-4 h-4 text-[#088395] dark:text-[#7AB2B2]" />
          <span className="text-sm font-medium text-[#088395] dark:text-[#7AB2B2]">
            Filter by category
          </span>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
              "hover:scale-105 active:scale-95",
              "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300",
              "hover:bg-gray-100 dark:hover:bg-gray-700",
              "border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
              "hover:shadow-md",
              selectedCategory === category.id
                ? "bg-[#088395] text-white shadow-lg transform scale-105"
                : "animate-fade-in"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}