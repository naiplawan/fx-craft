import { cn } from "@/lib/utils";

interface KeyTakeawayProps {
  children: React.ReactNode;
  className?: string;
}

export function KeyTakeaway({ children, className }: KeyTakeawayProps) {
  return (
    <div
      className={cn(
        "not-prose my-6 p-4 rounded-lg",
        "bg-amber-50 dark:bg-amber-900/20",
        "border-l-2 border-amber-400 dark:border-amber-500",
        className
      )}
    >
      <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 block">
        Key Takeaway
      </span>
      <div className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}
