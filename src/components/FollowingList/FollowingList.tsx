import React from "react";
import { FollowingListProps } from "../../utils/types/props";
import { Card, CardContent, Typography } from "@mui/material";
import { FollowingItem } from "../FollowingItem/FollowingItem";
import { Link } from "react-router-dom";

export const FollowingList: React.FC<FollowingListProps> = ({
  following,
  followingCount = 0,
  id,
  size = "lg",
}) => {
  return (
    <>
      {following.length > 0 && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            {following.map((followingUser) => (
              <FollowingItem
                key={followingUser.followingId}
                followingUser={followingUser.following}
                size={size}
              />
            ))}

            {size === "sm" && followingCount > 0 && (
              <Link to={`/user/${id}/following`}>
                <Typography variant="body2" sx={{ mt: 3 }}>
                  See All ({followingCount})
                </Typography>
              </Link>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};
