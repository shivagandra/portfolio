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
  CheckCircle2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const certifications = [
    {
      name: "AWS Certified DevOps Engineer",
      level: "Professional",
      issuer: "Amazon Web Services",
      icon: Cloud,
      color: "from-orange-500 to-amber-500",
      link: "https://www.credly.com/badges/855760d1-c17d-4b73-afa4-cff7f6af2289/public_url",
      skills: ["CI/CD", "Infrastructure as Code", "Monitoring", "Security"],
      description:
        "Validates expertise in provisioning, operating, and managing distributed application systems on AWS.",
    },
    {
      name: "AWS Certified Developer",
      level: "Associate",
      issuer: "Amazon Web Services",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      link: "https://www.credly.com/badges/c00613b0-2dad-4406-a37a-baaaa00b213f/public_url",
      skills: ["AWS Services", "Serverless", "APIs", "Security"],
      description:
        "Demonstrates proficiency in developing and maintaining applications on AWS.",
    },
    {
      name: "AWS Certified Cloud Practitioner",
      level: "Foundational",
      issuer: "Amazon Web Services",
      icon: Cloud,
      color: "from-blue-500 to-cyan-500",
      link: "https://www.credly.com/badges/ac4b6261-96ca-478e-b4a7-86c3cd4ee0e4/public_url",
      skills: ["AWS Services", "Serverless", "APIs", "Security"],
      description:
        "Demonstrates proficiency in developing and maintaining applications on AWS.",
    },
    {
      name: "EPAM Cloud & DevOps",
      level: "Associate",
      issuer: "EPAM Systems",
      icon: Server,
      color: "from-green-500 to-emerald-500",
      link: "#",
      skills: ["Cloud Fundamentals", "DevOps Practices", "Automation"],
      description:
        "Comprehensive training in cloud technologies and DevOps methodologies.",
    },
    {
      name: "RedHat Certified Enterprise Application Developer",
      level: "Professional",
      issuer: "Red Hat",
      icon: Server,
      color: "from-red-500 to-rose-500",
      link: "https://www.credly.com/badges/debc90e1-1000-43f6-8002-ea9b40566c92/public_url",
      skills: ["Java EE", "Spring", "JPA", "REST APIs"],
      description:
        "Validates skills in developing enterprise Java applications on Red Hat infrastructure.",
    },
    {
      name: "Aviatrix Multi-Cloud Networking",
      level: "Associate",
      issuer: "Aviatrix",
      icon: Network,
      color: "from-purple-500 to-violet-500",
      link: "https://www.credly.com/badges/6be59253-a8cb-4593-9557-c4f8555167e5/public_url",
      skills: ["Multi-Cloud", "Networking", "Security", "Transit"],
      description:
        "Expertise in designing and implementing multi-cloud network architectures.",
    },
  ];

  const inProgress = [
    {
      name: "Certified Kubernetes Administrator (CKA)",
      provider: "CNCF",
      expected: "2026",
    },
    {
      name: "Terraform Associate",
      provider: "HashiCorp",
      expected: "2026",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cert-card",
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
  }, []);

  return (
    <div ref={sectionRef} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-exo font-bold text-4xl md:text-5xl text-white mb-4">
            Professional <span className="text-gradient">Certifications</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Industry-recognized credentials validating expertise in cloud,
            DevOps, and software development.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {certifications.map((cert, index) => (
            <a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-card cert-shine glass rounded-2xl p-6 hover:shadow-glow transition-all duration-300 group opacity-0"
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
              <p className="text-gray-500 text-sm mb-4">{cert.issuer}</p>

              <p className="text-gray-400 text-sm mb-4">{cert.description}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {cert.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-white/5 text-gray-400 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* View Link */}
              <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-indigo-400 transition-colors">
                <span>Verify Credential</span>
                <ExternalLink
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </a>
          ))}
        </div>

        {/* In Progress */}
        <div className="glass rounded-2xl p-8">
          <h2 className="font-exo font-bold text-2xl text-white mb-6 flex items-center gap-3">
            <CheckCircle2 className="text-indigo-400" size={28} />
            In Progress
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {inProgress.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
              >
                <div>
                  <h4 className="font-semibold text-white">{item.name}</h4>
                  <p className="text-gray-500 text-sm">{item.provider}</p>
                </div>
                <span className="px-3 py-1 text-xs bg-indigo-500/20 text-indigo-300 rounded-full">
                  Expected {item.expected}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-6 text-center">
          <div className="glass rounded-xl p-6">
            <div className="font-exo font-bold text-4xl text-indigo-400 mb-1">
              5
            </div>
            <div className="text-gray-400 text-sm">Certifications Earned</div>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="font-exo font-bold text-4xl text-indigo-400 mb-1">
              2
            </div>
            <div className="text-gray-400 text-sm">Cloud Platforms</div>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="font-exo font-bold text-4xl text-indigo-400 mb-1">
              2
            </div>
            <div className="text-gray-400 text-sm">In Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
