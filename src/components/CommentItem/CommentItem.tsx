import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { CommentItemProps } from "../../utils/types/props";
import { trimFirstLetter } from "../../utils/helpers/trimString";
import { formatDate } from "../../utils/helpers/formatDate";
import { IMAGE_URL } from "../../utils/constants/constants";
import { Link } from "react-router-dom";

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <Card sx={{ borderRadius: 0 }}>
      <CardContent sx={{ display: "flex", alignItems: "flex-start" }}>
        <Link to={`/user/${comment.author.id}`}>
          <Avatar
            src={
              comment.author.image &&
              `${IMAGE_URL}avatars/${comment.author.image}`
            }
            sx={{
              width: { xs: 22, md: 32 },
              height: { xs: 22, md: 32 },
              mr: { xs: 1, md: 2 },
            }}
          >
            {trimFirstLetter(comment.author.name)}
          </Avatar>
        </Link>

        <Box
          sx={{
            width: "100%",
            border: "1px solid rgba(0, 0, 0, 0.07)",
            p: 2,
            borderRadius: "4px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Link to={`/user/${comment.author.id}`}>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mr: 1 }}>
                {comment.author.name}
              </Typography>
            </Link>
            <span>•</span>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {formatDate(comment.createdAt, false)}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ fontSize: { xs: 14, md: 16 } }}>
            {comment.content}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
