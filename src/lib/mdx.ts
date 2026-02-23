import { compileMDX } from "next-mdx-remote/rsc";
import type { Article } from "@/types/article";
import { DefinitionBlock } from "@/components/article-detail/definition-block";
import { KeyTakeaway } from "@/components/article-detail/key-takeaway";
import { ResourceLinks } from "@/components/article-detail/resource-links";
import { RelatedTopics } from "@/components/article-detail/related-topics";
import { StubNotice } from "@/components/article-detail/stub-notice";

const components = {
  DefinitionBlock,
  KeyTakeaway,
  ResourceLinks,
  RelatedTopics,
  StubNotice,
};

export async function compileArticleContent(article: Article) {
  const { content } = await compileMDX({
    source: article.content,
    components,
    options: {
      parseFrontmatter: false,
    },
  });

  return content;
}
