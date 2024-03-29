import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { CommentItemProps } from "../../utils/types/props";
import { trimFirstLetter } from "../../utils/helpers/trimString";
import { formatDate } from "../../utils/helpers/formatDate";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Card sx={{ borderRadius: 0 }}>
      <CardContent sx={{ display: "flex", alignItems: "flex-start" }}>
        <Link to={user ? `/user/${comment.author.id}` : "/login"}>
          <Avatar
            src={comment.author.image}
            sx={{
              width: { xs: 22, md: 32 },
              height: { xs: 22, md: 32 },
              mr: { xs: 1, md: 2 },
              fontSize: { xs: 12, md: 20 },
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
            <Link to={user ? `/user/${comment.author.id}` : "/login"}>
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
