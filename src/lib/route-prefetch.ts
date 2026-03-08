import { lazy, type ComponentType } from "react";

type PageModule = { default: ComponentType };
type PageLoader = () => Promise<PageModule>;

const routeLoaders = {
  "/": () => import("../pages/Home"),
  "/about": () => import("../pages/About"),
  "/experience": () => import("../pages/Experience"),
  "/projects": () => import("../pages/Projects"),
  "/skills": () => import("../pages/Skills"),
  "/education": () => import("../pages/Education"),
  "/certifications": () => import("../pages/Certifications"),
  "/contact": () => import("../pages/Contact"),
} satisfies Record<string, PageLoader>;

export type AppRoutePath = keyof typeof routeLoaders;

const likelyNextRouteMap: Record<AppRoutePath, AppRoutePath[]> = {
  "/": ["/about", "/projects", "/contact"],
  "/about": ["/experience", "/skills", "/contact"],
  "/experience": ["/projects", "/skills", "/contact"],
  "/projects": ["/contact", "/experience", "/skills"],
  "/skills": ["/projects", "/certifications", "/contact"],
  "/education": ["/certifications", "/skills", "/contact"],
  "/certifications": ["/skills", "/contact", "/projects"],
  "/contact": ["/projects", "/about", "/experience"],
};

const prefetched = new Set<AppRoutePath>();
const pending = new Map<AppRoutePath, Promise<PageModule>>();

const normalizeRoutePath = (path: string): AppRoutePath | null => {
  const withoutHash = path.startsWith("#") ? path.slice(1) : path;
  const [cleanPath] = withoutHash.split(/[?#]/);
  if (!cleanPath) return "/";

  const withLeadingSlash = cleanPath.startsWith("/")
    ? cleanPath
    : `/${cleanPath}`;
  const normalized =
    withLeadingSlash !== "/" ? withLeadingSlash.replace(/\/+$/, "") : "/";

  return normalized in routeLoaders ? (normalized as AppRoutePath) : null;
};

const prefetchNormalizedRoute = (path: AppRoutePath) => {
  if (prefetched.has(path) || pending.has(path)) return;

  const loader = routeLoaders[path];
  const promise = loader()
    .then((module) => {
      prefetched.add(path);
      pending.delete(path);
      return module;
    })
    .catch((error) => {
      pending.delete(path);
      throw error;
    });

  pending.set(path, promise);
};

export const prefetchRoute = (path: string) => {
  const normalized = normalizeRoutePath(path);
  if (!normalized) return;
  prefetchNormalizedRoute(normalized);
};

export const prefetchRoutes = (paths: string[]) => {
  paths.forEach(prefetchRoute);
};

export const getLikelyNextRoutes = (currentPath: string): AppRoutePath[] => {
  const normalized = normalizeRoutePath(currentPath) ?? "/";
  return likelyNextRouteMap[normalized];
};

export const HomePage = lazy(routeLoaders["/"]);
export const AboutPage = lazy(routeLoaders["/about"]);
export const ExperiencePage = lazy(routeLoaders["/experience"]);
export const ProjectsPage = lazy(routeLoaders["/projects"]);
export const SkillsPage = lazy(routeLoaders["/skills"]);
export const EducationPage = lazy(routeLoaders["/education"]);
export const CertificationsPage = lazy(routeLoaders["/certifications"]);
export const ContactPage = lazy(routeLoaders["/contact"]);
