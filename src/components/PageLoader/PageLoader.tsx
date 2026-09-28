import { Box, CircularProgress } from "@mui/material";

export const PageLoader = () => (
  <Box sx={{ p: 6, textAlign: "center", minHeight: "100vh" }}>
    <CircularProgress aria-label="Loading page" />
  </Box>
);
