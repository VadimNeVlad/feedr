import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export const Footer: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Box sx={{ pt: 4, pb: 3.5, bgcolor: "#e5e5e5" }}>
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography variant="body2">
          FeeDR - Connect, Share, and Explore Together
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          sx={{ pt: 1.5, pb: 1 }}
        >
          <Link to="/home">
            <Typography variant="body2" color="info.main">
              Home
            </Typography>
          </Link>
          <span>•</span>
          <Link to="/tags">
            <Typography variant="body2" color="info.main">
              Tags
            </Typography>
          </Link>
          <span>•</span>
          <Link to={user ? "/reading-list" : "/login"}>
            <Typography variant="body2" color="info.main">
              Reading List
            </Typography>
          </Link>
        </Stack>
        <Typography variant="body2">
          Built with React and NestJS. © {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
};
