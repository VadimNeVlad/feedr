import { Box, IconButton, Typography } from "@mui/material";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Article } from "../../utils/types/articles";
import { useFavoriteArticle } from "../../hooks/useFavoriteArticle";

type ArticleReactionsProps = {
  article: Article;
  onCommentsClick: () => void;
};

export const ArticleReactions = ({
  article,
  onCommentsClick,
}: ArticleReactionsProps) => {
  const [isFavorite, toggleFavorite, isPending] = useFavoriteArticle(article);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row", sm: "column" },
        gap: 2,
      }}
    >
      <Box sx={{ textAlign: "center", pb: 1 }}>
        <IconButton
          disabled={isPending}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite ? "Remove from reading list" : "Save to reading list"
          }
          onClick={toggleFavorite}
          sx={{ padding: { sm: "8px 0", md: "8px" } }}
        >
          {isFavorite ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />}
        </IconButton>
        <Typography variant="body2">{article._count.favorited}</Typography>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <IconButton
          aria-label="Go to comments"
          onClick={onCommentsClick}
          sx={{ padding: { sm: "8px 0", md: "8px" } }}
        >
          <CommentOutlinedIcon />
        </IconButton>
        <Typography variant="body2">{article._count.comments}</Typography>
      </Box>
    </Box>
  );
};
