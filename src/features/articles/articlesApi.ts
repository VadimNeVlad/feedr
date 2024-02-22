import { api } from "../../app/services";
import {
  Article,
  ArticleData,
  ArticlesParams,
} from "../../utils/types/articles";

// for infinite scroll merge function
let articlesPrevPage: number | undefined = 0;
let authorArticlesPrevPage: number | undefined = 0;

export const articlesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query<ArticleData, ArticlesParams>({
      query: ({ page = 0, sortBy = "latest", q }) => ({
        url: "articles",
        method: "GET",
        params: {
          page,
          per_page: 10,
          sort_by: sortBy,
          q,
        },
      }),

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newCache, { arg }) => {
        if (arg.page === 0) {
          articlesPrevPage = 0;
          return newCache;
        }

        if (arg.page === articlesPrevPage) {
          return currentCache;
        } else {
          currentCache.articles.push(...newCache.articles);
          articlesPrevPage = arg.page;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        if (
          !previousArg?.q &&
          currentArg?.page === previousArg?.page &&
          currentArg?.sortBy === previousArg?.sortBy
        ) {
          return false;
        }
        return currentArg !== previousArg;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.articles.map(({ id }) => ({
                type: "Article" as const,
                id,
              })),
              { type: "Article", id: "LIST" },
            ]
          : [{ type: "Article", id: "LIST" }],
    }),
    getArticlesByAuthor: build.query<ArticleData, ArticlesParams>({
      query: ({ page = 0, authorId }) => ({
        url: `articles/author/${authorId}`,
        method: "GET",
        params: {
          page,
          per_page: 10,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newCache, { arg }) => {
        if (arg.page === 0) {
          authorArticlesPrevPage = 0;
          return newCache;
        }

        if (arg.page === authorArticlesPrevPage) {
          return currentCache;
        } else {
          currentCache.articles.push(...newCache.articles);
          authorArticlesPrevPage = arg.page;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: [{ type: "Article", id: "LIST" }],
    }),
    getSingleArticle: build.query<Article, string>({
      query: (id) => `articles/${id}`,
      providesTags: (_res, _err, id) => [{ type: "Article", id }],
    }),
    getReadingList: build.query<ArticleData, void>({
      query: () => "articles/user/reading-list",
      providesTags: [{ type: "Article", id: "LIST" }],
    }),
    createArticle: build.mutation<Article, FormData>({
      query: (body) => ({
        url: "articles",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Article", id: "LIST" }, { type: "Tag" }],
    }),
    updateArticle: build.mutation<Article, FormData>({
      query: (body) => ({
        url: `articles/${body.get("id")}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Article", "Tag"],
    }),
    deleteArticle: build.mutation<Article, string>({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Article", id: "LIST" }, { type: "Tag" }],
    }),
    favoriteArticle: build.mutation<Article, string>({
      query: (id) => ({
        url: `articles/${id}/favorite`,
        method: "POST",
      }),
      invalidatesTags: ["Article"],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          articlesApi.util.updateQueryData("getSingleArticle", id, (draft) => {
            draft._count.favorited += 1;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    unfavoriteArticle: build.mutation<Article, string>({
      query: (id) => ({
        url: `articles/${id}/favorite`,
        method: "DELETE",
      }),
      invalidatesTags: ["Article"],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          articlesApi.util.updateQueryData("getSingleArticle", id, (draft) => {
            draft._count.favorited -= 1;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

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
