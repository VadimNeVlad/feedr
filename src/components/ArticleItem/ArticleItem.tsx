import React from "react";
import { ArticleItemProps } from "../../utils/types/props";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { formatDate } from "../../utils/helpers/formatDate";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import {
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} from "../../features/articles/articlesApi";
import { trimFirstLetter } from "../../utils/helpers/trimString";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { removeTags } from "../../utils/helpers/removeTags";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";

export const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
  const navigate = useNavigate();
  const [favoriteArticle, { isLoading: isLoadingFavorite }] =
    useFavoriteArticleMutation();
  const [unfavoriteArticle, { isLoading: isLoadingUnfavorite }] =
    useUnfavoriteArticleMutation();
  const user = useSelector((state: RootState) => state.auth.user);

  const exists = article.favorited.some((userItem) =>
    user ? userItem.id === user.id : null
  );

  const handleFavoriteArticle = () => {
    if (!exists) favoriteArticle(article.slug);
    else unfavoriteArticle(article.slug);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        avatar={<Avatar>{trimFirstLetter(article.author.name)}</Avatar>}
        title={article.author.name}
        subheader={formatDate(article.createdAt)}
      />

      <CardContent>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ display: "block", mb: 2, cursor: "pointer" }}
          onClick={() => navigate(`/articles/${article.slug}`)}
        >
          {article.title}
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          {removeTags(article.body)}
        </Typography>

        <Box sx={{ display: "flex" }}>
          {article.tagList.map((tag) => (
            <Typography key={tag.name} variant="body1" sx={{ mr: 1 }}>
              #{tag.name}
            </Typography>
          ))}
        </Box>
      </CardContent>

      <CardActions>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="add to favorites"
            disabled={isLoadingFavorite || isLoadingUnfavorite}
            onClick={user ? handleFavoriteArticle : () => navigate("/login")}
          >
            {exists ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />}
          </IconButton>
          <Typography variant="body2" style={{ marginLeft: "-8px" }}>
            {article.favoritesCount}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: "2px" }}>
          <IconButton
            aria-label="comments"
            onClick={() => navigate(`/articles/${article.slug}`)}
          >
            <CommentOutlinedIcon />
          </IconButton>
          <Typography variant="body2" style={{ marginLeft: "-6px" }}>
            {article.commentsCount}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
};
