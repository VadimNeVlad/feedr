import { api } from "../../app/services";
import { ChangePasswordData, User } from "../../utils/types/user";

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
    updateUser: build.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "user",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateUserAvatar: build.mutation<User, FormData>({
      query: (body) => ({
        url: `user/update-avatar`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User", "Article"],
    }),
    changePassword: build.mutation<void, ChangePasswordData>({
      query: (body) => ({
        url: "user/change-password",
        method: "PUT",
        body,
      }),
    }),
    followUser: build.mutation<User, string>({
      query: (id) => ({
        url: `user/${id}/follow`,
        method: "POST",
      }),
      invalidatesTags: ["Follow"],
    }),
    unfollowUser: build.mutation<User, string>({
      query: (id) => ({
        url: `user/${id}/follow`,
        method: "DELETE",
      }),
      invalidatesTags: ["Follow"],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useUpdateUserAvatarMutation,
  useChangePasswordMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
} = usersApi;
