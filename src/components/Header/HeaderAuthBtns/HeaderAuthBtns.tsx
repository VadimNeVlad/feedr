import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const HeaderAuthBtns: React.FC = () => {
  return (
    <Box>
      <Link to="/login">
        <Button
          variant="text"
          sx={{ display: { xs: "none", sm: "inline-block" }, mr: 1 }}
        >
          Login
        </Button>
      </Link>
      <Link to="/register">
        <Button variant="contained">Create Account</Button>
      </Link>
    </Box>
  );
};
