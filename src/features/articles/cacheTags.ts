import { ArticleData } from "../../utils/types/articles";

/** Tags a list page by every article on it, so single-article changes refetch only affected pages. */
export const articleListTags = (
  result: ArticleData | undefined,
  list = "LIST",
) => [
  { type: "Article" as const, id: list },
  ...(result?.articles.map(({ id }) => ({ type: "Article" as const, id })) ??
    []),
];
