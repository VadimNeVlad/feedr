import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { formatDate } from "../../utils/helpers/formatDate";
import { trimFirstLetter } from "../../utils/helpers/trimString";
import { Editor } from "../Editor/Editor";
import { Link } from "react-router-dom";
import { ArticleTagItem } from "../ArticleTagItem/ArticleTagItem";
import { Article } from "../../utils/types/articles";
import { userPath } from "../../utils/helpers/routes";

type ArticleContentProps = {
  article: Article;
};

export const ArticleContent = ({ article }: ArticleContentProps) => {
  return (
    <Card sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
      {article.image && (
        <Box
          component="img"
          sx={{
            width: "100%",
            height: { xs: 200, sm: 250, md: 300 },
            objectFit: "cover",
          }}
          alt={article.title}
          src={article.image}
        />
      )}

      <CardHeader
        component={Link}
        to={userPath(article.authorId)}
        sx={{ pb: 1 }}
        avatar={
          <Avatar src={article.author.image}>
            {trimFirstLetter(article.author.name)}
          </Avatar>
        }
        title={article.author.name}
        titleTypographyProps={{ fontWeight: 700, fontSize: 16 }}
        subheader={formatDate(article.createdAt)}
      />

      <CardContent>
        <Typography
          component="h1"
          variant="h4"
          fontWeight={900}
          fontSize={40}
          sx={{ fontSize: { xs: 32, md: 40 }, mb: 2 }}
        >
          {article.title}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", mb: 6, gap: 1 }}>
          {article.tagList.map((tag) => (
            <ArticleTagItem key={tag.name} tag={tag} />
          ))}
        </Box>

        <Editor content={article.body} showToolbar={false} isEditable={false} />
      </CardContent>
    </Card>
  );
};
