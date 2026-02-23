import { cn } from "@/lib/utils";
import { Construction } from "lucide-react";

interface StubNoticeProps {
  className?: string;
}

export function StubNotice({ className }: StubNoticeProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-amber-200 dark:border-amber-800 overflow-hidden",
        className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-amber-100 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800">
        <Construction className="w-4 h-4 text-amber-700 dark:text-amber-400" />
        <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">
          Coming Soon
        </span>
      </div>
      <div className="px-4 py-4 bg-white dark:bg-gray-950">
        <p className="text-gray-600 dark:text-gray-400">
          This article is currently being written. Check back soon for the full content!
        </p>
      </div>
    </div>
  );
}
