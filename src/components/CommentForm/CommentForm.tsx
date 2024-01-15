import { TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { CommentData } from "../../utils/types/comment";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCreateCommentMutation } from "../../features/comments/commentsApi";
import { CommentFormProps } from "../../utils/types/props";

export const CommentForm: React.FC<CommentFormProps> = ({ articleId }) => {
  const [createArticle, { isLoading }] = useCreateCommentMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentData>();

  const onSubmit = (data: { content: string }) => {
    const commentData: CommentData = {
      ...data,
      articleId,
    };

    createArticle(commentData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        multiline
        fullWidth
        rows={2}
        placeholder="Add to the discussion"
        style={{ backgroundColor: "#fff", borderRadius: 0 }}
        {...register("content", { required: true })}
      />
      <LoadingButton
        type="submit"
        disabled={!!errors.content}
        loading={isLoading}
      >
        Submit
      </LoadingButton>
    </form>
  );
};
