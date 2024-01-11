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

export const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar>A</Avatar>}
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
        <IconButton aria-label="add to favorites">
          <BookmarkIcon />
          <Typography variant="body2">{article.favoritesCount}</Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
};
