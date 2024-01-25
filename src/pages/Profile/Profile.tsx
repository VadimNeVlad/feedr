import React from "react";
import { Header } from "../../components/Header/Header";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useGetUserByIdQuery } from "../../features/users/usersApi";
import { useParams } from "react-router-dom";
import { ProfileContent } from "../../components/ProfileContent/ProfileContent";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";

export const Profile: React.FC = () => {
  const { id } = useParams();
  const { data: user } = useGetUserByIdQuery(id || "");

  return (
    <>
      <Header />
      <Box sx={{ width: "100%", height: "170px", bgcolor: "#000" }}></Box>

      {user && (
        <Container maxWidth="lg" sx={{ mt: -4, pb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ProfileContent user={user}></ProfileContent>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent sx={{ pt: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <ArticleOutlinedIcon />
                    <Typography>6 posts published</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CommentOutlinedIcon />
                    <Typography>6 posts published</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};
