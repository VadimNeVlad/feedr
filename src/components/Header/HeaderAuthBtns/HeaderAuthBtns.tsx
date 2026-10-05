import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
export const HeaderAuthBtns = () => (
  <Box sx={{ display: "flex", gap: 1 }}>
    <Button component={Link} to="/login">
      Login
    </Button>
    <Button component={Link} to="/register" variant="outlined">
      Register
    </Button>
  </Box>
);
