import { Card, CardContent, Skeleton } from "@mui/material";
import React from "react";

export const ProfileContentSkeleton: React.FC = () => {
  return (
    <Card sx={{ overflow: "initial", position: "relative" }}>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Skeleton
          variant="circular"
          width={80}
          height={80}
          sx={{ mb: 2, mt: -5 }}
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
