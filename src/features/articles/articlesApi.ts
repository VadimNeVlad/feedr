import { api } from "../../app/services";
import { Article, ArticlesParams } from "../../utils/types/articles";

export const articlesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query<Article[], ArticlesParams>({
      query: ({ page = 0, sortBy = "Latest" }) => ({
        url: "articles",
        method: "GET",
        params: {
          page: page,
          per_page: 10,
          sort_by: sortBy,
        },
      }),

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newCache, { arg }) => {
        if (arg.page === 0) {
          return newCache;
        }
        currentCache.push(...newCache);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Article" as const, id })),
              { type: "Article", id: "LIST" },
            ]
          : [{ type: "Article", id: "LIST" }],
    }),
    getArticlesByAuthor: build.query<Article[], string>({
      query: (id) => `articles/author/${id}`,
      providesTags: [{ type: "Article", id: "LIST" }],
    }),
    getSingleArticle: build.query<Article, string>({
      query: (id) => `articles/${id}`,
      providesTags: (_res, _err, id) => [{ type: "Article", id }],
    }),
    createArticle: build.mutation<Article, FormData>({
      query: (body) => ({
        url: "articles",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Article", id: "LIST" }],
    }),
    updateArticle: build.mutation<Article, FormData>({
      query: (body) => ({
        url: `articles/${body.get("id")}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Article"],
    }),
    deleteArticle: build.mutation<Article, string>({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Article", id: "LIST" }],
    }),
    favoriteArticle: build.mutation<Article, string>({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: "POST",
      }),
      invalidatesTags: ["Article"],
    }),
    unfavoriteArticle: build.mutation<Article, string>({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: "DELETE",
      }),
      invalidatesTags: ["Article"],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticlesByAuthorQuery,
  useGetSingleArticleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} = articlesApi;
