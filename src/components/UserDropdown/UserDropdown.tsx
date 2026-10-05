import { MouseEvent, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEndSessionMutation } from "../../features/auth/authApi";
import { logout } from "../../features/auth/authSlice";
import { apiErrorMessage } from "../../utils/helpers/apiError";
import { trimFirstLetter } from "../../utils/helpers/trimString";
import { userPath } from "../../utils/helpers/routes";
import { User } from "../../utils/types/user";

type UserDropdownProps = {
  user: Pick<User, "id" | "name" | "email" | "image">;
};

const links = [
  { to: "/add-article", label: "Create Article" },
  { to: "/reading-list", label: "Reading List" },
  { to: "/user/edit-profile/profile", label: "Settings" },
];

export const UserDropdown = ({ user }: UserDropdownProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [endSession, { isLoading }] = useEndSessionMutation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const close = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await endSession().unwrap();
    } catch (error) {
      toast.error(apiErrorMessage(error) + " Local session was cleared.");
    } finally {
      dispatch(logout());
      close();
      navigate("/");
    }
  };

  return (
    <>
      <IconButton
        aria-label="Account menu"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={(event: MouseEvent<HTMLButtonElement>) =>
          setAnchorEl(event.currentTarget)
        }
      >
        <Avatar src={user.image}>{trimFirstLetter(user.name)}</Avatar>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={close}>
        <MenuItem component={Link} to={userPath(user.id)} onClick={close}>
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
        {links.map(({ to, label }) => (
          <MenuItem key={to} component={Link} to={to} onClick={close}>
            {label}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem disabled={isLoading} onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
