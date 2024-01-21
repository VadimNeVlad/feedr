import { api } from "../../app/services";
import { Article, UpdateArticleData } from "../../utils/types/articles";

export const articlesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query<Article[], void>({
      query: () => "/articles",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Article" as const, id })),
              { type: "Article", id: "LIST" },
            ]
          : [{ type: "Article", id: "LIST" }],
    }),
    getSingleArticle: build.query<Article, string>({
      query: (slug) => `/articles/${slug}`,
      providesTags: (_res, _err, id) => [{ type: "Article", id }],
    }),
    createArticle: build.mutation<Article, FormData>({
      query: (body) => ({
        url: "/articles",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Article", id: "LIST" }],
    }),
    updateArticle: build.mutation<Article, UpdateArticleData>({
      query: ({ slug, ...body }) => ({
        url: `/articles/${slug}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Article"],
    }),
    deleteArticle: build.mutation<Article, string>({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Article", id: "LIST" }],
    }),
    favoriteArticle: build.mutation<Article, string>({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: "POST",
      }),
      invalidatesTags: ["Article"],
    }),
    unfavoriteArticle: build.mutation<Article, string>({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: "DELETE",
      }),
      invalidatesTags: ["Article"],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetSingleArticleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} = articlesApi;
