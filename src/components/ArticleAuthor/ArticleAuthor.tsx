import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { ArticleUserProps } from "../../utils/types/props";
import { trimFirstLetter } from "../../utils/helpers/trimString";
import { formatDate } from "../../utils/helpers/formatDate";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../features/users/usersApi";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import LoadingButton from "@mui/lab/LoadingButton";

export const ArticleAuthor: React.FC<ArticleUserProps> = ({
  article,
  isFetching,
}) => {
  const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: isUnfollowLoading }] =
    useUnfollowUserMutation();
  const user = useSelector((state: RootState) => state.auth.user);

  const exists = article.author.followers.some((followingUser) =>
    user ? followingUser.followerId === user.id : null
  );

  const handleFollowUser = () => {
    if (!exists) followUser(article.author.id);
    else unfollowUser(article.author.id);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ width: "46px", height: "46px" }}>
            {trimFirstLetter(article.author.name)}
          </Avatar>
        }
        titleTypographyProps={{ variant: "h6", fontWeight: 700 }}
        title={article.author.name}
      />

      <CardContent>
        <LoadingButton
          variant="contained"
          sx={{ width: "100%", mb: 2 }}
          loading={isFollowLoading || isUnfollowLoading || isFetching}
          onClick={handleFollowUser}
        >
          {!exists ? "Follow" : "Unfollow"}
        </LoadingButton>
        <Typography variant="body1" sx={{ mb: 2 }}>
          MERN Stack Developer | Machine Learning Developer | Content Reviewer
        </Typography>
        <Typography variant="subtitle1" fontWeight={700}>
          Email
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {article.author.email}
        </Typography>
        <Typography variant="subtitle1" fontWeight={700}>
          Joined
        </Typography>
        <Typography variant="body1">
          {formatDate(article.author.createdAt, false)}
        </Typography>
      </CardContent>
    </Card>
  );
};
