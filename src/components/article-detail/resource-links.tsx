import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Resource } from "@/types/article";

interface ResourceLinksProps {
  resources: Resource[];
  className?: string;
}

export function ResourceLinks({ resources, className }: ResourceLinksProps) {
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <div className={cn("mt-12 pt-8 border-t border-gray-200 dark:border-gray-800", className)}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Resources & References
      </h3>
      <ul className="space-y-3">
        {resources.map((resource, index) => (
          <li key={index}>
            <Link
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#088395] dark:text-[#7AB2B2] hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              {resource.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
