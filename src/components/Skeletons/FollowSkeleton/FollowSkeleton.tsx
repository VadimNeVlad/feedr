import { Box, Card, CardContent, Container, Skeleton } from "@mui/material";
import React from "react";

export const FollowSkeleton: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 11, pb: 3 }}>
      <Skeleton
        variant="text"
        sx={{ fontSize: "32px", width: "200px", mb: 2 }}
      />
      <Card>
        <CardContent>
          {[...Array(5)].map((_, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Skeleton variant="circular" width={42} height={42} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "20px", width: "150px" }}
                />
              </Box>
              <Skeleton variant="rectangular" width={108} height={36} />
            </Box>
          ))}
        </CardContent>
      </Card>
    </Container>
  );
};
