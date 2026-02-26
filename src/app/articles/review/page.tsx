import { getAllArticles } from "@/lib/articles";
import { ReviewQueue } from "@/components/learning/review-queue";

export default function ReviewPage() {
  const articles = getAllArticles();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Spaced Review
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Strengthen your memory with our science-backed review system
        </p>
      </div>

      <ReviewQueue articles={articles} />
    </div>
  );
}
