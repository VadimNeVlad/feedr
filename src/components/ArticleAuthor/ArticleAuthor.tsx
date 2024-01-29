import React from "react";
import {
  Avatar,
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
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../utils/constants/constants";

export const ArticleAuthor: React.FC<ArticleAuthorProps> = ({
  author,
  isFetching,
}) => {
  const navigate = useNavigate();
  const [followUser, { isLoading: isFollowing }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: isUnfollowing }] =
    useUnfollowUserMutation();
  const user = useSelector((state: RootState) => state.auth.user);

  const exists = author.followers.some((followingUser) =>
    user ? followingUser.followerId === user.id : null
  );

  const handleFollowUser = () => {
    if (!exists) followUser(author.id);
    else unfollowUser(author.id);
  };

  return (
    <>
      <Card>
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
            <LoadingButton
              variant="contained"
              sx={{ width: "100%", mb: 2 }}
              loading={isFollowing || isUnfollowing || isFetching}
              onClick={handleFollowUser}
            >
              {!exists ? "Follow" : "Unfollow"}
            </LoadingButton>
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
