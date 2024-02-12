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
import { Link, useNavigate } from "react-router-dom";
import { removeTags } from "../../utils/helpers/removeTags";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { IMAGE_URL } from "../../utils/constants/constants";
import { useFavoriteArticle } from "../../hooks/useFavoriteArticle";
import { ArticleTagItem } from "../ArticleTagItem/ArticleTagItem";

export const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useFavoriteArticle(article);

  const [favoriteArticle] = useFavoriteArticleMutation();
  const [unfavoriteArticle] = useUnfavoriteArticleMutation();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleFavoriteArticle = () => {
    if (!isFavorite) {
      favoriteArticle(article.id);
      setIsFavorite(true);
    } else {
      unfavoriteArticle(article.id);
      setIsFavorite(false);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        sx={{ cursor: "pointer" }}
        avatar={
          <Avatar
            src={
              article.author.image &&
              `${IMAGE_URL}avatars/${article.author.image} `
            }
          >
            {trimFirstLetter(article.author.name)}
          </Avatar>
        }
        title={article.author.name}
        subheader={formatDate(article.createdAt)}
        onClick={() => navigate(`/user/${article.authorId}`)}
      />

      <CardContent>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ display: "block", mb: 2 }}
        >
          <Link to={`/articles/${article.id}/${article.slug}`}>
            {article.title}
          </Link>
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          {removeTags(article.body)}
        </Typography>

        <Box sx={{ display: "flex" }}>
          {article.tagList.map((tag) => (
            <ArticleTagItem key={tag.name} tag={tag} />
          ))}
        </Box>
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", mt: "2px" }}>
          <IconButton
            aria-label="comments"
            onClick={() => navigate(`/articles/${article.id}/${article.slug}`)}
          >
            <CommentOutlinedIcon />
          </IconButton>
          <Typography variant="body2" style={{ marginLeft: "-6px" }}>
            {article._count.comments}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="add to favorites"
            onClick={user ? handleFavoriteArticle : () => navigate("/login")}
          >
            {isFavorite ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />}
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};
