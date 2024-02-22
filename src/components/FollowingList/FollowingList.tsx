import React, { useState } from "react";
import { FollowingListProps } from "../../utils/types/props";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { FollowingItem } from "../FollowingItem/FollowingItem";
import { Link } from "react-router-dom";

export const FollowingList: React.FC<FollowingListProps> = ({
  followType,
  listType,
  id,
  size = "lg",
}) => {
  const [followingCount, setFollowingCount] = useState(followType?.length);
  return (
    <>
      {followType && followType.length > 0 && (
        <>
          {size === "lg" && (
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ fontSize: { xs: 28, md: 34 }, mb: 2 }}
            >
              {followingCount}
              {listType === "followers" ? " Followers" : " Following"}
            </Typography>
          )}

          <Card sx={{ mb: { xs: 0, md: 2 } }}>
            {size === "sm" && listType === "followings" && (
              <CardHeader
                title="Following"
                titleTypographyProps={{
                  variant: "h6",
                  fontWeight: 700,
                  fontSize: 16,
                }}
                sx={{ pb: 0 }}
              />
            )}
            <CardContent>
              {followType.map((followTypeUser) => (
                <FollowingItem
                  key={
                    listType === "followers"
                      ? followTypeUser.followerId
                      : followTypeUser.followingId
                  }
                  followTypeUser={
                    listType === "followers"
                      ? followTypeUser.follower
                      : followTypeUser.following
                  }
                  size={size}
                  listType={listType}
                  setFollowingCount={setFollowingCount}
                />
              ))}
              {size === "sm" && followType.length > 4 && (
                <Link to={`/user/${id}/following`}>
                  <Typography variant="body2" sx={{ mt: 3 }}>
                    See All Followings
                  </Typography>
                </Link>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};
