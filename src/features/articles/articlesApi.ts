import { api } from "../../app/services";
import type { RootState } from "../../app/store";
import { ARTICLES_PAGE_SIZE } from "./constants";
import { articleListTags } from "./cacheTags";
import {
  Article,
  ArticleData,
  ArticlesParams,
} from "../../utils/types/articles";

export const articlesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query<ArticleData, ArticlesParams>({
      query: ({ page = 0, sortBy = "latest", q }) => ({
        url: "articles",
        params: { page, per_page: ARTICLES_PAGE_SIZE, sort_by: sortBy, q },
      }),
      providesTags: (result) => articleListTags(result),
    }),
    getArticlesByAuthor: build.query<ArticleData, ArticlesParams>({
      query: ({ page = 0, authorId }) => ({
        url: `articles/author/${encodeURIComponent(authorId || "")}`,
        params: { page, per_page: ARTICLES_PAGE_SIZE },
      }),
      providesTags: (result) => articleListTags(result),
    }),
    getSingleArticle: build.query<Article, string>({
      query: (id) => `articles/${encodeURIComponent(id)}`,
      providesTags: (_res, _err, id) => [{ type: "Article", id }],
    }),
    getReadingList: build.query<ArticleData, { page?: number }>({
      query: ({ page = 0 }) => ({
        url: "articles/user/reading-list",
        params: { page, per_page: ARTICLES_PAGE_SIZE },
      }),
      providesTags: (result) => articleListTags(result, "READING_LIST"),
    }),
    createArticle: build.mutation<Article, FormData>({
      query: (body) => ({ url: "articles", method: "POST", body }),
      invalidatesTags: ["Article", "Tag", "User"],
    }),
    updateArticle: build.mutation<Article, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `articles/${encodeURIComponent(id)}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Article", "Tag", "User"],
    }),
    deleteArticle: build.mutation<void, string>({
      query: (id) => ({
        url: `articles/${encodeURIComponent(id)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Article", "Tag", "User", "Comment"],
    }),
    favoriteArticle: build.mutation<Article, string>({
      query: (id) => ({
        url: `articles/${encodeURIComponent(id)}/favorite`,
        method: "POST",
      }),
      onQueryStarted: syncFavorite,
      invalidatesTags: [{ type: "Article", id: "READING_LIST" }],
    }),
    unfavoriteArticle: build.mutation<Article, string>({
      query: (id) => ({
        url: `articles/${encodeURIComponent(id)}/favorite`,
        method: "DELETE",
      }),
      onQueryStarted: syncFavorite,
      invalidatesTags: [{ type: "Article", id: "READING_LIST" }],
    }),
  }),
});

/**
 * Applies the server's favorite state to every cached copy of the article instead of
 * refetching whole feeds: a refetch would also reorder "top" feeds between loaded pages.
 */
async function syncFavorite(
  id: string,
  {
    dispatch,
    getState,
    queryFulfilled,
  }: {
    dispatch: (action: unknown) => unknown;
    getState: () => unknown;
    queryFulfilled: Promise<{ data: Article }>;
  },
) {
  let article: Article;

  try {
    ({ data: article } = await queryFulfilled);
  } catch {
    return;
  }

  const patch = (target: Article) => {
    if (target.id !== id) return;

    target.isFavorited = article.isFavorited;
    target._count.favorited = article._count.favorited;
  };

  for (const entry of api.util.selectInvalidatedBy(getState() as RootState, [
    { type: "Article", id },
  ])) {
    const { endpointName, originalArgs } = entry;

    if (endpointName === "getSingleArticle") {
      dispatch(
        articlesApi.util.updateQueryData(endpointName, originalArgs, patch),
      );
    } else if (
      endpointName === "getArticles" ||
      endpointName === "getArticlesByAuthor" ||
      endpointName === "getTagArticles"
    ) {
      // All three feeds share ArticleData; getTagArticles is injected by tagsApi into the same slice.
      dispatch(
        articlesApi.util.updateQueryData(
          endpointName as "getArticles",
          originalArgs,
          (data) => data.articles.forEach(patch),
        ),
      );
    }
  }
}

export const {
  useGetArticlesQuery,
  useGetArticlesByAuthorQuery,
  useGetSingleArticleQuery,
  useGetReadingListQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} = articlesApi;
