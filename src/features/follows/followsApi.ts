import { api } from "../../app/services";
import { Follow, FollowParams } from "../../utils/types/follow";
import { FOLLOWS_PAGE_SIZE } from "./constants";

export const followsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFollowings: build.query<Follow[], FollowParams>({
      query: ({ id, page = 0, perPage = FOLLOWS_PAGE_SIZE }) => ({
        url: `${encodeURIComponent(id)}/following`,
        params: { page, per_page: perPage },
      }),
      providesTags: ["Follow"],
    }),
    getFollowers: build.query<Follow[], FollowParams>({
      query: ({ id, page = 0, perPage = FOLLOWS_PAGE_SIZE }) => ({
        url: `${encodeURIComponent(id)}/followers`,
        params: { page, per_page: perPage },
      }),
      providesTags: ["Follow"],
    }),
  }),
});

export const { useGetFollowingsQuery, useGetFollowersQuery } = followsApi;
