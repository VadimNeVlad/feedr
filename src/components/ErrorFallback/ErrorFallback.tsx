import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { ErrorFallbackProps } from "../../utils/types/props";

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  resetErrorBoundary,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        maxWidth: "600px",
        margin: "0 auto",
        height: "100vh",
        padding: "0 15px",
      }}
    >
      <Typography
        variant="h3"
        fontWeight={700}
        sx={{ fontSize: { xs: "38px", md: "48px" }, mb: 2 }}
      >
        Something went wrong. Please refresh the page
      </Typography>
      <Button onClick={resetErrorBoundary}>Refresh page</Button>
    </Box>
  );
};
