import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { compileArticleContent } from "@/lib/mdx";
import { ArticleHeader } from "@/components/article-detail/article-header";
import { ResourceLinks } from "@/components/article-detail/resource-links";
import { RelatedTopics } from "@/components/article-detail/related-topics";
import { StubNotice } from "@/components/article-detail/stub-notice";
import { siteMetadata } from "@/lib/constants";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      images: [siteMetadata.ogImage],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const content = await compileArticleContent(article);

  return (
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <ArticleHeader article={article} />

      <div className="prose dark:prose-invert max-w-none">
        {article.status === "stub" ? (
          <StubNotice />
        ) : (
          <>
            {content}
            <ResourceLinks resources={article.resources} />
            <RelatedTopics slugs={article.related} />
          </>
        )}
      </div>
    </article>
  );
}
