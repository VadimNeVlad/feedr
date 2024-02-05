import { api } from "../../app/services";
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
  }),
});

export const { useGetTagsQuery } = followsApi;
