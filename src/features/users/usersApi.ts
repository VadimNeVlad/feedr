import { api } from "../../app/services";
import { User } from "../../utils/types/user";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCurrentUser: build.query<User, void>({
      query: () => "user",
    }),
    followUser: build.mutation<User, string>({
      query: (id) => ({
        url: `user/${id}/follow`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Article", id: "LIST" }],
    }),
    unfollowUser: build.mutation<User, string>({
      query: (id) => ({
        url: `user/${id}/follow`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Article", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} = usersApi;
