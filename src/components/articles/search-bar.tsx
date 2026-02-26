"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search articles...",
  className,
}: SearchBarProps) {
  return (
    <div className={cn("relative max-w-2xl mx-auto", className)}>
      {/* Background glow effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#088395]/5 to-[#7AB2B2]/5 rounded-lg blur-xl opacity-70" />

      <div className="relative flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-l-lg bg-[#088395]/10 dark:bg-[#7AB2B2]/10">
          <Search className="w-5 h-5 text-[#088395] dark:text-[#7AB2B2]" />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "flex-1 py-3 px-4",
            "bg-white dark:bg-gray-900",
            "border-0 border-l border-r border-gray-200 dark:border-gray-700",
            "text-gray-900 dark:text-gray-100",
            "placeholder:text-gray-500 dark:placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-[#088395] dark:focus:ring-[#7AB2B2]",
            "transition-all"
          )}
        />

        {value && (
          <button
            onClick={() => onChange("")}
            className="flex items-center justify-center w-10 h-10 rounded-r-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        )}
      </div>

      {/* Search hint */}
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
        Search by title, description, or tags
      </p>
    </div>
  );
}
