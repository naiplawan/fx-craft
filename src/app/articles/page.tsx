import { ArticlesPageContents } from "@/components/articles/articles-page-contents";
import { getAllArticles } from "@/lib/articles";

export default function ArticlesPage() {
  const articles = getAllArticles();

  return <ArticlesPageContents articles={articles} />;
}
