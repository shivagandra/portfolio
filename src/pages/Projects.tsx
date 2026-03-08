import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink,
  Filter,
  Github,
  Search,
  X,
  ArrowUpRight,
} from "lucide-react";
import { projects as portfolioProjects, type Project } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = useMemo(
    () => ["All", ...new Set(portfolioProjects.map((project) => project.category))],
    [],
  );

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return portfolioProjects
      .filter((project) =>
        activeCategory === "All" ? true : project.category === activeCategory,
      )
      .filter((project) => {
        if (!normalizedQuery) return true;
        const searchable = [
          project.title,
          project.summary,
          project.category,
          ...project.tech,
        ]
          .join(" ")
          .toLowerCase();
        return searchable.includes(normalizedQuery);
      })
      .sort((a, b) => b.year - a.year);
  }, [activeCategory, query]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  useEffect(() => {
    if (!activeProject) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeProject]);

  return (
    <div ref={sectionRef} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-exo font-bold text-4xl md:text-5xl text-white mb-4">
            Project <span className="text-gradient">Case Studies</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Detailed implementation snapshots with architecture choices, delivery
            strategy, and measurable outcomes.
          </p>
        </div>

        <div className="glass rounded-2xl p-4 md:p-5 mb-8 border border-white/5">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by project, stack, or category"
                className="w-full bg-white/5 border border-white/10 focus:border-indigo-400/60 outline-none rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-gray-500"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase tracking-wide text-gray-500 inline-flex items-center gap-1">
                <Filter size={12} />
                Filter
              </span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-2 text-xs rounded-lg transition-all ${
                    activeCategory === category
                      ? "bg-indigo-500/20 border border-indigo-500/40 text-indigo-200"
                      : "bg-white/5 border border-white/10 text-gray-300 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6 text-sm text-gray-400">
          Showing {filteredProjects.length} of {portfolioProjects.length} projects
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="project-card glass rounded-2xl overflow-hidden opacity-0 group border border-white/5"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-[11px] text-indigo-200 uppercase tracking-wide">
                  {project.category}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-[11px] text-gray-300">
                  {project.year}
                </div>
              </div>

              <div className="p-6">
                <h2 className="font-exo font-semibold text-xl text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.slice(0, 4).map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 rounded-md"
                    >
                      {item}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-2 py-1 text-xs text-gray-500">
                      +{project.tech.length - 4} more
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-sm text-white inline-flex items-center justify-center gap-1.5 transition-colors"
                  >
                    View Case Study
                    <ArrowUpRight size={14} />
                  </button>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-gray-300 hover:text-white inline-flex items-center justify-center"
                    aria-label={`Open ${project.title} source code`}
                  >
                    <Github size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {!filteredProjects.length && (
          <div className="glass rounded-2xl p-10 text-center border border-white/5">
            <p className="text-lg text-white mb-2">No matching projects found</p>
            <p className="text-sm text-gray-400 mb-5">
              Try a different keyword or remove filters.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
              }}
              className="px-5 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-sm text-white"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {activeProject &&
        createPortal(
          <div
            className="fixed inset-0 z-[120] bg-black/65 backdrop-blur-sm px-4 py-10 overflow-y-auto"
            onClick={() => setActiveProject(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-case-study-title"
              className="max-w-4xl mx-auto glass border border-white/10 rounded-3xl overflow-hidden"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative h-56 md:h-72">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-black/40 border border-white/10 text-white flex items-center justify-center"
                  aria-label="Close project details"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full text-xs bg-indigo-500/20 border border-indigo-500/30 text-indigo-200">
                    {activeProject.category}
                  </span>
                  <span className="text-xs text-gray-500">{activeProject.year}</span>
                </div>

                <h2
                  id="project-case-study-title"
                  className="font-exo font-bold text-2xl md:text-3xl text-white mb-3"
                >
                  {activeProject.title}
                </h2>
                <p className="text-gray-300 mb-6">{activeProject.summary}</p>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {activeProject.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                      <p className="text-xs text-gray-500 mb-1">{metric.label}</p>
                      <p className="text-white font-semibold">{metric.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-white font-semibold mb-2">Challenge</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {activeProject.challenge}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Approach</h3>
                    <ul className="space-y-2">
                      {activeProject.approach.map((item) => (
                        <li key={item} className="text-sm text-gray-400">
                          - {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-white font-semibold mb-3">Outcomes</h3>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {activeProject.outcomes.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-gray-300 p-3 rounded-lg bg-white/5 border border-white/10"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {activeProject.tech.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1.5 text-xs rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-sm text-white inline-flex items-center gap-2"
                  >
                    <Github size={16} />
                    View Source
                  </a>
                  {activeProject.live && (
                    <a
                      href={activeProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-gray-300 hover:text-white inline-flex items-center gap-2"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default Projects;
