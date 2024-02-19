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
import { EditProfile } from "../pages/EditProfile/EditProfile";
import { ProfileSettings } from "../pages/EditProfile/ProfileSettings/ProfileSettings";
import { AccountSettings } from "../pages/EditProfile/AccountSettings/AccountSettings";
import { Tag } from "../pages/Tag/Tag";
import { Tags } from "../pages/Tags/Tags";
import { Search } from "../pages/Search/Search";
import { ReadingList } from "../pages/ReadingList/ReadingList";
import { NotFound } from "../pages/404/404";

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
        <Route path="/user/edit-profile" element={<EditProfile />}>
          <Route index path="*" element={<ProfileSettings />} />
          <Route path="account" element={<AccountSettings />} />
        </Route>
        <Route path="/reading-list" element={<ReadingList />} />
      </Route>

      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/articles/:id/:slug" element={<Article />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tags" element={<Tags />} />
      <Route path="/tag/:tagName" element={<Tag />} />
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};
