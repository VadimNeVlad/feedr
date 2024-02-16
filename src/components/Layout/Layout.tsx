import React from "react";
import { LayoutProps } from "../../utils/types/props";
import { Header } from "../Header/Header";
import { ToastContainer } from "react-toastify";
import { Footer } from "../Footer/Footer";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />

      <ToastContainer />
    </>
  );
};
