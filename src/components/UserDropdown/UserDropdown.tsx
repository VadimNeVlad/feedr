import React, { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { UserDropdownProps } from "../../utils/types/props";
import { trimFirstLetter } from "../../utils/helpers/trimString";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../utils/constants/constants";

export const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar src={user.image && `${IMAGE_URL}avatars/${user.image}`}>
          {trimFirstLetter(user.name)}
        </Avatar>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => navigate(`/user/${user.id}`)}>
          <Box>
            <Typography fontWeight={700} variant="subtitle1">
              {user.name}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mt: -0.5 }}
            >
              {user.email}
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/add-article")}>
          Create Article
        </MenuItem>
        <MenuItem onClick={() => navigate("/reading-list")}>
          Reading List
        </MenuItem>
        <MenuItem onClick={() => navigate(`/user/edit-profile/profile`)}>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};
