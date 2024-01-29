import { api } from "../../app/services";
import { User } from "../../utils/types/user";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCurrentUser: build.query<User, void>({
      query: () => "user",
      providesTags: ["User"],
    }),
    getUserById: build.query<User, string>({
      query: (id) => `user/${id}`,
      providesTags: (_result, _err, id) => [{ type: "User", id }],
    }),
    updateUserAvatar: build.mutation<User, FormData>({
      query: (body) => ({
        url: `user/update-avatar`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User", "Article"],
    }),
    followUser: build.mutation<User, string>({
      query: (id) => ({
        url: `user/${id}/follow`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    unfollowUser: build.mutation<User, string>({
      query: (id) => ({
        url: `user/${id}/follow`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
  useUpdateUserAvatarMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
} = usersApi;
