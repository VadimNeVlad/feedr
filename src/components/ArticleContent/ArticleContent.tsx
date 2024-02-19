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
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

export const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

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
          src={article.image && `${IMAGE_URL}articles/${article.image}`}
        />
      )}

      <CardHeader
        sx={{ cursor: "pointer", pb: 1 }}
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
        titleTypographyProps={{ fontWeight: 700, fontSize: 16 }}
        subheader={formatDate(article.createdAt)}
        onClick={
          user
            ? () => navigate(`/user/${article.authorId}`)
            : () => navigate("/login")
        }
      />

      <CardContent>
        <Typography
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
