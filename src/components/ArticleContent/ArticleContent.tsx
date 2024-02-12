import React from "react";
import { ArticleContentProps } from "../../utils/types/props";
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
import { IMAGE_URL } from "../../utils/constants/constants";
import { useNavigate } from "react-router-dom";
import { ArticleTagItem } from "../ArticleTagItem/ArticleTagItem";

export const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
      {article.image && (
        <Box
          component="img"
          sx={{
            width: "100%",
            height: 300,
            objectFit: "cover",
          }}
          src={article.image && `${IMAGE_URL}articles/${article.image}`}
        />
      )}

      <CardHeader
        sx={{ cursor: "pointer" }}
        avatar={
          <Avatar
            src={
              article.author.image &&
              `${IMAGE_URL}avatars/${article.author.image}`
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
        <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
          {article.title}
        </Typography>

        <Box style={{ display: "flex" }}>
          {article.tagList.map((tag) => (
            <ArticleTagItem key={tag.name} tag={tag} />
          ))}
        </Box>

        <Editor content={article.body} showToolbar={false} isEditable={false} />
      </CardContent>
    </Card>
  );
};
