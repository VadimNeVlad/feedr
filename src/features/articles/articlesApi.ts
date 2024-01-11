import { api } from "../../app/services";
import { Article, ArticleData } from "../../utils/types/articles";

export const articlesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query<Article[], void>({
      query: () => "/articles",
      providesTags: [{ type: "Article", id: "LIST" }],
    }),
    createArticle: build.mutation<Article, ArticleData>({
      query: (body) => ({
        url: "/articles",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Article"],
    }),
  }),
});

export const { useGetArticlesQuery, useCreateArticleMutation } = articlesApi;
