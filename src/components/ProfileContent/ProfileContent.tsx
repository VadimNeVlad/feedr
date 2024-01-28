import React from "react";
import { trimFirstLetter } from "../../utils/helpers/trimString";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { formatDate } from "../../utils/helpers/formatDate";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ProfileContentProps } from "../../utils/types/props";

export const ProfileContent: React.FC<ProfileContentProps> = ({ user }) => {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  return (
    <Card sx={{ overflow: "initial", position: "relative" }}>
      <CardContent sx={{ textAlign: "center" }}>
        <Avatar
          sx={{
            width: "80px",
            height: "80px",
            fontSize: "36px",
            margin: "0 auto",
            mb: 3,
            mt: "-50px",
            border: "5px solid #000",
          }}
        >
          {trimFirstLetter(user.name)}
        </Avatar>
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
              sx={{ position: "absolute", top: 20, right: 20 }}
              variant="contained"
            >
              Edit Profile
            </Button>
          </Link>
        ) : (
          <LoadingButton variant="contained">Follow</LoadingButton>
        )}
      </CardContent>
    </Card>
  );
};
