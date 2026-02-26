"use client";

import { useLearningProgress } from "@/hooks/use-learning-progress";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Circle, Bookmark, Maximize2 } from "lucide-react";

interface ArticleProgressIndicatorProps {
  articleSlug: string;
  title: string;
  category: string;
  difficulty: string;
}

export function ArticleProgressIndicator({
  articleSlug,
  title,
  category,
  difficulty,
}: ArticleProgressIndicatorProps) {
  const { progress, startReading, updateProgress, isRead, isStarted, completionPercentage } =
    useLearningProgress(articleSlug);
  const [isActive, setIsActive] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Start tracking when component mounts
    startReading();
    setIsActive(true);

    const interval = setInterval(() => {
      // Update progress every 10 seconds
      if (isActive) {
        const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
        updateProgress(Math.min(completionPercentage + 1, 100), timeSpent);
      }
    }, 10000);

    // Track scroll progress
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);

      if (scrollPercent > completionPercentage) {
        const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
        updateProgress(Math.floor(scrollPercent), timeSpent);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
      setIsActive(false);
    };
  }, [articleSlug, startReading, updateProgress, completionPercentage, isActive]);

  return (
    <div className="sticky top-16 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Progress Icon */}
            {isRead ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
            ) : isStarted ? (
              <div className="w-5 h-5 relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full border-2 border-[#088395] dark:border-[#7AB2B2]" />
                <div
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#088395] dark:border-t-[#7AB2B2] animate-spin"
                  style={{ animationDuration: "2s" }}
                />
              </div>
            ) : (
              <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
            )}

            {/* Title */}
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {title}
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{category}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{difficulty}</span>
              </div>
            </div>

            {/* Progress Bar */}
            {isStarted && !isRead && (
              <div className="hidden sm:block w-48">
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                  <span>Reading Progress</span>
                  <span>{completionPercentage}%</span>
                </div>
                <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#088395] to-[#7AB2B2] transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
            )}

            {/* Completion Badge */}
            {isRead && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Completed
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-4">
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Save note"
            >
              <Bookmark className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Focus mode"
            >
              <Maximize2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}