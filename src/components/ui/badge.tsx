import { cn } from "@/lib/utils";
import { categories } from "@/lib/constants";
import type { Category } from "@/types/article";

interface BadgeProps {
  category: Category;
  className?: string;
}

export function Badge({ category, className }: BadgeProps) {
  const categoryConfig = categories.find((c) => c.id === category);

  if (!categoryConfig) {
    return null;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        categoryConfig.bgColor,
        categoryConfig.color,
        categoryConfig.borderColor,
        "border",
        className
      )}
    >
      {categoryConfig.label}
    </span>
  );
}
