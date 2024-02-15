import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { ArticleActionsProps } from "../../utils/types/props";
import LoadingButton from "@mui/lab/LoadingButton";

export const ArticleActions: React.FC<ArticleActionsProps> = ({
  articleId,
  isDeleting,
  deleteArticleSuccess,
  setOpen,
}) => {
  return (
    <Box sx={{ display: { xs: "none", md: "block" } }}>
      <Link to={`/edit-article/${articleId}`}>
        <Button
          fullWidth
          variant="outlined"
          disabled={deleteArticleSuccess}
          sx={{ mt: 2, bgcolor: "background.paper" }}
        >
          Edit Article
        </Button>
      </Link>
      <LoadingButton
        fullWidth
        variant="contained"
        color="error"
        loading={isDeleting}
        disabled={deleteArticleSuccess}
        onClick={setOpen}
        sx={{ mt: 1 }}
      >
        Delete Article
      </LoadingButton>
    </Box>
  );
};
