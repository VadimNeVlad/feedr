import React, { useState } from "react";
import {
  Avatar,
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

export const UserDropdown: React.FC<UserDropdownProps> = ({
  id,
  userName,
  avatar,
}) => {
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
        <Avatar src={avatar && `${IMAGE_URL}avatars/${avatar}`}>
          {trimFirstLetter(userName)}
        </Avatar>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => navigate(`/user/${id}`)}>
          <Typography fontWeight={700} variant="subtitle1">
            {userName}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/add-article")}>
          Create Article
        </MenuItem>
        <MenuItem onClick={handleClose}>Reading List</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};
