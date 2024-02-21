import React, { useEffect, useState } from "react";
import CakeIcon from "@mui/icons-material/Cake";
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
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";

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

  useEffect(() => {
    setFolowersCount(user.followers.length);
  }, [user.followers.length]);

  return (
    <>
      {isLoading && <ProfileContentSkeleton />}

      {!isLoading && (
        <Card sx={{ overflow: "initial", position: "relative" }}>
          <CardContent sx={{ textAlign: { xs: "left", md: "center" } }}>
            <AvatarPreview
              userName={user.name}
              userId={user.id}
              avatar={user.image}
            />
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ fontSize: { xs: 24, md: 34 }, mb: 1 }}
            >
              {user.name}
            </Typography>

            {folowersCount > 0 ? (
              <Link to={`/user/${user.id}/followers`}>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {folowersCount} Followers
                </Typography>
              </Link>
            ) : (
              <Typography variant="body1" sx={{ mb: 3 }}>
                {folowersCount} Followers
              </Typography>
            )}

            <Typography variant="body1" fontSize={"17px"} sx={{ mb: 3 }}>
              {user.bio ? user.bio : "404 bio not found"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "left", md: "center" },
                flexWrap: "wrap",
                gap: { xs: 2, md: 3 },
              }}
            >
              {user.location && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: "center",
                  }}
                >
                  <PlaceIcon color="action" />
                  <Typography
                    variant="body1"
                    fontSize="15px"
                    color="text.secondary"
                  >
                    {user.location}
                  </Typography>
                </Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: "center",
                }}
              >
                <CakeIcon color="action" />
                <Typography
                  variant="body1"
                  fontSize="15px"
                  color="text.secondary"
                >
                  Joined on {formatDate(user.createdAt, false)}
                </Typography>
              </Box>
              {user.websiteUrl && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: "center",
                  }}
                >
                  <LanguageIcon color="action" />
                  <Typography
                    variant="body1"
                    fontSize="15px"
                    color="text.secondary"
                  >
                    <Link to={user.websiteUrl} target="_blank">
                      {user.websiteUrl}
                    </Link>
                  </Typography>
                </Box>
              )}
            </Box>

            {user.id === currentUser?.id ? (
              <Link to="/user/edit-profile/profile">
                <Button
                  variant="contained"
                  sx={{
                    position: "absolute",
                    top: { xs: -16, md: 16 },
                    right: 16,
                    fontSize: { xs: 12, md: 14 },
                  }}
                >
                  Edit Profile
                </Button>
              </Link>
            ) : (
              <Button
                variant={!isFollow ? "contained" : "outlined"}
                onClick={handleFollowUser}
                sx={{
                  position: "absolute",
                  top: { xs: -16, md: 16 },
                  right: 16,
                  fontSize: { xs: 12, md: 14 },
                  background: isFollow ? "#fff !important" : "inherit",
                }}
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
