"use client";

import { Search } from "lucide-react";
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
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full pl-10 pr-4 py-3 rounded-lg",
          "bg-white dark:bg-gray-900",
          "border border-gray-200 dark:border-gray-700",
          "text-gray-900 dark:text-gray-100",
          "placeholder:text-gray-500 dark:placeholder:text-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-[#088395] dark:focus:ring-[#7AB2B2] focus:border-transparent",
          "transition-all"
        )}
      />
    </div>
  );
}
