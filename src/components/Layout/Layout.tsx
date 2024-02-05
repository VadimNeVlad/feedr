import React from "react";
import { LayoutProps } from "../../utils/types/props";
import { Header } from "../Header/Header";
import { ToastContainer } from "react-toastify";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <ToastContainer />
    </>
  );
};
