import { api } from "../../app/services";
import { ArticlesParams, ArticlesResponse } from "../../utils/types/articles";
import { Tag } from "../../utils/types/tag";

export const followsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTags: build.query<Tag[], string>({
      query: (searchQuery) => ({
        url: `tags`,
        method: "GET",
        params: {
          q: searchQuery,
        },
      }),
    }),
    getTagArticles: build.query<ArticlesResponse, ArticlesParams>({
      query: ({ page = 0, sortBy = "latest", tagName }) => ({
        url: `tags/${tagName}`,
        method: "GET",
        params: {
          page,
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
        currentCache.articles.push(...newCache.articles);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ["Tag"],
    }),
  }),
});

export const { useGetTagsQuery, useGetTagArticlesQuery } = followsApi;
