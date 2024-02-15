import { Card, CardContent, Skeleton } from "@mui/material";
import React from "react";

export const ProfileContentSkeleton: React.FC = () => {
  return (
    <Card sx={{ overflow: "initial", position: "relative" }}>
      <CardContent
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", md: "center" },
          flexDirection: "column",
        }}
      >
        <Skeleton
          variant="circular"
          sx={{
            width: { xs: "60px", md: "100px" },
            height: { xs: "60px", md: "100px" },
            mb: 2,
            mt: { xs: -5.5, md: -7.5 },
          }}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "36px", width: "250px", mb: 1 }}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "16px", width: "100px", mb: 3 }}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "16px", width: "250px", mb: 3 }}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "16px", width: "200px", mb: 2 }}
        />
      </CardContent>
    </Card>
  );
};
