import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Cloud,
  Server,
  Code,
  GraduationCap,
  Award,
  User,
  Briefcase,
  Mail,
  Search,
  Command,
} from "lucide-react";
import { quickNavLinks } from "@/data/portfolioData";
import {
  getLikelyNextRoutes,
  prefetchRoute,
  prefetchRoutes,
} from "@/lib/route-prefetch";

const navIcons: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Home: Cloud,
  About: User,
  Experience: Briefcase,
  Projects: Code,
  Skills: Server,
  Education: GraduationCap,
  Certifications: Award,
  Contact: Mail,
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");
  const tabletNavStripRef = useRef<HTMLDivElement>(null);
  const routeScrollPositionsRef = useRef<Record<string, number>>({});
  const navigate = useNavigate();
  const location = useLocation();

  const activeLabel =
    quickNavLinks.find((link) => link.path === location.pathname)?.label ??
    "Home";

  const filteredLinks = useMemo(() => {
    const normalized = paletteQuery.trim().toLowerCase();
    if (!normalized) return quickNavLinks;
    return quickNavLinks.filter((link) =>
      link.label.toLowerCase().includes(normalized),
    );
  }, [paletteQuery]);

  const closeOverlays = () => {
    setIsPaletteOpen(false);
    setPaletteQuery("");
    setIsMobileMenuOpen(false);
  };

  const openPalette = () => {
    setIsMobileMenuOpen(false);
    setIsPaletteOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const maxHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxHeight > 0 ? (window.scrollY / maxHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const hasMeta = event.ctrlKey || event.metaKey;
      if (hasMeta && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsPaletteOpen((previous) => !previous);
      }
      if (event.key === "Escape") {
        setIsPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    const likelyNextRoutes = getLikelyNextRoutes(location.pathname);
    if (!likelyNextRoutes.length) return;

    const prefetchLikelyRoutes = () => prefetchRoutes(likelyNextRoutes);
    const requestIdle = window.requestIdleCallback?.bind(window);
    const cancelIdle = window.cancelIdleCallback?.bind(window);
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    if (requestIdle) {
      idleId = requestIdle(prefetchLikelyRoutes, {
        timeout: 1200,
      });
    } else {
      timeoutId = setTimeout(prefetchLikelyRoutes, 600);
    }

    return () => {
      if (idleId !== undefined && cancelIdle) {
        cancelIdle(idleId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [location.pathname]);

  useEffect(() => {
    const closeMobileMenuOnMediumAndUp = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    closeMobileMenuOnMediumAndUp();
    window.addEventListener("resize", closeMobileMenuOnMediumAndUp, {
      passive: true,
    });
    return () =>
      window.removeEventListener("resize", closeMobileMenuOnMediumAndUp);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isPaletteOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPaletteOpen]);

  useEffect(() => {
    const strip = tabletNavStripRef.current;
    if (!strip) return;

    const activeLink = strip.querySelector<HTMLAnchorElement>(
      `a[data-nav-path="${location.pathname}"]`,
    );
    if (!activeLink) return;

    const centerActiveLink = (behavior: ScrollBehavior) => {
      const maxLeft = strip.scrollWidth - strip.clientWidth;
      if (maxLeft <= 0) return;

      const targetLeft = Math.min(
        Math.max(
          activeLink.offsetLeft - (strip.clientWidth - activeLink.clientWidth) / 2,
          0,
        ),
        maxLeft,
      );

      strip.scrollTo({ left: targetLeft, behavior });
      routeScrollPositionsRef.current[location.pathname] = targetLeft;
    };

    const rafId = window.requestAnimationFrame(() => {
      const savedLeft = routeScrollPositionsRef.current[location.pathname];
      if (savedLeft !== undefined) {
        strip.scrollTo({ left: savedLeft, behavior: "auto" });
      }
      centerActiveLink("smooth");
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [location.pathname]);

  useEffect(() => {
    const strip = tabletNavStripRef.current;
    if (!strip) return;

    const onStripScroll = () => {
      routeScrollPositionsRef.current[location.pathname] = strip.scrollLeft;
    };

    strip.addEventListener("scroll", onStripScroll, { passive: true });
    return () => strip.removeEventListener("scroll", onStripScroll);
  }, [location.pathname]);

  const goTo = (path: string) => {
    closeOverlays();
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        aria-label="Primary"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "nav-blur py-2" : "bg-transparent py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-5 flex items-center gap-2.5">
          <NavLink
            to="/"
            onMouseEnter={() => prefetchRoute("/")}
            onFocus={() => prefetchRoute("/")}
            className="font-exo font-bold text-[1.7rem] leading-none text-white hover:text-indigo-400 transition-colors flex items-center gap-2 shrink-0"
          >
            <Cloud className="text-indigo-500" size={22} />
            <span className="hidden sm:inline text-[0.95em]">
              Shiva<span className="text-indigo-100"> Krishna</span>
            </span>
            <span className="sm:hidden text-base">Shiva</span>
            <span className="md:hidden text-[11px] px-1.5 py-0.5 rounded-full bg-white/10 text-gray-300 ml-0.5">
              {activeLabel}
            </span>
          </NavLink>

          <div
            ref={tabletNavStripRef}
            className="hidden md:flex items-center gap-1 overflow-x-auto whitespace-nowrap no-scrollbar flex-1 min-w-0"
          >
            {quickNavLinks.map((item) => {
              const Icon = navIcons[item.label];
              return (
                <NavLink
                  key={item.label}
                  data-nav-path={item.path}
                  to={item.path}
                  onMouseEnter={() => prefetchRoute(item.path)}
                  onFocus={() => prefetchRoute(item.path)}
                  onTouchStart={() => prefetchRoute(item.path)}
                  onClick={() => {
                    closeOverlays();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={({ isActive }) =>
                    `px-2.5 py-1.5 text-[14px] rounded-lg transition-all duration-300 flex items-center gap-1.5 shrink-0 ${
                      isActive
                        ? "text-white bg-indigo-500/20 border border-indigo-500/30"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {Icon ? <Icon size={15} /> : null}
                  {item.label}
                </NavLink>
              );
            })}
          </div>

          <button
            onMouseEnter={() => prefetchRoutes(["/projects", "/contact"])}
            onFocus={() => prefetchRoutes(["/projects", "/contact"])}
            onClick={openPalette}
            className="hidden md:inline-flex xl:hidden p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition-colors"
            aria-label="Open quick navigation"
          >
            <Search size={15} />
          </button>

          <div className="hidden xl:flex items-center gap-2 ml-1">
            <button
              onMouseEnter={() => prefetchRoutes(["/projects", "/contact"])}
              onFocus={() => prefetchRoutes(["/projects", "/contact"])}
              onClick={openPalette}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-[14px] inline-flex items-center gap-1.5 transition-colors"
              aria-label="Open quick navigation"
            >
              <Search size={13} />
              Quick Search
              <span className="text-[11px] text-gray-500 inline-flex items-center gap-1">
                <Command size={11} />K
              </span>
            </button>
          </div>

          <div className="md:hidden flex items-center gap-1 ml-auto">
            <button
              className="text-white p-2 rounded-lg hover:bg-white/5"
              onClick={openPalette}
              onTouchStart={() => prefetchRoutes(["/projects", "/contact"])}
              aria-label="Open quick navigation"
            >
              <Search size={20} />
            </button>
            <button
              className="text-white p-2 rounded-lg hover:bg-white/5"
              onClick={() => setIsMobileMenuOpen((previous) => !previous)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-primary-nav"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div
          id="mobile-primary-nav"
          className={`md:hidden absolute top-full left-0 right-0 nav-blur transition-all duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="px-4 py-4 flex flex-col gap-2">
            {quickNavLinks.map((item) => {
              const Icon = navIcons[item.label];
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  onFocus={() => prefetchRoute(item.path)}
                  onTouchStart={() => prefetchRoute(item.path)}
                  onClick={() => {
                    closeOverlays();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={({ isActive }) =>
                    `px-4 py-3 text-gray-300 hover:text-white transition-colors rounded-lg flex items-center gap-3 ${
                      isActive
                        ? "bg-indigo-500/20 text-white"
                        : "hover:bg-white/5"
                    }`
                  }
                >
                  {Icon ? <Icon size={18} /> : null}
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {isPaletteOpen && (
        <div
          className="fixed inset-0 z-[65] bg-black/65 backdrop-blur-sm px-4 py-20"
          onClick={() => setIsPaletteOpen(false)}
        >
          <div
            className="max-w-xl mx-auto glass rounded-2xl border border-white/10 overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <Search size={16} className="text-gray-400" />
              <input
                autoFocus
                value={paletteQuery}
                onChange={(event) => setPaletteQuery(event.target.value)}
                placeholder="Jump to a page..."
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-gray-500"
              />
              <button
                onClick={() => setIsPaletteOpen(false)}
                className="text-xs text-gray-500 hover:text-gray-300"
              >
                ESC
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filteredLinks.length ? (
                filteredLinks.map((item) => {
                  const Icon = navIcons[item.label];
                  return (
                    <button
                      key={item.label}
                      onMouseEnter={() => prefetchRoute(item.path)}
                      onFocus={() => prefetchRoute(item.path)}
                      onClick={() => goTo(item.path)}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/5 text-gray-200 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        {Icon ? <Icon size={16} className="text-indigo-300" /> : null}
                        {item.label}
                      </span>
                      <span className="text-xs text-gray-500">{item.path}</span>
                    </button>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500 px-3 py-4">
                  No results for "{paletteQuery}"
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
