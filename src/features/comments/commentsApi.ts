import { api } from "../../app/services";
import { Comment, CommentData } from "../../utils/types/comment";

export const commentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query<Comment[], string>({
      query: (id) => `comments/${id}`,
    }),
    createComment: build.mutation<Comment, CommentData>({
      query: ({ content, articleId }) => ({
        url: `comments/${articleId}`,
        method: "POST",
        body: { content },
      }),
    }),
  }),
});

export const { useGetCommentsQuery, useCreateCommentMutation } = commentsApi;
