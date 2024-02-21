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
import { useFollowUser } from "../../hooks/useFollowUser";
import { generateColor } from "../../utils/helpers/generateColor";

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
    <Card sx={{ display: { xs: "none", md: "block" } }}>
      <Box
        sx={{
          width: "100%",
          height: "20px",
          bgcolor: generateColor(author.name),
        }}
      ></Box>
      <CardHeader
        sx={{ cursor: "pointer" }}
        avatar={
          <Avatar src={author.image} sx={{ width: "46px", height: "46px" }}>
            {trimFirstLetter(author.name)}
          </Avatar>
        }
        titleTypographyProps={{ variant: "h6", fontWeight: 700, fontSize: 18 }}
        title={author.name}
        onClick={
          user ? () => navigate(`/user/${author.id}`) : () => navigate("/login")
        }
      />

      <CardContent sx={{ pt: 0 }}>
        {user?.id !== author.id && (
          <Button
            variant={!isFollow ? "contained" : "outlined"}
            onClick={user ? handleFollowUser : () => navigate("/login")}
            sx={{ width: "100%", mb: 2 }}
          >
            {!isFollow ? "Follow" : "Unfollow"}
          </Button>
        )}

        {author.bio && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            {author.bio}
          </Typography>
        )}

        {author.location && (
          <>
            <Typography
              variant="subtitle2"
              fontWeight={700}
              textTransform="uppercase"
              fontSize={14}
            >
              Location
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              {author.location}
            </Typography>
          </>
        )}

        <Typography
          variant="subtitle2"
          fontWeight={700}
          textTransform="uppercase"
          fontSize={14}
        >
          Joined
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {formatDate(author.createdAt, false)}
        </Typography>
      </CardContent>
    </Card>
  );
};
