import { cn } from "@/lib/utils";
import { Lightbulb } from "lucide-react";

interface KeyTakeawayProps {
  children: React.ReactNode;
  className?: string;
}

export function KeyTakeaway({ children, className }: KeyTakeawayProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[#088395]/20 dark:border-[#7AB2B2]/30 overflow-hidden",
        className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-[#088395] dark:bg-[#7AB2B2]/20 border-b border-[#088395]/20 dark:border-[#7AB2B2]/30">
        <Lightbulb className="w-4 h-4 text-white dark:text-[#7AB2B2]" />
        <span className="text-sm font-semibold text-white dark:text-[#7AB2B2]">
          Key Takeaway
        </span>
      </div>
      <div className="px-4 py-4 bg-[#EBF4F6] dark:bg-[#09637E]/10 prose dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  );
}
