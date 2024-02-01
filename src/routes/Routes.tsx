import { Routes as RouterRoutes, Route, useLocation } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import PrivateRoutes from "./PrivateRoutes";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { AddArticle } from "../pages/AddArticle/AddArticle";
import { Article } from "../pages/Article/Article";
import { EditArticle } from "../pages/EditArticle/EditArticle";
import { useEffect } from "react";
import { Profile } from "../pages/Profile/Profile";
import { Follow } from "../pages/Follow/Follow";

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
        <Route path="/edit-article/:id" element={<EditArticle />} />
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/user/:id/following" element={<Follow />} />
        <Route path="/user/:id/followers" element={<Follow />} />
      </Route>

      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/articles/:id/:slug" element={<Article />} />
    </RouterRoutes>
  );
};
