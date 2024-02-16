import React from "react";
import { ReadingListItemProps } from "../../../utils/types/props";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { IMAGE_URL } from "../../../utils/constants/constants";
import { trimFirstLetter } from "../../../utils/helpers/trimString";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/helpers/formatDate";
import { ArticleTagItem } from "../../ArticleTagItem/ArticleTagItem";
import { useUnfavoriteArticleMutation } from "../../../features/articles/articlesApi";

export const ReadingListItem: React.FC<ReadingListItemProps> = ({
  article,
}) => {
  const [unfavoriteArticle] = useUnfavoriteArticleMutation();

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 2,
              pr: 3,
            }}
          >
            <Link to={`/user/${article.author.id}`}>
              <Avatar
                src={
                  article.author.image &&
                  `${IMAGE_URL}avatars/${article.author.image}`
                }
                sx={{ width: "30px", height: "30px", mt: 1 }}
              >
                {trimFirstLetter(article.author.name)}
              </Avatar>
            </Link>
            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{
                  display: "block",
                  mb: 1,
                  fontSize: { xs: "18px", md: "20px" },
                  lineHeight: { xs: "24px", md: "28px" },
                }}
              >
                <Link to={`/articles/${article.id}/${article.slug}`}>
                  {article.title}
                </Link>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="subtitle2" fontWeight={700}>
                  <Link to={`/user/${article.author.id}`}>
                    {article.author.name}
                  </Link>
                </Typography>
                <span>•</span>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(article.createdAt, false)}
                </Typography>
                <span>•</span>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {article.tagList.map((tag) => (
                    <ArticleTagItem key={tag.name} tag={tag} />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
          <Button
            variant="text"
            onClick={() => unfavoriteArticle(article.id)}
            sx={{ mt: 2 }}
          >
            Remove
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
