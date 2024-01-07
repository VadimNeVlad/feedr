import React from "react";
import { Avatar } from "@mui/material";
import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div>FeedR</div>
      <Avatar>H</Avatar>
    </header>
  );
};
