import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export const SettingsNavList: React.FC = () => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(location.pathname);

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    setSelectedItem(value);
  };
  return (
    <nav style={{ width: "100%" }}>
      <List disablePadding>
        <ListItem disablePadding>
          <Link to="profile" style={{ width: "100%" }}>
            <ListItemButton
              selected={selectedItem === "/user/edit-profile/profile"}
              onClick={(event) =>
                handleListItemClick(event, "/user/edit-profile/profile")
              }
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
              selected={selectedItem === "/user/edit-profile/account"}
              onClick={(event) =>
                handleListItemClick(event, "/user/edit-profile/account")
              }
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
