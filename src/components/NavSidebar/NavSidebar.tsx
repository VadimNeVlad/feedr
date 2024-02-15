import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";

export const NavSidebar: React.FC = () => {
  return (
    <Box>
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

      <Stack direction="row" spacing={2} sx={{ marginTop: 2, ml: "-4px" }}>
        <Link
          to="https://www.linkedin.com/in/vadim-marukhnenko/"
          target="_blank"
        >
          <IconButton>
            <LinkedInIcon />
          </IconButton>
        </Link>
        <Link to="https://github.com/VadimNeVlad" target="_blank">
          <IconButton>
            <GitHubIcon />
          </IconButton>
        </Link>
        <Link
          to="https://www.facebook.com/profile.php?id=100080493537613"
          target="_blank"
        >
          <IconButton>
            <FacebookIcon />
          </IconButton>
        </Link>
      </Stack>
    </Box>
  );
};
