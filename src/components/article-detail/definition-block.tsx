import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

interface DefinitionBlockProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function DefinitionBlock({
  title = "Definition",
  children,
  className,
}: DefinitionBlockProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden",
        className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <Info className="w-4 h-4 text-[#7AB2B2]" />
        <span className="text-sm font-semibold text-white dark:text-gray-100">
          {title}
        </span>
      </div>
      <div className="px-4 py-4 bg-white dark:bg-gray-950 prose dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  );
}
