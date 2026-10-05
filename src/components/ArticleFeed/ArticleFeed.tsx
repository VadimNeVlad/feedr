import {
  useGetArticlesByAuthorQuery,
  useGetArticlesQuery,
  useGetReadingListQuery,
} from "../../features/articles/articlesApi";
import { useGetTagArticlesQuery } from "../../features/tags/tagsApi";
import { ARTICLES_PAGE_SIZE } from "../../features/articles/constants";
import { ArticleData } from "../../utils/types/articles";
import { ArticlesList, ArticlesListVariant } from "../ArticlesList/ArticlesList";
import { PaginatedFeed, FeedPageProps } from "../PaginatedFeed/PaginatedFeed";
import { QueryError } from "../QueryError/QueryError";

type AllArticlesProps = { kind?: "all"; sortBy?: string; q?: string };
type AuthorArticlesProps = { kind: "author"; authorId: string };
type TagArticlesProps = { kind: "tag"; tagName: string; sortBy?: string };
type SavedArticlesProps = { kind: "saved" };

type ArticleFeedProps =
  | AllArticlesProps
  | AuthorArticlesProps
  | TagArticlesProps
  | SavedArticlesProps;

type ArticlesQuery = {
  currentData?: ArticleData;
  error?: unknown;
  isError: boolean;
  isFetching: boolean;
  refetch: () => unknown;
};

/** Identifies the list; a new identity restarts pagination from the first page. */
function feedKey(props: ArticleFeedProps) {
  switch (props.kind) {
    case "author":
      return `author:${props.authorId}`;
    case "tag":
      return `tag:${props.tagName}:${props.sortBy ?? ""}`;
    case "saved":
      return "saved";
    default:
      return `all:${props.q ?? ""}:${props.sortBy ?? ""}`;
  }
}

export const ArticleFeed = (props: ArticleFeedProps) => (
  <PaginatedFeed key={feedKey(props)}>
    {(pagination) => {
      switch (props.kind) {
        case "author":
          return <AuthorArticlesPage {...props} {...pagination} />;

        case "tag":
          return <TagArticlesPage {...props} {...pagination} />;

        case "saved":
          return <SavedArticlesPage {...pagination} />;

        default:
          return <AllArticlesPage {...props} {...pagination} />;
      }
    }}
  </PaginatedFeed>
);

function AllArticlesPage({
  sortBy,
  q,
  page,
  onLoadMore,
}: AllArticlesProps & FeedPageProps) {
  const query = useGetArticlesQuery({ page, sortBy, q });

  return <ArticlesPage query={query} page={page} onLoadMore={onLoadMore} />;
}

function AuthorArticlesPage({
  authorId,
  page,
  onLoadMore,
}: AuthorArticlesProps & FeedPageProps) {
  const query = useGetArticlesByAuthorQuery({ page, authorId });

  return <ArticlesPage query={query} page={page} onLoadMore={onLoadMore} />;
}

function TagArticlesPage({
  tagName,
  sortBy,
  page,
  onLoadMore,
}: TagArticlesProps & FeedPageProps) {
  const query = useGetTagArticlesQuery({ page, tagName, sortBy });

  return <ArticlesPage query={query} page={page} onLoadMore={onLoadMore} />;
}

function SavedArticlesPage({ page, onLoadMore }: FeedPageProps) {
  const query = useGetReadingListQuery({ page });

  return (
    <ArticlesPage
      query={query}
      page={page}
      onLoadMore={onLoadMore}
      variant="saved"
    />
  );
}

function ArticlesPage({
  query,
  page,
  onLoadMore,
  variant,
}: FeedPageProps & { query: ArticlesQuery; variant?: ArticlesListVariant }) {
  const data = query.currentData;

  if (query.isError) {
    return <QueryError error={query.error} retry={query.refetch} />;
  }

  // Items deleted since the previous page was loaded can leave a trailing empty page.
  if (page > 0 && data?.articles.length === 0) return null;

  const hasMore =
    !!data && page * ARTICLES_PAGE_SIZE + data.articles.length < data._count;

  return (
    <ArticlesList
      articles={data?.articles}
      isFetching={query.isFetching}
      showEmpty={page === 0}
      onLoadMore={hasMore ? onLoadMore : undefined}
      variant={variant}
    />
  );
}
