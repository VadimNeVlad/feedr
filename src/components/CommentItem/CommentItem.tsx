import { userPath } from "../../utils/helpers/routes";
import { Comment } from "../../utils/types/comment";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { trimFirstLetter } from "../../utils/helpers/trimString";
import { formatDate } from "../../utils/helpers/formatDate";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from "../../features/comments/commentsApi";
import { useMutationAction } from "../../hooks/useMutationAction";

interface CommentItemProps {
  comment: Comment;
}

type CommentMode = "view" | "edit" | "delete";

export const CommentItem = ({ comment }: CommentItemProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [mode, setMode] = useState<CommentMode>("view");
  const [content, setContent] = useState(comment.content);
  const [update, updating] = useUpdateCommentMutation();
  const [remove, removing] = useDeleteCommentMutation();
  const pending = updating.isLoading || removing.isLoading;
  const isAuthor = user?.id === comment.author.id;
  const editing = isAuthor && mode === "edit";

  const save = useMutationAction(async () => {
    if (!isAuthor || pending || !content.trim()) return;

    await update({ id: comment.id, content: content.trim() }).unwrap();
    setMode("view");
  });

  const destroy = useMutationAction(async () => {
    if (!isAuthor || pending) return;

    await remove({ id: comment.id, articleId: comment.articleId }).unwrap();
    setMode("view");
  });

  return (
    <Card sx={{ borderRadius: 0 }}>
      <CardContent sx={{ display: "flex", gap: 2 }}>
        <Link
          to={userPath(comment.author.id)}
          aria-label={comment.author.name}
        >
          <Avatar src={comment.author.image}>
            {trimFirstLetter(comment.author.name)}
          </Avatar>
        </Link>
        <Box sx={{ width: "100%", overflowWrap: "anywhere" }}>
          <Link to={userPath(comment.author.id)}>{comment.author.name}</Link>
          <Typography variant="body2" color="text.secondary">
            {formatDate(comment.createdAt, false)}
          </Typography>
          {editing ? (
            <Box
              component="form"
              onSubmit={(event) => {
                event.preventDefault();
                void save();
              }}
            >
              <TextField
                label="Edit comment"
                multiline
                fullWidth
                value={content}
                onChange={(event) => setContent(event.target.value)}
                inputProps={{ maxLength: 10000 }}
              />
              <Button type="submit" disabled={pending || !content.trim()}>
                Save
              </Button>
              <Button disabled={pending} onClick={() => setMode("view")}>
                Cancel
              </Button>
            </Box>
          ) : (
            <Typography sx={{ whiteSpace: "pre-wrap" }}>
              {comment.content}
            </Typography>
          )}
          {isAuthor && !editing && (
            <Box>
              {mode === "delete" ? (
                <>
                  <Typography>Delete this comment?</Typography>
                  <Button color="error" disabled={pending} onClick={destroy}>
                    Confirm deletion
                  </Button>
                  <Button
                    disabled={pending}
                    onClick={() => setMode("view")}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    disabled={pending}
                    onClick={() => {
                      setContent(comment.content);
                      setMode("edit");
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    disabled={pending}
                    onClick={() => setMode("delete")}
                  >
                    Delete
                  </Button>
                </>
              )}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
