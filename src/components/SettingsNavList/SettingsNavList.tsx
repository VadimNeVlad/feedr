import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export const SettingsNavList: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };
  return (
    <nav style={{ width: "100%" }}>
      <List>
        <ListItem disablePadding>
          <Link to="profile" style={{ width: "100%" }}>
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <SentimentSatisfiedOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to="account" style={{ width: "100%" }}>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <SettingsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </nav>
  );
};
