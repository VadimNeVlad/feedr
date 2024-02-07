import { Box, Card, CardContent, Skeleton } from "@mui/material";
import React from "react";

export const FollowingListSkeleton: React.FC = () => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Skeleton
          variant="text"
          sx={{ fontSize: "16px", width: "50%", mb: 2 }}
        />
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Skeleton variant="circular" width={22} height={22} />
          <Skeleton variant="text" sx={{ fontSize: "12px", width: "70%" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Skeleton variant="circular" width={22} height={22} />
          <Skeleton variant="text" sx={{ fontSize: "12px", width: "70%" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Skeleton variant="circular" width={22} height={22} />
          <Skeleton variant="text" sx={{ fontSize: "12px", width: "70%" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Skeleton variant="circular" width={22} height={22} />
          <Skeleton variant="text" sx={{ fontSize: "12px", width: "70%" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Skeleton variant="circular" width={22} height={22} />
          <Skeleton variant="text" sx={{ fontSize: "12px", width: "70%" }} />
        </Box>
      </CardContent>
    </Card>
  );
};
