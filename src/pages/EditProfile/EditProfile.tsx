import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SettingsNavList } from "../../components/SettingsNavList/SettingsNavList";
import { Layout } from "../../components/Layout/Layout";

export const EditProfile: React.FC = () => {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 10, pb: 5, minHeight: "100vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <SettingsNavList />
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ fontSize: { xs: 28, md: 34 }, mb: 2 }}
            >
              Settings
            </Typography>

            <Outlet />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
