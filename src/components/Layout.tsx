import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import FluidBackground from "./FluidBackground";
import RouteMeta from "./RouteMeta";

const Layout = () => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    mainRef.current?.focus({ preventScroll: true });
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-void text-white overflow-x-hidden">
      <RouteMeta />
      <a
        href="#main-content"
        className="skip-link absolute left-4 top-4 z-[80] rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white"
      >
        Skip to main content
      </a>

      <FluidBackground />
      <div className="grain-overlay" />
      <Navigation />

      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className="relative z-10 pt-20 md:pt-24 focus:outline-none"
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;


