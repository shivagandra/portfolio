import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Award,
  ExternalLink,
  Cloud,
  Code,
  Server,
  Network,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const certifications = [
    {
      name: "AWS Certified DevOps Engineer",
      level: "Professional",
      issuer: "Amazon Web Services",
      icon: Cloud,
      color: "from-orange-500 to-yellow-500",
      link: "https://www.credly.com/badges/855760d1-c17d-4b73-afa4-cff7f6af2289/public_url",
    },
    {
      name: "AWS Certified Developer",
      level: "Associate",
      issuer: "Amazon Web Services",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      link: "https://www.credly.com/badges/c00613b0-2dad-4406-a37a-baaaa00b213f/public_url",
    },
    {
      name: "AWS Certified Cloud Practitioner",
      level: "Foundational",
      issuer: "Amazon Web Services",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      link: "https://www.credly.com/badges/ac4b6261-96ca-478e-b4a7-86c3cd4ee0e4/public_url",
    },
    {
      name: "EPAM Cloud & DevOps",
      level: "Associate",
      issuer: "EPAM Systems",
      icon: Server,
      color: "from-green-500 to-emerald-500",
      link: "#",
    },
    {
      name: "RedHat Certified Enterprise",
      level: "Application Developer",
      issuer: "Red Hat",
      icon: Server,
      color: "from-red-500 to-rose-500",
      link: "https://www.credly.com/badges/debc90e1-1000-43f6-8002-ea9b40566c92/public_url",
    },
    {
      name: "Aviatrix Multi-Cloud Networking",
      level: "Associate",
      issuer: "Aviatrix",
      icon: Network,
      color: "from-purple-500 to-violet-500",
      link: "https://www.credly.com/badges/6be59253-a8cb-4593-9557-c4f8555167e5/public_url",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Masonry fall animation
      gsap.fromTo(
        gridRef.current?.children || [],
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-exo font-bold text-4xl md:text-5xl text-white mb-4">
            <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Industry-recognized credentials validating expertise in cloud,
            DevOps, and software development.
          </p>
        </div>

        {/* Certifications Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group cert-shine glass rounded-2xl p-6 hover:shadow-glow transition-all duration-300 opacity-0"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center`}
                >
                  <cert.icon className="text-white" size={28} />
                </div>
                <Award
                  className="text-indigo-400 opacity-50 group-hover:opacity-100 transition-opacity"
                  size={24}
                />
              </div>

              {/* Content */}
              <h3 className="font-exo font-bold text-lg text-white mb-1 group-hover:text-indigo-400 transition-colors">
                {cert.name}
              </h3>
              <p className="text-indigo-300 text-sm mb-2">{cert.level}</p>
              <p className="text-gray-500 text-sm">{cert.issuer}</p>

              {/* View Link */}
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-400 group-hover:text-indigo-400 transition-colors">
                <span>Verify Credential</span>
                <ExternalLink
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </a>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            All certifications are verified and can be validated through the
            respective issuing organizations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
