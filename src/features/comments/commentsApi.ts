import { api } from "../../app/services";
import { Comment, CommentData } from "../../utils/types/comment";
import { COMMENTS_PAGE_SIZE } from "./constants";

export const commentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query<Comment[], { id: string; page?: number }>({
      query: ({ id, page = 0 }) => ({
        url: `comments/${encodeURIComponent(id)}`,
        params: { page, per_page: COMMENTS_PAGE_SIZE },
      }),
      providesTags: ["Comment"],
    }),
    createComment: build.mutation<Comment, CommentData>({
      query: ({ content, articleId }) => ({
        url: `comments/${encodeURIComponent(articleId)}`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (_result, _error, { articleId }) => [
        "Comment",
        { type: "Article", id: articleId },
        "User",
      ],
    }),
    updateComment: build.mutation<Comment, { id: string; content: string }>({
      query: ({ id, content }) => ({
        url: `comments/${encodeURIComponent(id)}`,
        method: "PUT",
        body: { content },
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteComment: build.mutation<void, Pick<Comment, "id" | "articleId">>({
      query: ({ id }) => ({
        url: `comments/${encodeURIComponent(id)}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { articleId }) => [
        "Comment",
        { type: "Article", id: articleId },
        "User",
      ],
    }),
  }),
});
export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
