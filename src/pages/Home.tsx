import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { getImagePath } from "@/lib/image";
import {
  ArrowRight,
  Cloud,
  Server,
  Container,
  GitBranch,
  Shield,
  Database,
  Zap,
  Globe,
} from "lucide-react";

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: "2+", label: "Years Experience" },
    { value: "5", label: "AWS Certifications" },
    { value: "5+", label: "Projects Deployed" },
    //{ value: "99.9%", label: "Uptime Achieved" },
  ];

  const services = [
    {
      icon: Cloud,
      title: "Cloud Architecture",
      description:
        "Designing scalable, cost-effective cloud solutions on AWS with Infrastructure as Code.",
    },
    {
      icon: Container,
      title: "Container Orchestration",
      description:
        "Deploying and managing containerized applications with Docker and Kubernetes.",
    },
    {
      icon: GitBranch,
      title: "CI/CD Pipelines",
      description:
        "Automating build, test, and deployment processes for faster delivery cycles.",
    },
    {
      icon: Shield,
      title: "DevSecOps",
      description:
        "Integrating security practices into the DevOps pipeline for secure deployments.",
    },
    {
      icon: Database,
      title: "Database Management",
      description:
        "Managing SQL and NoSQL databases with backup, replication, and optimization.",
    },
    {
      icon: Server,
      title: "Infrastructure Automation",
      description:
        "Automating infrastructure provisioning with Terraform and CloudFormation.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 },
      );
      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.5 },
      );
      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.8 },
      );

      // Stats animation
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
        },
      );

      // Services animation
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
          },
        },
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef}>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left md:text-left order-2 md:order-1">
              {/* Badge */}
              <div className="hero-title inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <Zap className="text-yellow-400" size={16} />
                <span className="text-sm text-gray-300">
                  AWS Certified DevOps Engineer - Professional
                </span>
              </div>

              {/* Main Title */}
              <h1 className="hero-title font-exo font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-relaxed">
                DevOps &<br />
                <span className="text-gradient">Cloud Engineer</span>
              </h1>

              {/* Subtitle */}
              <p className="hero-subtitle text-xl md:text-2xl text-gray-400 mb-8 max-w-xl leading-relaxed">
                Building scalable infrastructure, automating deployments, and
                optimizing cloud solutions for modern applications.
              </p>

              {/* CTA Buttons */}
              <div className="hero-cta flex flex-wrap gap-4 mb-12">
                <Link
                  to="/projects"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="btn-magnetic px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-medium flex items-center gap-2"
                >
                  View Projects
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/contact"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="btn-magnetic px-8 py-4 border border-indigo-500/50 hover:border-indigo-500 text-white rounded-full font-medium"
                >
                  Get In Touch
                </Link>
              </div>

              {/* Tech Stack Preview */}
              <div className="hero-cta flex flex-wrap gap-4">
                {[
                  "AWS",
                  "Kubernetes",
                  "Docker",
                  "Terraform",
                  "Jenkins",
                  "Python",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 glass rounded-lg text-sm text-gray-400 flex items-center gap-2"
                  >
                    <Server size={14} className="text-indigo-400" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative order-1 md:order-2 flex justify-center md:justify-end">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-3xl animate-pulse-glow" />

              {/* Image Container */}
              <div className="relative z-10">
                <img
                  src={getImagePath("IMG_SHIVA.JPG")}
                  alt="Shiva Krishna"
                  className="w-72 h-72 md:w-96 md:h-96 rounded-full object-cover border-4 border-indigo-500/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-item glass rounded-2xl p-6 text-center opacity-0"
              >
                <div className="font-exo font-bold text-4xl md:text-5xl text-indigo-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-exo font-bold text-4xl md:text-5xl text-white mb-4">
              What I <span className="text-gradient">Love To Do</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive DevOps and cloud services to streamline your
              development workflow and infrastructure management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card glass rounded-2xl p-6 group hover:border-indigo-500/30 transition-all duration-300 opacity-0"
              >
                <div className="w-14 h-14 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4 group-hover:bg-indigo-500/30 transition-colors">
                  <service.icon className="text-indigo-400" size={28} />
                </div>
                <h3 className="font-exo font-semibold text-xl text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <Globe className="mx-auto text-indigo-400 mb-6" size={48} />
              <h2 className="font-exo font-bold text-3xl md:text-4xl text-white mb-4">
                Ready to Scale Your Infrastructure?
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Let's discuss how I can help you build robust, scalable, and
                secure cloud infrastructure for your applications.
              </p>
              <Link
                to="/contact"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="btn-magnetic inline-flex px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-medium items-center gap-2"
              >
                Start a Conversation
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
