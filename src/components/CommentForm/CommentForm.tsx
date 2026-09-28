import { Card, CardContent, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { CommentData } from "../../utils/types/comment";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCreateCommentMutation } from "../../features/comments/commentsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { apiErrorMessage } from "../../utils/helpers/apiError";

interface CommentFormProps {
  articleId: string;
  isFetching?: boolean;
}

export const CommentForm = ({ articleId }: CommentFormProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentData>();
  const onSubmit = async (data: CommentData) => {
    try {
      await createComment({ articleId, content: data.content.trim() }).unwrap();
      reset({ content: "" });
    } catch (error) {
      toast.error(apiErrorMessage(error));
    }
  };
  return (
    <Card sx={{ borderRadius: 0 }}>
      <CardContent>
        {user ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Add to the discussion"
              multiline
              fullWidth
              minRows={2}
              maxRows={5}
              error={!!errors.content}
              helperText={errors.content?.message}
              sx={{ mb: 2 }}
              {...register("content", {
                validate: (value) => !!value.trim() || "Comment is required",
                maxLength: {
                  value: 10000,
                  message: "Maximum 10000 characters",
                },
              })}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
            >
              Submit
            </LoadingButton>
          </form>
        ) : (
          <Button component={Link} to="/login">
            Log in to join the discussion
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
