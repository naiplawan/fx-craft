import type { CategoryConfig } from "@/types/article";

export const categories: CategoryConfig[] = [
  {
    id: "rendering",
    label: "Rendering",
    color: "text-purple-700 dark:text-purple-300",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    borderColor: "border-purple-200 dark:border-purple-800",
  },
  {
    id: "react-internals",
    label: "React Internals",
    color: "text-blue-700 dark:text-blue-300",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  {
    id: "performance",
    label: "Performance",
    color: "text-orange-700 dark:text-orange-300",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    borderColor: "border-orange-200 dark:border-orange-800",
  },
  {
    id: "javascript-core",
    label: "JavaScript Core",
    color: "text-yellow-700 dark:text-yellow-300",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    borderColor: "border-yellow-200 dark:border-yellow-800",
  },
  {
    id: "browser-apis",
    label: "Browser APIs",
    color: "text-green-700 dark:text-green-300",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    borderColor: "border-green-200 dark:border-green-800",
  },
  {
    id: "networking",
    label: "Networking",
    color: "text-teal-700 dark:text-teal-300",
    bgColor: "bg-teal-100 dark:bg-teal-900/30",
    borderColor: "border-teal-200 dark:border-teal-800",
  },
  {
    id: "security",
    label: "Security",
    color: "text-red-700 dark:text-red-300",
    bgColor: "bg-red-100 dark:bg-red-900/30",
    borderColor: "border-red-200 dark:border-red-800",
  },
  {
    id: "architecture",
    label: "Architecture",
    color: "text-indigo-700 dark:text-indigo-300",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
    borderColor: "border-indigo-200 dark:border-indigo-800",
  },
  {
    id: "bundling",
    label: "Bundling",
    color: "text-amber-700 dark:text-amber-300",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    borderColor: "border-amber-200 dark:border-amber-800",
  },
  {
    id: "accessibility",
    label: "Accessibility",
    color: "text-pink-700 dark:text-pink-300",
    bgColor: "bg-pink-100 dark:bg-pink-900/30",
    borderColor: "border-pink-200 dark:border-pink-800",
  },
];

export const siteMetadata = {
  title: "FECraft",
  description: "Advanced frontend engineering knowledge base - curated technical concepts for senior developers",
  url: "https://fecraft.dev",
  ogImage: "/og-image.png",
};
