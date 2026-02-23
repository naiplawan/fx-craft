import { ArticlesClient } from "@/components/articles/articles-client";
import { getAllArticles } from "@/lib/articles";

export default function ArticlesPage() {
  const articles = getAllArticles();

  return <ArticlesClient articles={articles} />;
}
