import React, { useState } from "react";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import { NavSidebar } from "../../NavSidebar/NavSidebar";
import MenuIcon from "@mui/icons-material/Menu";

export const MobileMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ display: { xs: "block", md: "none" } }}>
      <IconButton
        size="large"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ p: 0 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, padding: 2 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            Menu
          </Typography>
          <NavSidebar />
        </Box>
      </Drawer>
    </Box>
  );
};
