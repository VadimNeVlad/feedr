import React from "react";
import { FollowingItemProps } from "../../utils/types/props";
import { Avatar, Box, Typography } from "@mui/material";
import { IMAGE_URL } from "../../utils/constants/constants";
import { trimFirstLetter } from "../../utils/helpers/trimString";
import LoadingButton from "@mui/lab/LoadingButton";

export const FollowingItem: React.FC<FollowingItemProps> = ({
  followingUser,
  size,
}) => {
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          ...(size === "lg" && {
            gap: 2.5,
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
      </Box>

      {size === "lg" && <LoadingButton>Follow</LoadingButton>}
    </Box>
  );
};
