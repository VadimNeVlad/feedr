import React, { useEffect } from "react";
import { Card, CardContent, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { CommentData } from "../../utils/types/comment";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCreateCommentMutation } from "../../features/comments/commentsApi";
import { CommentFormProps } from "../../utils/types/props";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";

export const CommentForm: React.FC<CommentFormProps> = ({
  articleId,
  isFetching,
}) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [createArticle, { isLoading, isSuccess }] = useCreateCommentMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentData>();

  useEffect(() => {
    if (isSuccess && !isFetching) {
      reset();
    }
  }, [isSuccess, reset, isFetching]);

  const onSubmit = (data: { content: string }) => {
    const commentData: CommentData = {
      ...data,
      articleId,
    };

    createArticle(commentData);
  };

  return (
    <Card sx={{ borderRadius: 0 }}>
      <CardContent sx={{ pt: 0 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            multiline
            fullWidth
            minRows={2}
            maxRows={5}
            placeholder="Add to the discussion"
            onClick={!user ? () => navigate("/login") : undefined}
            sx={{ borderRadius: 0, outline: "none", mb: "16px" }}
            {...register("content", { required: true })}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            disabled={errors.content?.type === "required" || !user}
            loading={isLoading || isFetching}
          >
            Submit
          </LoadingButton>
        </form>
      </CardContent>
    </Card>
  );
};
