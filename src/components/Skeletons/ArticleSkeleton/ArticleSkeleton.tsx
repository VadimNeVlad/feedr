import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Skeleton,
} from "@mui/material";
import React from "react";

export const ArticleSkeleton: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 9, pb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              alignItems: "center",
              pb: 2,
              pt: 1,
            }}
          >
            <Skeleton
              variant="rectangular"
              width={20}
              height={20}
              sx={{ mb: 1 }}
            />
            <Skeleton variant="text" sx={{ fontSize: "16px", width: "20px" }} />
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              alignItems: "center",
              pb: 2,
            }}
          >
            <Skeleton
              variant="rectangular"
              width={20}
              height={20}
              sx={{ mb: 1 }}
            />
            <Skeleton variant="text" sx={{ fontSize: "16px", width: "20px" }} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={11} md={8}>
          <Skeleton
            variant="rectangular"
            sx={{ width: "100%", height: { xs: 200, sm: 250, md: 300 } }}
          />
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                }}
              >
                <Skeleton variant="circular" width={40} height={40} />
                <Box>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "14px", width: "180px" }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "14px", width: "200px" }}
                  />
                </Box>
              </Box>
              <Skeleton
                variant="text"
                sx={{ fontSize: "46px", width: "100%", mb: 2 }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "14px", width: "50px", mb: 2 }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "16px", width: "100%" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "16px", width: "100%" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "16px", width: "70%", mb: 4 }}
              />
              <Skeleton
                variant="rectangular"
                sx={{ width: "100%", height: "80px", mb: 2 }}
              />
              <Skeleton
                variant="rectangular"
                width={85}
                height={36}
                sx={{ mb: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ mb: 2, pt: 2 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                }}
              >
                <Skeleton variant="circular" width={46} height={46} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "26px", width: "150px" }}
                />
              </Box>
              <Skeleton
                variant="rectangular"
                sx={{ width: "100%", height: "36px", mb: 2 }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "20px", width: "100px" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "20px", width: "100%" }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
