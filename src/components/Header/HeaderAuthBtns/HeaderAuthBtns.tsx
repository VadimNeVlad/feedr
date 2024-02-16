import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const HeaderAuthBtns: React.FC = () => {
  return (
    <Box>
      <Button
        variant="text"
        sx={{ display: { xs: "none", sm: "inline-block" }, mr: 1 }}
      >
        <Link to={"/login"}>Login</Link>
      </Button>
      <Button variant="contained">
        <Link to={"/register"}>Create Account</Link>
      </Button>
    </Box>
  );
};
