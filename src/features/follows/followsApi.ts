import { api } from "../../app/services";
import { Follow, FollowParams } from "../../utils/types/follow";

export const followsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFollowings: build.query<Follow[], FollowParams>({
      query: ({ id, perPage = 100 }) => ({
        url: `${id}/following`,
        method: "GET",
        params: {
          per_page: perPage,
        },
      }),
      providesTags: ["Follow"],
    }),
  }),
});

export const { useGetFollowingsQuery } = followsApi;
