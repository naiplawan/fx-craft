export interface Article {
  title: string;
  slug: string;
  subtitle: string;
  category: Category;
  icon: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  related: string[];
  resources: Resource[];
  status: "published" | "stub";
  content: string;
}

export interface Resource {
  title: string;
  url: string;
}

export type Category =
  | "rendering"
  | "react-internals"
  | "performance"
  | "javascript-core"
  | "browser-apis"
  | "networking"
  | "security"
  | "architecture"
  | "bundling"
  | "accessibility";

export interface CategoryConfig {
  id: Category;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}
