import { api } from "../../app/services";
import { User } from "../../utils/types/user";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCurrentUser: build.query<User, void>({
      query: () => "user",
    }),
  }),
});

export const { useGetCurrentUserQuery } = usersApi;
