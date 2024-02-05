import React from "react";
import { LayoutProps } from "../../utils/types/props";
import { Header } from "../Header/Header";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
