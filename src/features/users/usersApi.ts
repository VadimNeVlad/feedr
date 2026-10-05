import { api } from "../../app/services";
import { ChangePasswordData, User } from "../../utils/types/user";
import { Follow } from "../../utils/types/follow";

type UpdateProfile = Pick<User, "name" | "websiteUrl" | "location" | "bio">;

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
    updateUser: build.mutation<User, Partial<UpdateProfile>>({
      query: (body) => ({
        url: "user",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User", "Article", "Comment", "Follow"],
    }),
    updateUserAvatar: build.mutation<User, FormData>({
      query: (body) => ({
        url: `user/update-avatar`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User", "Article", "Comment", "Follow"],
    }),
    changePassword: build.mutation<void, ChangePasswordData>({
      query: ({ currentPassword, newPassword }) => ({
        url: "user/change-password",
        method: "PUT",
        body: { currentPassword, newPassword },
      }),
    }),
    followUser: build.mutation<Follow, string>({
      query: (id) => ({
        url: `user/${id}/follow`,
        method: "POST",
      }),
      invalidatesTags: ["User", "Follow"],
    }),
    unfollowUser: build.mutation<{ count: number }, string>({
      query: (id) => ({
        url: `user/${id}/follow`,
        method: "DELETE",
      }),
      invalidatesTags: ["User", "Follow"],
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
