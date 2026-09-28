import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Welcome = () => {
  return (
    <Card sx={{ display: { xs: "none", md: "block" }, mb: 3 }}>
      <CardContent>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
          Welcome to FeeDR
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          A place where you can create, share, stay up-to-date, and explore new
          things.
        </Typography>
        <Box>
          <Button component={Link} to="/register" fullWidth variant="outlined">
            Create Account
          </Button>
        </Box>
        <Box>
          <Button component={Link} to="/login" fullWidth variant="text">
            Login
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
