import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type RouteMetaConfig = {
  title: string;
  description: string;
  keywords: string;
};

const siteName = "Shiva Krishna Gandra";
const defaultMeta: RouteMetaConfig = {
  title: "DevOps and Cloud Engineer Portfolio",
  description:
    "Portfolio of Shiva Krishna Gandra, a DevOps and cloud engineer focused on AWS, automation, CI/CD, platform reliability, and scalable infrastructure.",
  keywords:
    "Shiva Krishna Gandra, DevOps Engineer, Cloud Engineer, AWS, Kubernetes, Terraform, CI/CD, Portfolio",
};

const routeMeta: Record<string, RouteMetaConfig> = {
  "/": {
    title: "DevOps and Cloud Engineer Portfolio",
    description:
      "Explore Shiva Krishna Gandra's portfolio featuring AWS cloud architecture, DevOps automation, scalable infrastructure, and delivery-focused engineering case studies.",
    keywords:
      "DevOps portfolio, cloud engineer portfolio, AWS DevOps engineer, infrastructure automation, CI/CD",
  },
  "/about": {
    title: "About Shiva Krishna",
    description:
      "Learn about Shiva Krishna Gandra's engineering background, DevOps philosophy, cloud-native approach, and full lifecycle delivery mindset.",
    keywords:
      "about DevOps engineer, cloud architect profile, Shiva Krishna bio",
  },
  "/experience": {
    title: "Work Experience",
    description:
      "Professional experience across TCS, Safertek, and Samsung R&D with measurable outcomes in reliability, automation, and platform engineering.",
    keywords:
      "DevOps work experience, cloud engineering experience, TCS, internship projects",
  },
  "/projects": {
    title: "Project Case Studies",
    description:
      "Detailed project case studies covering cloud automation, federated learning, full-stack systems, and production-ready delivery patterns.",
    keywords:
      "DevOps projects, AWS projects, cloud case studies, software engineering portfolio",
  },
  "/skills": {
    title: "Technical Skills",
    description:
      "Technical skills across cloud engineering, containers, CI/CD, automation, observability, and backend development.",
    keywords:
      "DevOps skills, AWS skills, Kubernetes, Terraform, Jenkins, Java, Python",
  },
  "/education": {
    title: "Education and Certifications",
    description:
      "Academic foundation, coursework, leadership activities, and industry certifications that support practical engineering depth.",
    keywords:
      "computer science education, cloud certifications, DevOps learning path",
  },
  "/certifications": {
    title: "Professional Certifications",
    description:
      "Industry credentials including AWS certifications, Red Hat, and multi-cloud networking achievements, with active learning roadmap.",
    keywords:
      "AWS certified DevOps engineer, certifications, cloud credentials",
  },
  "/contact": {
    title: "Contact and Collaboration",
    description:
      "Connect with Shiva Krishna Gandra for DevOps, cloud platform, and infrastructure automation opportunities.",
    keywords:
      "contact DevOps engineer, hire cloud engineer, collaboration",
  },
};

const upsertMeta = (
  selector: string,
  attributes: Record<string, string>,
  content: string,
) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => {
      element?.setAttribute(key, value);
    });
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
};

const upsertJsonLd = (id: string, value: unknown) => {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.text = JSON.stringify(value);
};

const RouteMeta = () => {
  const location = useLocation();

  useEffect(() => {
    const pathname =
      location.pathname !== "/" ? location.pathname.replace(/\/+$/, "") : "/";
    const meta = routeMeta[pathname] ?? defaultMeta;
    const title = `${meta.title} | ${siteName}`;
    const siteUrl =
      import.meta.env.VITE_SITE_URL ?? "https://shivagandra.github.io/portfolio";
    const canonical =
      pathname === "/" ? `${siteUrl}/` : `${siteUrl}/#${pathname}`;

    document.title = title;

    upsertMeta('meta[name="description"]', { name: "description" }, meta.description);
    upsertMeta('meta[name="keywords"]', { name: "keywords" }, meta.keywords);
    upsertMeta('meta[name="robots"]', { name: "robots" }, "index,follow,max-image-preview:large");

    upsertMeta('meta[property="og:type"]', { property: "og:type" }, "website");
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name" }, siteName);
    upsertMeta('meta[property="og:title"]', { property: "og:title" }, title);
    upsertMeta('meta[property="og:description"]', { property: "og:description" }, meta.description);
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, canonical);
    upsertMeta('meta[property="og:image"]', { property: "og:image" }, `${siteUrl}/IMG_SHIVA.JPG`);

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, title);
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, meta.description);
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, `${siteUrl}/IMG_SHIVA.JPG`);

    upsertCanonical(canonical);

    upsertJsonLd("route-webpage-jsonld", {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: meta.title,
      description: meta.description,
      url: canonical,
      inLanguage: "en",
      isPartOf: {
        "@type": "WebSite",
        name: siteName,
        url: `${siteUrl}/`,
      },
    });
  }, [location.pathname]);

  return null;
};

export default RouteMeta;
