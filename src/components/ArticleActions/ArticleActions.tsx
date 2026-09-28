import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

type ArticleActionsProps = {
  articleId: string;
  isDeleting: boolean;
  /** Asks for confirmation; the page performs the deletion. */
  onDelete: () => void;
};

export const ArticleActions = ({
  articleId,
  isDeleting,
  onDelete,
}: ArticleActionsProps) => (
  <Box>
    <Button
      component={Link}
      to={`/edit-article/${encodeURIComponent(articleId)}`}
      fullWidth
      variant="outlined"
      disabled={isDeleting}
      sx={{ mt: 2, bgcolor: "background.paper" }}
    >
      Edit Article
    </Button>
    <LoadingButton
      fullWidth
      variant="contained"
      color="error"
      loading={isDeleting}
      onClick={onDelete}
      sx={{ mt: 1 }}
    >
      Delete Article
    </LoadingButton>
  </Box>
);
