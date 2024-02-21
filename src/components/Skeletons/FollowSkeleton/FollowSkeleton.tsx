import { Box, Card, CardContent, Container, Skeleton } from "@mui/material";
import React from "react";

export const FollowSkeleton: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 11, pb: 3, minHeight: "100vh" }}>
      <Skeleton
        variant="text"
        sx={{ fontSize: { xs: 24, md: 28 }, width: "200px", mb: 2 }}
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
                mb: { xs: 2, md: 4 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Skeleton
                  variant="circular"
                  sx={{ width: { xs: 32, md: 42 }, height: { xs: 32, md: 42 } }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "20px", width: "150px" }}
                />
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Container>
  );
};
