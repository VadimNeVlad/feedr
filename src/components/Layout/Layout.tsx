import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { PageLoader } from "../PageLoader/PageLoader";

/** Shared shell for routed pages: the header and footer stay mounted between navigations. */
export const Layout = () => (
  <>
    <Header />
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
    <Footer />
  </>
);
