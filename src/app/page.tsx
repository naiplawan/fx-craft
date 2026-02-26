import { Hero } from "@/components/articles/hero";
import { ArticleGrid } from "@/components/articles/article-grid";
import { getAllArticles } from "@/lib/articles";

export default function HomePage() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen">
      <Hero />

      <section className="py-20 bg-gray-50/50 dark:bg-gray-950/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              All Topics
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Browse our collection of {articles.length} frontend engineering topics
            </p>
          </div>

          <ArticleGrid articles={articles} />
        </div>
      </section>
    </div>
  );
}
