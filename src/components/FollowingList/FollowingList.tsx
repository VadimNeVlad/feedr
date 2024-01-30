import React from "react";
import { FollowingListProps } from "../../utils/types/props";
import { Card, CardContent, Typography } from "@mui/material";
import { FollowingItem } from "../FollowingItem/FollowingItem";
import { Link } from "react-router-dom";

export const FollowingList: React.FC<FollowingListProps> = ({
  following,
  followingCount,
  id,
  size = "lg",
}) => {
  return (
    <Card>
      <CardContent>
        {following.map((followingUser) => (
          <FollowingItem
            key={followingUser.followingId}
            followingUser={followingUser.following}
            size={size}
          />
        ))}

        {size === "sm" && (
          <Link to={`/user/${id}/following`}>
            <Typography>See All ({followingCount})</Typography>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};
