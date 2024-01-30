import React from "react";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { formatDate } from "../../utils/helpers/formatDate";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ProfileContentProps } from "../../utils/types/props";
import { AvatarPreview } from "../AvatarPreview/AvatarPreview";

export const ProfileContent: React.FC<ProfileContentProps> = ({ user }) => {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  return (
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
        <Typography variant="body1" sx={{ mb: 3 }}>
          {user.email}
        </Typography>
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
          <Link to="/edit-profile">
            <Button
              variant="contained"
              sx={{ position: "absolute", top: 20, right: 20 }}
            >
              Edit Profile
            </Button>
          </Link>
        ) : (
          <LoadingButton
            variant="contained"
            sx={{ position: "absolute", top: 20, right: 20 }}
          >
            Follow
          </LoadingButton>
        )}
      </CardContent>
    </Card>
  );
};
