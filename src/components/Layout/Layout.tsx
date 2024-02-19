import React from "react";
import { LayoutProps } from "../../utils/types/props";
import { Header } from "../Header/Header";
import { ToastContainer } from "react-toastify";
import { Footer } from "../Footer/Footer";
import { motion } from "framer-motion";
import { route } from "../../animations/route";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <motion.div
        variants={route}
        initial="initial"
        animate="shown"
        exit="exit"
      >
        {children}
      </motion.div>
      <Footer />

      <ToastContainer />
    </>
  );
};
