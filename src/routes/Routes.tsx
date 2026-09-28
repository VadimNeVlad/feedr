import {
  Routes as RouterRoutes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { ComponentType, lazy, Suspense, useEffect } from "react";
import PrivateRoutes from "./PrivateRoutes";
import { Layout } from "../components/Layout/Layout";
import { PageLoader } from "../components/PageLoader/PageLoader";

/** Lazily loads a page module that uses a named export. */
const lazyPage = <K extends string>(
  load: () => Promise<Record<K, ComponentType>>,
  name: K,
) => lazy(() => load().then((module) => ({ default: module[name] })));

const Home = lazyPage(() => import("../pages/Home/Home"), "Home");
const Login = lazyPage(() => import("../pages/Login/Login"), "Login");
const Register = lazyPage(
  () => import("../pages/Register/Register"),
  "Register",
);
const AddArticle = lazyPage(
  () => import("../pages/AddArticle/AddArticle"),
  "AddArticle",
);
const Article = lazyPage(() => import("../pages/Article/Article"), "Article");
const EditArticle = lazyPage(
  () => import("../pages/EditArticle/EditArticle"),
  "EditArticle",
);
const Profile = lazyPage(() => import("../pages/Profile/Profile"), "Profile");
const Follow = lazyPage(() => import("../pages/Follow/Follow"), "Follow");
const EditProfile = lazyPage(
  () => import("../pages/EditProfile/EditProfile"),
  "EditProfile",
);
const ProfileSettings = lazyPage(
  () => import("../pages/EditProfile/ProfileSettings/ProfileSettings"),
  "ProfileSettings",
);
const AccountSettings = lazyPage(
  () => import("../pages/EditProfile/AccountSettings/AccountSettings"),
  "AccountSettings",
);
const Tag = lazyPage(() => import("../pages/Tag/Tag"), "Tag");
const Tags = lazyPage(() => import("../pages/Tags/Tags"), "Tags");
const Search = lazyPage(() => import("../pages/Search/Search"), "Search");
const ReadingList = lazyPage(
  () => import("../pages/ReadingList/ReadingList"),
  "ReadingList",
);
const NotFound = lazyPage(() => import("../pages/404/404"), "NotFound");

export const Routes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname, location.search]);

  return (
    <Suspense fallback={<PageLoader />}>
      <RouterRoutes>
        <Route element={<Layout />}>
          <Route element={<PrivateRoutes />}>
            <Route path="/add-article" element={<AddArticle />} />
            <Route path="/edit-article/:id" element={<EditArticle />} />
            <Route path="/user/edit-profile" element={<EditProfile />}>
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="account" element={<AccountSettings />} />
            </Route>
            <Route path="/reading-list" element={<ReadingList />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<Profile />} />
          <Route path="/user/:id/following" element={<Follow />} />
          <Route path="/user/:id/followers" element={<Follow />} />
          <Route path="/articles/:id/:slug" element={<Article />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/tag/:tagName" element={<Tag />} />
          <Route path="/search" element={<Search />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </Suspense>
  );
};
