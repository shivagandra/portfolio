import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink,
  Github,
  Cpu,
  MessageSquare,
  BookOpen,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  //const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    {
      title: "Federated Learning for IoT",
      description:
        "Built a Machine Learning model using Flower framework for decentralized model training, enabling secure distributed learning for IoT device predictive maintenance.",
      image: "project-federated-learning.jpg",
      tech: [
        "Machine Learning",
        "AWS Cloud",
        "Flower Framework",
        "Python",
        "gRPC",
      ],
      icon: Cpu,
      github: "https://github.com/shivagandra",
      live: null,
    },
    {
      title: "KL Connect Application",
      description:
        "A comprehensive cross-platform communication application for university-parent interactions with real-time messaging and secure authentication.",
      image: "project-kl-connect.jpg",
      tech: [
        "Flutter",
        "Node.js",
        "SQL",
        "AWS Cognito",
        "WebSockets",
        "REST API",
      ],
      icon: MessageSquare,
      github: "https://github.com/shivagandra/KL-Connect-Application",
      live: null,
    },
    {
      title: "Library Management System",
      description:
        "An efficient library management platform with automated notifications, secure payment gateway integration, and comprehensive book catalog management.",
      image: "project-library.jpg",
      tech: [
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "AWS Services",
        "Spring Mail",
      ],
      icon: BookOpen,
      github: "https://github.com/shivagandra/LMS-JFSD",
      live: null,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [Projects]);

  return (
    <div ref={sectionRef} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-exo font-bold text-4xl md:text-5xl text-white mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my technical expertise through real-world DevOps,
            Cloud, and Software Development projects.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative glass rounded-2xl overflow-hidden opacity-0"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    hoveredIndex === index
                      ? "scale-110 grayscale-0"
                      : "grayscale-[30%]"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />

                {/* Icon Badge */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center">
                  <project.icon className="text-white" size={20} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-exo font-bold text-xl text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 10).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-indigo-500/10 text-indigo-300 rounded-md border border-indigo-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 10 && (
                    <span className="px-2 py-1 text-xs text-gray-500">
                      +{project.tech.length - 10}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                  >
                    <Github size={16} />
                    Code
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                    >
                      <ExternalLink size={16} />
                      Live
                    </a>
                  )}
                </div>
              </div>

              {/* Border Glow on Hover */}
              <div
                className={`absolute inset-0 rounded-2xl border-2 border-indigo-500/0 transition-all duration-300 pointer-events-none ${
                  hoveredIndex === index
                    ? "border-indigo-500/50 shadow-glow"
                    : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
