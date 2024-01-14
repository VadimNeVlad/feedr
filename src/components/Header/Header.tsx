import React from "react";
import styles from "./Header.module.scss";
import { UserDropdown } from "../UserDropdown/UserDropdown";
import { useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";

export const Header: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className={styles.header}>
      <Typography variant="h5">
        <Link to={"/"}>
          Feed<span style={{ color: "#1976d2" }}>R</span>
        </Link>
      </Typography>

      {token && user ? (
        <div className={styles.header__panel}>
          <Button variant="outlined" sx={{ mr: 2 }}>
            <Link to={"/add-article"}>Create Article</Link>
          </Button>
          <UserDropdown userName={user.name} />
        </div>
      ) : (
        <div>
          <Button variant="text">
            <Link to={"/login"}>Login</Link>
          </Button>
          <Button variant="contained">
            <Link to={"/register"}>Create Account</Link>
          </Button>
        </div>
      )}
    </header>
  );
};
