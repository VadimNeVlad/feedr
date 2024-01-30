import { api } from "../../app/services";
import { Follow } from "../../utils/types/follow";

export const followsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFollowings: build.query<Follow[], string>({
      query: (id) => `${id}/following`,
      providesTags: ["Follow"],
    }),
  }),
});

export const { useGetFollowingsQuery } = followsApi;
