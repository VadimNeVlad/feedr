import { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useGetCommentsQuery } from "../../features/comments/commentsApi";
import { CommentForm } from "../CommentForm/CommentForm";
import { CommentItem } from "../CommentItem/CommentItem";
import { QueryError } from "../QueryError/QueryError";
import { COMMENTS_PAGE_SIZE } from "../../features/comments/constants";

type CommentsSectionProps = { id: string; count: number };

export const CommentsSection = ({
  id,
  count,
}: CommentsSectionProps) => {
  const [page, setPage] = useState(0);
  const lastPage = Math.max(0, Math.ceil(count / COMMENTS_PAGE_SIZE) - 1);
  const visiblePage = Math.min(page, lastPage);
  const query = useGetCommentsQuery({ id, page: visiblePage });

  // Keep pagination on the remaining page if deleting a comment removed a page.
  if (page !== visiblePage) setPage(visiblePage);

  return (
    <Box>
      <Typography variant="h6" component="h2" sx={{ p: 2 }}>
        Discussion ({count})
      </Typography>
      <CommentForm articleId={id} />
      {query.isError && <QueryError error={query.error} retry={query.refetch} />}

      {!query.isError && !query.currentData && (
        <CircularProgress aria-label="Loading comments" />
      )}

      {!query.isError &&
        query.currentData?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}

      {!query.isError && query.currentData?.length === 0 && count === 0 && (
        <Typography sx={{ p: 2 }}>No comments yet.</Typography>
      )}

      {lastPage > 0 && (
        <Box sx={{ display: "flex", gap: 2, p: 2 }}>
          <Button
            disabled={visiblePage === 0 || query.isFetching}
            onClick={() => setPage(visiblePage - 1)}
          >
            Previous
          </Button>
          <Typography>
            Page {visiblePage + 1} of {lastPage + 1}
          </Typography>
          <Button
            disabled={visiblePage === lastPage || query.isFetching}
            onClick={() => setPage(visiblePage + 1)}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
};
