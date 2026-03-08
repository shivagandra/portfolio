import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Building2,
  Calendar,
  MapPin,
  CheckCircle2,
  Filter,
  Briefcase,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "Tata Consultancy Services Limited",
    role: "Development Analyst",
    period: "June 2024 - Present",
    location: "Kolkata, West Bengal",
    type: "Full-time",
    description:
      "Maintaining and fine-tuning TCS Bancs software while investigating and resolving system faults using Java-centric debugging workflows.",
    achievements: [
      "Collaborated with cross-functional teams to resolve complex software incidents.",
      "Engineered and optimized backend components using Java and SQL.",
      "Improved platform stability through proactive issue identification and mitigation.",
      "Supported high availability goals with monitoring and operational rigor.",
    ],
    technologies: ["Java", "Spring Boot", "SQL", "Oracle", "Git", "Jenkins"],
  },
  {
    company: "Safertek Software LLC",
    role: "DevOps Engineering Intern",
    period: "Nov 2023 - Mar 2024",
    location: "Hyderabad, Telangana",
    type: "Internship",
    description:
      "Streamlined delivery through cloud-driven automation and repeatable release workflows.",
    achievements: [
      "Automated AWS infrastructure setup using CloudFormation and Lambda.",
      "Implemented CI/CD pipelines with AWS CodePipeline and CodeBuild.",
      "Used CloudWatch to improve operational visibility and diagnostics.",
      "Reduced deployment cycle time by around 60% using automation.",
    ],
    technologies: ["AWS", "CloudFormation", "Lambda", "CodePipeline", "Shell", "Docker"],
  },
  {
    company: "Samsung R&D Institute India",
    role: "Research Intern",
    period: "Sep 2022 - Mar 2023",
    location: "Remote (Bangalore, India)",
    type: "Internship",
    description:
      "Built machine learning models for predictive maintenance of IoT devices based on acoustic signals.",
    achievements: [
      "Benchmarked multiple ML algorithms and improved efficiency by ~30%.",
      "Implemented federated learning workflows using Flower and gRPC.",
      "Developed secure data-sharing patterns for distributed training.",
      "Created reproducible experimentation baselines for research iterations.",
    ],
    technologies: ["Python", "TensorFlow", "Flower", "gRPC", "AWS", "ML"],
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeType, setActiveType] = useState<string>("All");

  const types = useMemo(
    () => ["All", ...new Set(experiences.map((experience) => experience.type))],
    [],
  );

  const filteredExperiences = useMemo(
    () =>
      experiences.filter((experience) =>
        activeType === "All" ? true : experience.type === activeType,
      ),
    [activeType],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".experience-card",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredExperiences]);

  return (
    <div ref={sectionRef} className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-exo font-bold text-4xl md:text-5xl text-white mb-4">
            Work <span className="text-gradient">Experience</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            End-to-end experience spanning production engineering, cloud delivery
            automation, and applied research.
          </p>
        </div>

        <div className="glass rounded-2xl p-5 mb-8 border border-white/5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-sm text-gray-400">
              Showing {filteredExperiences.length} of {experiences.length} roles
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase tracking-wide text-gray-500 inline-flex items-center gap-1">
                <Filter size={12} />
                Type
              </span>
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-3 py-2 text-xs rounded-lg border transition-all ${
                    activeType === type
                      ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-200"
                      : "bg-white/5 border-white/10 text-gray-300 hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 timeline-line transform md:-translate-x-1/2" />
          <div className="space-y-12">
            {filteredExperiences.map((experience, index) => (
              <div
                key={experience.role + experience.company}
                className={`experience-card relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-start md:items-center gap-8 opacity-0`}
              >
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-void z-10">
                  <div className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-40" />
                </div>

                <div
                  className={`ml-12 md:ml-0 md:w-[48%] ${
                    index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <article className="glass rounded-2xl p-6 md:p-8 group hover:border-indigo-500/30 transition-all duration-300 border border-white/5">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h2 className="font-exo font-bold text-xl text-white group-hover:text-indigo-400 transition-colors">
                          {experience.role}
                        </h2>
                        <div className="flex items-center gap-2 text-gray-400 mt-1">
                          <Building2 size={16} />
                          <span>{experience.company}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 text-xs bg-indigo-500/10 text-indigo-300 rounded-full inline-flex items-center gap-1">
                        <Briefcase size={12} />
                        {experience.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {experience.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {experience.location}
                      </span>
                    </div>

                    <p className="text-gray-400 mb-4">{experience.description}</p>

                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-white mb-2">
                        Key Achievements
                      </h3>
                      <ul className="space-y-2">
                        {experience.achievements.map((achievement) => (
                          <li
                            key={achievement}
                            className="flex items-start gap-2 text-sm text-gray-300"
                          >
                            <CheckCircle2
                              size={16}
                              className="text-indigo-400 mt-0.5 flex-shrink-0"
                            />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-white/5 text-gray-400 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
