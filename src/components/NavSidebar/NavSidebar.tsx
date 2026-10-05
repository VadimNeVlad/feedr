import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vadim-marukhnenko/",
    Icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/VadimNeVlad",
    Icon: GitHubIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100080493537613",
    Icon: FacebookIcon,
  },
];

export const NavSidebar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const links = [
    { label: "Home", to: "/", image: "/homev2.svg" },
    { label: "Tags", to: "/tags", image: "/tags.png" },
    {
      label: "Reading List",
      to: user ? "/reading-list" : "/login",
      image: "/reading-list.png",
    },
  ];

  return (
    <Box>
      <nav aria-label="Main navigation">
        <List disablePadding>
          {links.map(({ label, to, image }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton component={Link} to={to} sx={{ p: 0.5 }}>
                <Box
                  component="img"
                  src={image}
                  alt=""
                  sx={{ width: 22, height: 22, mr: 1.5 }}
                />
                <ListItemText primary={label} sx={{ color: "text.secondary" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>

      <Stack direction="row" spacing={2} sx={{ mt: 2, ml: "-4px" }}>
        {socialLinks.map(({ label, href, Icon }) => (
          <IconButton
            key={label}
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            <Icon />
          </IconButton>
        ))}
      </Stack>
    </Box>
  );
};
