import { api } from "../../app/services";
import { Article } from "../../utils/types/articles";

export const articlesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query<Article[], void>({
      query: () => "/articles",
    }),
  }),
});

export const { useGetArticlesQuery } = articlesApi;
