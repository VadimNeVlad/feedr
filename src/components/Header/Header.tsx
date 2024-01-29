import React from "react";
import { UserDropdown } from "../UserDropdown/UserDropdown";
import { useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";
import { useGetCurrentUserQuery } from "../../features/users/usersApi";

export const Header: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const { data: user, isLoading } = useGetCurrentUserQuery();
  const data = user && token;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#fff",
        boxShadow:
          "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
        zIndex: 20,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 15px",
          minHeight: "56px",
        }}
      >
        <Typography variant="h5">
          <Link to={"/"}>
            FeeD<span style={{ color: "#1976d2" }}>R</span>
          </Link>
        </Typography>

        {data && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to={"/add-article"}>
              <Button variant="outlined" sx={{ mr: 2 }}>
                Create Article
              </Button>
            </Link>

            <UserDropdown
              id={user.id}
              userName={user.name}
              avatar={user.image}
            />
          </Box>
        )}

        {!data && !isLoading && (
          <>
            <Button variant="text">
              <Link to={"/login"}>Login</Link>
            </Button>
            <Button variant="contained">
              <Link to={"/register"}>Create Account</Link>
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};
