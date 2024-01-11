import React from "react";
import { ArticleItemProps } from "../../utils/types/props";
import {
  Avatar,
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

export const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
  const [favoriteArticle] = useFavoriteArticleMutation();
  const [unfavoriteArticle] = useUnfavoriteArticleMutation();
  const user = useSelector((state: RootState) => state.auth.user);
  const trimmedName = trimFirstLetter(article.author.name);

  const exists = article.favorited.some((userItem) =>
    user ? userItem.id === user.id : null
  );

  const handleFavoriteArticle = () => {
    if (!exists) favoriteArticle(article.slug);
    else unfavoriteArticle(article.slug);
  };

  return (
    <Card sx={{ mb: 5 }}>
      <CardHeader
        avatar={<Avatar>{trimmedName}</Avatar>}
        title={article.author.name}
        subheader={formatDate(article.createdAt)}
      />
      <CardContent>
        <Typography variant="h5">{article.title}</Typography>
        <Typography variant="body2">{article.body}</Typography>

        <div style={{ display: "flex" }}>
          {article.tagList.map((tag) => (
            <Typography key={tag.name} variant="body1" sx={{ mr: 1 }}>
              #{tag.name}
            </Typography>
          ))}
        </div>
      </CardContent>
      <CardActions>
        <IconButton
          aria-label="add to favorites"
          onClick={handleFavoriteArticle}
        >
          {exists ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />}
          <Typography variant="body2">{article.favoritesCount}</Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
};
