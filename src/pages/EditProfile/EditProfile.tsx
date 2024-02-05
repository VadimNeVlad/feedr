import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SettingsNavList } from "../../components/SettingsNavList/SettingsNavList";
import { ToastContainer } from "react-toastify";
import { Layout } from "../../components/Layout/Layout";

export const EditProfile: React.FC = () => {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 11, pb: 7 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <SettingsNavList />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
              Settings
            </Typography>

            <Outlet />
          </Grid>
        </Grid>

        <ToastContainer />
      </Container>
    </Layout>
  );
};
