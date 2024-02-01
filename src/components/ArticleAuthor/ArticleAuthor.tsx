import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { ArticleAuthorProps } from "../../utils/types/props";
import { trimFirstLetter } from "../../utils/helpers/trimString";
import { formatDate } from "../../utils/helpers/formatDate";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../features/users/usersApi";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../utils/constants/constants";
import { useFollowUser } from "../../hooks/useFollowUser";

export const ArticleAuthor: React.FC<ArticleAuthorProps> = ({ author }) => {
  const [isFollow, setIsFollow] = useFollowUser(author);
  const navigate = useNavigate();

  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleFollowUser = () => {
    if (!isFollow) {
      followUser(author.id);
      setIsFollow(true);
    } else {
      unfollowUser(author.id);
      setIsFollow(false);
    }
  };

  return (
    <>
      <Card>
        <Box sx={{ width: "100%", height: "20px", bgcolor: "#000" }}></Box>
        <CardHeader
          sx={{ cursor: "pointer" }}
          avatar={
            <Avatar
              src={author.image && `${IMAGE_URL}avatars/${author.image}`}
              sx={{ width: "46px", height: "46px" }}
            >
              {trimFirstLetter(author.name)}
            </Avatar>
          }
          titleTypographyProps={{ variant: "h6", fontWeight: 700 }}
          title={author.name}
          onClick={() => navigate(`/user/${author.id}`)}
        />

        <CardContent>
          {user?.id !== author.id && (
            <Button
              variant={!isFollow ? "contained" : "outlined"}
              onClick={handleFollowUser}
              sx={{ width: "100%", mb: 2 }}
            >
              {!isFollow ? "Follow" : "Unfollow"}
            </Button>
          )}
          <Typography variant="body1" sx={{ mb: 2 }}>
            MERN Stack Developer | Machine Learning Developer | Content Reviewer
          </Typography>
          <Typography variant="subtitle1" fontWeight={700}>
            Email
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {author.email}
          </Typography>
          <Typography variant="subtitle1" fontWeight={700}>
            Joined
          </Typography>
          <Typography variant="body1">
            {formatDate(author.createdAt, false)}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};