import { useState } from "react";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { NavSidebar } from "../../NavSidebar/NavSidebar";
import { SearchInput } from "../../SearchInput/SearchInput";

export const MobileMenu = () => {
  const location = useLocation();
  // Remembers the page the menu was opened on, so any navigation closes it without an effect.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === location.key;

  return (
    <Box sx={{ display: { xs: "block", md: "none" } }}>
      <IconButton
        size="large"
        color="inherit"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpenedAt(location.key)}
        sx={{ p: 0 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={() => setOpenedAt(null)}>
        <Box sx={{ width: 250, padding: 2 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            Menu
          </Typography>
          <SearchInput placeholder="Search articles" />
          <NavSidebar />
        </Box>
      </Drawer>
    </Box>
  );
};
