import { userPath } from "../../utils/helpers/routes";
import { User } from "../../utils/types/user";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { trimFirstLetter } from "../../utils/helpers/trimString";
import { Link } from "react-router-dom";
import { useFollowUser } from "../../hooks/useFollowUser";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface FollowingItemProps {
  followTypeUser: User;
  size?: "sm" | "lg";
}

export const FollowingItem = ({
  followTypeUser,
  size,
}: FollowingItemProps) => {
  const [isFollow, handleFollowUser, isPending] = useFollowUser(followTypeUser);

  const currentUser = useSelector((state: RootState) => state.auth.user);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1.5,
        ...(size === "lg" && {
          mb: { xs: 2, md: 4 },
        }),
      }}
    >
      <Link
        to={userPath(followTypeUser.id)}
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
          src={followTypeUser.image}
          sx={
            size === "lg"
              ? {
                  width: { xs: 32, md: 42 },
                  height: { xs: 32, md: 42 },
                  fontSize: { xs: "18px", md: "20px" },
                }
              : { width: 22, height: 22, fontSize: "13px" }
          }
        >
          {trimFirstLetter(followTypeUser.name)}
        </Avatar>
        <Box sx={{ pr: 1 }}>
          <Typography
            variant={size === "lg" ? "subtitle1" : "body1"}
            fontWeight={size === "lg" ? 700 : 400}
            fontSize={size === "lg" ? "16px" : "14px"}
          >
            {followTypeUser.name}
          </Typography>
          {size === "lg" && followTypeUser.bio && (
            <Typography variant="body2">{followTypeUser.bio}</Typography>
          )}
        </Box>
      </Link>

      {size === "lg" && currentUser?.id !== followTypeUser.id && (
        <Button
          disabled={isPending}
          aria-pressed={isFollow}
          variant={!isFollow ? "contained" : "outlined"}
          onClick={handleFollowUser}
          sx={{ fontSize: { xs: "12px", md: "14px" } }}
        >
          {!isFollow ? "Follow" : "Unfollow"}
        </Button>
      )}
    </Box>
  );
};
