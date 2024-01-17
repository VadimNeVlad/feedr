import React from "react";
import { UserDropdown } from "../UserDropdown/UserDropdown";
import { useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";

export const Header: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 15px",
        backgroundColor: "#fff",
        boxShadow:
          "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
        zIndex: 20,
      }}
    >
      <Typography variant="h5">
        <Link to={"/"}>
          Feed<span style={{ color: "#1976d2" }}>R</span>
        </Link>
      </Typography>

      {token && user ? (
        <Box sx={{ display: "flex" }}>
          <Link to={"/add-article"}>
            <Button variant="outlined" sx={{ mr: 2 }}>
              Create Article
            </Button>
          </Link>

          <UserDropdown userName={user.name} />
        </Box>
      ) : (
        <>
          <Button variant="text">
            <Link to={"/login"}>Login</Link>
          </Button>
          <Button variant="contained">
            <Link to={"/register"}>Create Account</Link>
          </Button>
        </>
      )}
    </header>
  );
};
