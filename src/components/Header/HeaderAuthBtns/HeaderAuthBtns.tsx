import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const HeaderAuthBtns: React.FC = () => {
  return (
    <>
      <Button variant="text">
        <Link to={"/login"}>Login</Link>
      </Button>
      <Button variant="contained">
        <Link to={"/register"}>Create Account</Link>
      </Button>
    </>
  );
};
