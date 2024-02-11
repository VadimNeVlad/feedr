import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Skeleton,
} from "@mui/material";
import React from "react";
import { ProfileContentSkeleton } from "../ProfileContentSkeleton/ProfileContentSkeleton";
import { FollowingListSkeleton } from "../FollowingListSkeleton/FollowingListSkeleton";
import { ArticlesListSkeleton } from "../ArticlesListSkeleton/ArticlesListSkeleton";

export const ProfileSkeleton: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 19, pb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ProfileContentSkeleton />
        </Grid>
        <Grid item xs={3}>
          <FollowingListSkeleton />
          <Card>
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Skeleton variant="rectangular" width={22} height={22} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "16px", width: "150px" }}
                />
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Skeleton variant="rectangular" width={22} height={22} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "16px", width: "150px" }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={9}>
          <ArticlesListSkeleton />
        </Grid>
      </Grid>
    </Container>
  );
};
