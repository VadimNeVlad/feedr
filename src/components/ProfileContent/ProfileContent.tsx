import React, { useState } from "react";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { formatDate } from "../../utils/helpers/formatDate";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ProfileContentProps } from "../../utils/types/props";
import { AvatarPreview } from "../AvatarPreview/AvatarPreview";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../features/users/usersApi";
import { useFollowUser } from "../../hooks/useFollowUser";
import { ProfileContentSkeleton } from "../Skeletons/ProfileContentSkeleton/ProfileContentSkeleton";

export const ProfileContent: React.FC<ProfileContentProps> = ({
  user,
  isLoading,
}) => {
  const [folowersCount, setFolowersCount] = useState(user.followers.length);
  const [isFollow, setIsFollow] = useFollowUser(user);

  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const currentUser = useSelector((state: RootState) => state.auth.user);

  const handleFollowUser = () => {
    if (!isFollow) {
      followUser(user.id);
      setIsFollow(true);
      setFolowersCount((prev) => prev + 1);
    } else {
      unfollowUser(user.id);
      setIsFollow(false);
      setFolowersCount((prev) => prev - 1);
    }
  };

  return (
    <>
      {isLoading && <ProfileContentSkeleton />}

      {!isLoading && (
        <Card sx={{ overflow: "initial", position: "relative" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <AvatarPreview
              userName={user.name}
              userId={user.id}
              avatar={user.image}
            />

            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              {user.name}
            </Typography>
            <Link to={`/user/${user.id}/followers`}>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {folowersCount} Followers
              </Typography>
            </Link>
            <Typography variant="body1" fontSize={"17px"} sx={{ mb: 3 }}>
              {user.bio ? user.bio : "404 bio not found"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: "center",
              }}
            >
              <CakeOutlinedIcon sx={{ color: "#000" }} />
              <Typography variant="body1" fontSize={"17px"}>
                Joined on {formatDate(user.createdAt, false)}
              </Typography>
            </Box>

            {user.id === currentUser?.id ? (
              <Link to="/user/edit-profile/profile">
                <Button
                  variant="contained"
                  sx={{ position: "absolute", top: 20, right: 20 }}
                >
                  Edit Profile
                </Button>
              </Link>
            ) : (
              <Button
                variant={!isFollow ? "contained" : "outlined"}
                onClick={handleFollowUser}
                sx={{ position: "absolute", top: 20, right: 20 }}
              >
                {!isFollow ? "Follow" : "Unfollow"}
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};
