import React from "react";
import { FollowingItemProps } from "../../utils/types/props";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { IMAGE_URL } from "../../utils/constants/constants";
import { trimFirstLetter } from "../../utils/helpers/trimString";
import { Link, useParams } from "react-router-dom";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../features/users/usersApi";
import { useFollowUser } from "../../hooks/useFollowUser";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export const FollowingItem: React.FC<FollowingItemProps> = ({
  followTypeUser,
  size,
  setFollowingCount,
}) => {
  const { id } = useParams();

  const [isFollow, setIsFollow] = useFollowUser(followTypeUser);

  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const currentUser = useSelector((state: RootState) => state.auth.user);

  const handleFollowUser = () => {
    if (!isFollow) {
      followUser(followTypeUser.id);
      setIsFollow(true);
      if (currentUser?.id === id) setFollowingCount((prev) => prev! + 1);
    } else {
      unfollowUser(followTypeUser.id);
      setIsFollow(false);
      if (currentUser?.id === id) setFollowingCount((prev) => prev! - 1);
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
        to={`/user/${followTypeUser.id}`}
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
            followTypeUser.image &&
            `${IMAGE_URL}avatars/${followTypeUser.image}`
          }
          sx={
            size === "lg"
              ? { width: 42, height: 42, fontSize: "20px" }
              : { width: 22, height: 22, fontSize: "13px" }
          }
        >
          {trimFirstLetter(followTypeUser.name)}
        </Avatar>
        <Box>
          <Typography
            variant={size === "lg" ? "subtitle1" : "body1"}
            fontWeight={size === "lg" ? 700 : 400}
            fontSize={size === "lg" ? "16px" : "14px"}
          >
            {followTypeUser.name}
          </Typography>
          {size === "lg" && (
            <Typography variant="body2">Bio example</Typography>
          )}
        </Box>
      </Link>

      {size === "lg" && currentUser?.id !== followTypeUser.id && (
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
