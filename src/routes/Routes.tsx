import { Routes as RouterRoutes, Route, useLocation } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import PrivateRoutes from "./PrivateRoutes";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { AddArticle } from "../pages/AddArticle/AddArticle";
import { Article } from "../pages/Article/Article";
import { EditArticle } from "../pages/EditArticle/EditArticle";
import { useEffect } from "react";

export const Routes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  return (
    <RouterRoutes>
      {/* Private routes */}
      <Route element={<PrivateRoutes />}>
        <Route path="/add-article" element={<AddArticle />} />
        <Route path="/edit-article/:slug" element={<EditArticle />} />
      </Route>

      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/articles/:slug" element={<Article />} />
    </RouterRoutes>
  );
};
