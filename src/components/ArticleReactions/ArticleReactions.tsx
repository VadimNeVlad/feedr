import React from "react";
import { ArticleReactionsProps } from "../../utils/types/props";
import { Box, IconButton, Typography } from "@mui/material";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} from "../../features/articles/articlesApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export const ArticleReactions: React.FC<ArticleReactionsProps> = ({
  article,
  handleScroll,
}) => {
  const navigate = useNavigate();
  const [favoriteArticle] = useFavoriteArticleMutation();
  const [unfavoriteArticle] = useUnfavoriteArticleMutation();
  const user = useSelector((state: RootState) => state.auth.user);

  const exists = article.favorited.some((userItem) =>
    user ? userItem.id === user.id : null
  );

  const handleFavoriteArticle = () => {
    if (!exists) favoriteArticle(article.slug);
    else unfavoriteArticle(article.slug);
  };

  return (
    <>
      <Box sx={{ textAlign: "center", pb: 1 }}>
        <IconButton
          aria-label="add to favorites"
          onClick={user ? handleFavoriteArticle : () => navigate("/login")}
        >
          {exists ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />}
        </IconButton>
        <Typography variant="body2">{article.favoritesCount}</Typography>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <IconButton aria-label="comments" onClick={handleScroll}>
          <CommentOutlinedIcon />
        </IconButton>
        <Typography variant="body2">{article.commentsCount}</Typography>
      </Box>
    </>
  );
};
