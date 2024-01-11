import { Routes as RouterRoutes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import PrivateRoutes from "./PrivateRoutes";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { AddArticle } from "../pages/AddArticle/AddArticle";

export const Routes = () => {
  return (
    <RouterRoutes>
      {/* Private routes */}
      <Route element={<PrivateRoutes />}>
        <Route path="/add-article" element={<AddArticle />} />
      </Route>

      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </RouterRoutes>
  );
};
