import React from "react";
import styles from "./Header.module.scss";
import { UserDropdown } from "../UserDropdown/UserDropdown";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";

export const Header: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className={styles.header}>
      <div>
        <Link to={"/"}>FeedR</Link>
      </div>

      {token && user ? (
        <div className={styles.header__panel}>
          <Button variant="outlined" sx={{ mr: 2 }}>
            <Link to={"/add-article"}>Create Article</Link>
          </Button>
          <UserDropdown userName={user.name} />
        </div>
      ) : (
        <div>
          <Button variant="outlined">
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
