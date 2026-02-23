import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Article, Category } from "@/types/article";

const articlesDirectory = path.join(process.cwd(), "src/content/articles");

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticles = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        ...(data as Omit<Article, "content">),
        content,
      } as Article;
    });

  return allArticles.sort((a, b) => a.title.localeCompare(b.title));
}

export function getPublishedArticles(): Article[] {
  return getAllArticles().filter((article) => article.status === "published");
}

export function getArticleBySlug(slug: string): Article | null {
  const articles = getAllArticles();
  return articles.find((article) => article.slug === slug) || null;
}

export function getArticlesByCategory(category: Category): Article[] {
  return getAllArticles().filter((article) => article.category === category);
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter((article) => article.tags.includes(tag));
}

export function searchArticles(query: string): Article[] {
  const lowerQuery = query.toLowerCase();
  return getAllArticles().filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.description.toLowerCase().includes(lowerQuery) ||
      article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

export function filterArticles(
  articles: Article[],
  options: {
    category?: Category;
    query?: string;
  }
): Article[] {
  let filtered = articles;

  if (options.category) {
    filtered = filtered.filter((article) => article.category === options.category);
  }

  if (options.query) {
    const lowerQuery = options.query.toLowerCase();
    filtered = filtered.filter(
      (article) =>
        article.title.toLowerCase().includes(lowerQuery) ||
        article.description.toLowerCase().includes(lowerQuery) ||
        article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  }

  return filtered;
}
