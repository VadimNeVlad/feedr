import { userPath } from "../../utils/helpers/routes";
import { Follow } from "../../utils/types/follow";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { FollowingItem } from "../FollowingItem/FollowingItem";
import { Link } from "react-router-dom";

type FollowingListProps = {
  followType: Follow[] | undefined;
  listType: "followers" | "followings";
  /** Profile id for the "See all" link in the compact variant. */
  id?: string;
  size?: "sm" | "lg";
};

export const FollowingList = ({
  followType,
  listType,
  id,
  size = "lg",
}: FollowingListProps) => (
  <Card sx={{ mb: 2 }}>
    {size === "sm" && (
      <CardHeader
        title={listType === "followers" ? "Followers" : "Following"}
      />
    )}
    <CardContent>
      {followType?.length === 0 && (
        <Typography>
          No {listType === "followers" ? "followers" : "followings"} yet.
        </Typography>
      )}
      {followType?.map((follow) => {
        const target =
          listType === "followers" ? follow.follower : follow.following;
        return (
          <FollowingItem key={target.id} followTypeUser={target} size={size} />
        );
      })}
      {id && size === "sm" && (followType?.length ?? 0) >= 5 && (
        <Link to={`${userPath(id)}/following`}>See all following</Link>
      )}
    </CardContent>
  </Card>
);
