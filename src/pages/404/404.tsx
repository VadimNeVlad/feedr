import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        maxWidth: "500px",
        margin: "0 auto",
        height: "100vh",
        padding: "0 15px",
      }}
    >
      <Typography variant="h1" fontWeight={700}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 1 }}>
        This page does not exist
      </Typography>
      <Link to="/">
        <Typography variant="subtitle1" color="info.main">
          Return to Home Page
        </Typography>
      </Link>
    </Box>
  );
};
