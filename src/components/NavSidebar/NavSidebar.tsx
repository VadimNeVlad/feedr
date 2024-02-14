import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const NavSidebar: React.FC = () => {
  return (
    <nav style={{ width: "100%" }}>
      <List disablePadding>
        <ListItem disablePadding>
          <Link to="/" style={{ width: "100%" }}>
            <ListItemButton sx={{ p: 0.5 }}>
              <Box
                component="img"
                src="/src/assets/img/homev2.svg"
                alt="home"
                sx={{ width: "22px", height: "22px", mr: 1.5 }}
              />
              <ListItemText primary="Home" sx={{ color: "text.secondary" }} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to="/tags" style={{ width: "100%" }}>
            <ListItemButton sx={{ p: 0.5 }}>
              <Box
                component="img"
                src="/src/assets/img/tags.png"
                alt="tags"
                sx={{ width: "22px", height: "22px", mr: 1.5 }}
              />
              <ListItemText primary="Tags" sx={{ color: "text.secondary" }} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to="/reading-list" style={{ width: "100%" }}>
            <ListItemButton sx={{ p: 0.5 }}>
              <Box
                component="img"
                src="/src/assets/img/reading-list.png"
                alt="reading list"
                sx={{ width: "22px", height: "22px", mr: 1.5 }}
              />
              <ListItemText
                primary="Reading List"
                sx={{ color: "text.secondary" }}
              />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </nav>
  );
};
