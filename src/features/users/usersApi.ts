import { api } from "../../app/services";
import { User } from "../../utils/types/user";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCurrentUser: build.query<User, void>({
      query: () => "user",
      providesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const { useGetCurrentUserQuery } = usersApi;
