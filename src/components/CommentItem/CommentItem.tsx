import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { CommentItemProps } from "../../utils/types/props";
import { trimFirstLetter } from "../../utils/helpers/trimString";
import { formatDate } from "../../utils/helpers/formatDate";

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <Card sx={{ borderRadius: 0 }}>
      <CardContent sx={{ display: "flex" }}>
        <Avatar sx={{ width: 32, height: 32, mr: 2 }}>
          {trimFirstLetter(comment.author.name)}
        </Avatar>
        <Box
          sx={{
            width: "100%",
            border: "1px solid rgba(0, 0, 0, 0.07)",
            p: 2,
            borderRadius: "4px",
          }}
        >
          <Box sx={{ display: "flex", mb: 1 }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mr: 1 }}>
              {comment.author.name}
            </Typography>
            <Typography variant="body2">
              {formatDate(comment.createdAt, true)}
            </Typography>
          </Box>
          <Typography variant="body1">{comment.content}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
