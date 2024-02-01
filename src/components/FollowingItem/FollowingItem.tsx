import React from "react";
import { FollowingItemProps } from "../../utils/types/props";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { IMAGE_URL } from "../../utils/constants/constants";
import { trimFirstLetter } from "../../utils/helpers/trimString";
import { Link } from "react-router-dom";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../features/users/usersApi";
import { useFollowUser } from "../../hooks/useFollowUser";

export const FollowingItem: React.FC<FollowingItemProps> = ({
  followingUser,
  size,
  setFollowingCount,
}) => {
  const [isFollow, setIsFollow] = useFollowUser(followingUser);

  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const handleFollowUser = () => {
    if (!isFollow) {
      followUser(followingUser.id);
      setIsFollow(true);
      setFollowingCount((prev) => prev + 1);
    } else {
      unfollowUser(followingUser.id);
      setIsFollow(false);
      setFollowingCount((prev) => prev - 1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1.5,
        ...(size === "lg" && {
          mb: 4,
        }),
      }}
    >
      <Link
        to={`/user/${followingUser.id}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          ...(size === "lg" && {
            gap: "15px",
          }),
        }}
      >
        <Avatar
          src={
            followingUser.image && `${IMAGE_URL}avatars/${followingUser.image}`
          }
          sx={
            size === "lg"
              ? { width: 42, height: 42, fontSize: "20px" }
              : { width: 22, height: 22, fontSize: "13px" }
          }
        >
          {trimFirstLetter(followingUser.name)}
        </Avatar>
        <Box>
          <Typography
            variant={size === "lg" ? "subtitle1" : "body1"}
            fontWeight={size === "lg" ? 700 : 400}
            fontSize={size === "lg" ? "16px" : "14px"}
          >
            {followingUser.name}
          </Typography>
          {size === "lg" && (
            <Typography variant="body2">Bio example</Typography>
          )}
        </Box>
      </Link>

      {size === "lg" && (
        <Button
          variant={!isFollow ? "contained" : "outlined"}
          onClick={handleFollowUser}
        >
          {!isFollow ? "Follow" : "Unfollow"}
        </Button>
      )}
    </Box>
  );
};
