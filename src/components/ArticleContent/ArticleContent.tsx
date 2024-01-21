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

export const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
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
          src={`${IMAGE_URL}/articles/${article.image}`}
        />
      )}

      <CardHeader
        avatar={<Avatar>{trimFirstLetter(article.author.name)}</Avatar>}
        title={article.author.name}
        subheader={formatDate(article.createdAt)}
      />

      <CardContent>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
          {article.title}
        </Typography>

        <Box style={{ display: "flex" }}>
          {article.tagList.map((tag) => (
            <Typography key={tag.name} variant="body1" sx={{ mr: 1 }}>
              #{tag.name}
            </Typography>
          ))}
        </Box>

        <Editor content={article.body} showToolbar={false} isEditable={false} />
      </CardContent>
    </Card>
  );
};
