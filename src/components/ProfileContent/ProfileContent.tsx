import { userPath } from "../../utils/helpers/routes";
import CakeIcon from "@mui/icons-material/Cake";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { formatDate } from "../../utils/helpers/formatDate";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { AvatarPreview } from "../AvatarPreview/AvatarPreview";
import { useFollowUser } from "../../hooks/useFollowUser";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import { User } from "../../utils/types/user";

type ProfileContentProps = {
  user: User;
};

export const ProfileContent = ({ user }: ProfileContentProps) => {
  const followersCount = user._count.followers ?? 0;
  const [isFollow, handleFollowUser, isPending] = useFollowUser(user);

  const currentUser = useSelector((state: RootState) => state.auth.user);

  return (
    <Card sx={{ overflow: "initial", position: "relative" }}>
      <CardContent sx={{ textAlign: { xs: "left", md: "center" } }}>
        <AvatarPreview
          userName={user.name}
          userId={user.id}
          avatar={user.image}
        />
        <Typography
          variant="h4"
          component="h1"
          fontWeight={700}
          sx={{ fontSize: { xs: 24, md: 34 }, mb: 1 }}
        >
          {user.name}
        </Typography>

        {followersCount > 0 ? (
          <Link
            to={`${userPath(user.id)}/followers`}
            style={{ display: "inline-block" }}
          >
            <Typography variant="body1" sx={{ mb: 3 }}>
              {followersCount} Followers
            </Typography>
          </Link>
        ) : (
          <Typography variant="body1" sx={{ mb: 3 }}>
            {followersCount} Followers
          </Typography>
        )}

        <Typography variant="body1" fontSize={"17px"} sx={{ mb: 3 }}>
          {user.bio || "No bio yet."}
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
                <a
                  href={user.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.websiteUrl}
                </a>
              </Typography>
            </Box>
          )}
        </Box>

        {user.id === currentUser?.id ? (
          <Button
            component={Link}
            to="/user/edit-profile/profile"
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
        ) : (
          <Button
            disabled={isPending}
            aria-pressed={isFollow}
            variant={!isFollow ? "contained" : "outlined"}
            onClick={handleFollowUser}
            sx={{
              position: "absolute",
              top: { xs: -16, md: 16 },
              right: 16,
              fontSize: { xs: 12, md: 14 },
              background: {
                xs: isFollow ? "#fff !important" : "#1976d2",
              },
            }}
          >
            {!isFollow ? "Follow" : "Unfollow"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
