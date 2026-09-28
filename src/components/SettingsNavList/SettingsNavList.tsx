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
export const SettingsNavList = () => {
  const location = useLocation();
  return (
    <nav aria-label="Settings">
      <List disablePadding>
        {["profile", "account"].map((item) => (
          <ListItem disablePadding key={item}>
            <ListItemButton
              component={Link}
              to={item}
              selected={location.pathname.endsWith("/" + item)}
            >
              <ListItemIcon>
                {item === "profile" ? (
                  <SentimentSatisfiedOutlinedIcon />
                ) : (
                  <SettingsOutlinedIcon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={item === "profile" ? "Profile" : "Account"}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </nav>
  );
};
