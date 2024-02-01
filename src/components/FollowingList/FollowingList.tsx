import React, { useState } from "react";
import { FollowingListProps } from "../../utils/types/props";
import { Card, CardContent, Typography } from "@mui/material";
import { FollowingItem } from "../FollowingItem/FollowingItem";
import { Link } from "react-router-dom";

export const FollowingList: React.FC<FollowingListProps> = ({
  following,
  id,
  size = "lg",
}) => {
  const [followingCount, setFollowingCount] = useState(following.length);
  return (
    <>
      {size === "lg" && (
        <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
          {followingCount} Following
        </Typography>
      )}

      {following.length > 0 && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            {following.map((followingUser) => (
              <FollowingItem
                key={followingUser.followingId}
                followingUser={followingUser.following}
                size={size}
                setFollowingCount={setFollowingCount}
              />
            ))}

            {size === "sm" && following.length > 0 && (
              <Link to={`/user/${id}/following`}>
                <Typography variant="body2" sx={{ mt: 3 }}>
                  See All ({following.length})
                </Typography>
              </Link>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};
