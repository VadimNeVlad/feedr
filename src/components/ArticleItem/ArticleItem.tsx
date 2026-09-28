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
import { Link } from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { Article } from "../../utils/types/articles";
import { formatDate } from "../../utils/helpers/formatDate";
import { trimFirstLetter } from "../../utils/helpers/trimString";
import { removeTags } from "../../utils/helpers/removeTags";
import { limitText } from "../../utils/helpers/limitText";
import { articlePath, userPath } from "../../utils/helpers/routes";
import { useFavoriteArticle } from "../../hooks/useFavoriteArticle";
import { ArticleTagItem } from "../ArticleTagItem/ArticleTagItem";

type ArticleItemProps = {
  article: Article;
};

export const ArticleItem = ({ article }: ArticleItemProps) => {
  const [isFavorite, toggleFavorite, isPending] = useFavoriteArticle(article);

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        component={Link}
        to={userPath(article.authorId)}
        sx={{ pb: 0 }}
        avatar={
          <Avatar src={article.author.image}>
            {trimFirstLetter(article.author.name)}
          </Avatar>
        }
        title={article.author.name}
        titleTypographyProps={{ fontWeight: 700 }}
        subheader={formatDate(article.createdAt)}
      />

      <CardContent sx={{ pb: 1.5 }}>
        <Typography
          component="h2"
          variant="h5"
          fontWeight={700}
          sx={{ display: "block", mb: 1.5 }}
        >
          <Link to={articlePath(article)}>{article.title}</Link>
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {removeTags(limitText(article.body, 80))}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {article.tagList.map((tag) => (
            <ArticleTagItem key={tag.name} tag={tag} />
          ))}
        </Box>
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", mt: "2px" }}>
          <IconButton
            component={Link}
            to={articlePath(article)}
            aria-label={`${article._count.comments} comments`}
          >
            <CommentOutlinedIcon />
          </IconButton>
          <Typography variant="body2" aria-hidden sx={{ ml: "-6px" }}>
            {article._count.comments}
          </Typography>
        </Box>

        <IconButton
          disabled={isPending}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite ? "Remove from reading list" : "Save to reading list"
          }
          onClick={toggleFavorite}
        >
          {isFavorite ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};
