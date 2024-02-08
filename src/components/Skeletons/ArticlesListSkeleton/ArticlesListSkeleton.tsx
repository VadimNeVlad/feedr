import { Box, Card, CardContent, Skeleton } from "@mui/material";
import React from "react";

export const ArticlesListSkeleton: React.FC = () => {
  return [...Array(3)].map((_, index) => (
    <Card sx={{ mb: 2 }} key={index}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" sx={{ fontSize: "12px", width: "20%" }} />
        </Box>
        <Skeleton
          variant="text"
          sx={{ fontSize: "26px", width: "60%", mb: 2 }}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "16px", width: "100%", mb: 2 }}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "16px", width: "100%", mb: 2 }}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "16px", width: "70%", mb: 2 }}
        />
      </CardContent>
    </Card>
  ));
};
