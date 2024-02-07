import { api } from "../../app/services";
import { Comment, CommentData } from "../../utils/types/comment";
import { articlesApi } from "../articles/articlesApi";

export const commentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query<Comment[], string>({
      query: (id) => `comments/${id}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Comment" as const, id })),
              { type: "Comment", id: "LIST" },
            ]
          : [{ type: "Comment", id: "LIST" }],
    }),
    createComment: build.mutation<Comment, CommentData>({
      query: ({ content, articleId }) => ({
        url: `comments/${articleId}`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: ["Comment"],
      async onQueryStarted({ articleId }, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          articlesApi.util.updateQueryData(
            "getSingleArticle",
            articleId,
            (draft) => {
              draft.commentsCount += 1;
            }
          )
        );
      },
    }),
  }),
});

export const { useGetCommentsQuery, useCreateCommentMutation } = commentsApi;
