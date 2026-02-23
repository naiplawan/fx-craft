import { cn } from "@/lib/utils";

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
        "not-prose my-6 p-4 rounded-lg",
        "bg-gray-50 dark:bg-gray-800/50",
        "border-l-2 border-gray-300 dark:border-gray-600",
        className
      )}
    >
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 block">
        {title}
      </span>
      <div className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}
