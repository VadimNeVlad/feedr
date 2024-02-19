import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const Welcome: React.FC = () => {
  return (
    <Card sx={{ display: { xs: "none", md: "block" }, mb: 3 }}>
      <CardContent>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
          Welcome to FeeDR
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          A place where you can create, share, stay up-to-date, and explore new
          things.
        </Typography>
        <Box>
          <Link to="/register">
            <Button fullWidth variant="outlined">
              Create Account
            </Button>
          </Link>
        </Box>
        <Box>
          <Link to="/login">
            <Button fullWidth variant="text">
              Login
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};
