import React from "react";
import { LayoutProps } from "../../utils/types/props";
import { Header } from "../Header/Header";
import { ToastContainer } from "react-toastify";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Box sx={{ pt: 4, pb: 3.5, bgcolor: "#e5e5e5" }}>
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Typography variant="body2">
            FeedR - Connect, Share, and Explore Together
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
            <Link to="/reading-list">
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
      <ToastContainer />
    </>
  );
};
