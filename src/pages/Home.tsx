import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Server, Zap } from "lucide-react";
import { getImagePath } from "@/lib/image";
import {
  currentFocus,
  homeServices,
  homeStats,
  impactHighlights,
  roleRotation,
  stackPillars,
  type HomeStat,
} from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const formatStatValue = (stat: HomeStat, value: number) =>
  `${stat.prefix ?? ""}${Math.round(value)}${stat.suffix ?? ""}`;

const AnimatedStat = ({ stat, start }: { stat: HomeStat; start: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frameId = 0;
    const duration = 1100;
    const startTime = performance.now();

    const update = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(stat.value * eased);
      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      }
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [start, stat.value]);

  return (
    <div className="stat-item glass rounded-2xl p-6 text-center opacity-0">
      <div className="font-exo font-bold text-4xl md:text-5xl text-indigo-400 mb-2">
        {formatStatValue(stat, count)}
      </div>
      <div className="text-gray-400 text-sm">{stat.label}</div>
    </div>
  );
};

const Home = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [countStart, setCountStart] = useState(false);

  const rotatingRole = useMemo(
    () => roleRotation[roleIndex % roleRotation.length],
    [roleIndex],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((previous) => (previous + 1) % roleRotation.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".stat-item",
        { opacity: 0, scale: 0.82 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.58,
          stagger: 0.08,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 82%",
          },
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      <section className="relative min-h-[90vh] flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left order-2 md:order-1">
              <div className="hero-fade inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <Zap className="text-yellow-400" size={16} />
                <span className="text-sm text-gray-300">
                  AWS Certified DevOps Engineer - Professional
                </span>
              </div>

              <h1 className="hero-fade font-exo font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-relaxed">
                DevOps &
                <br />
                <span className="text-gradient">Cloud Engineer</span>
              </h1>

              <div className="hero-fade mb-3 h-14 md:h-12 overflow-hidden">
                <p className="text-xl md:text-2xl text-gray-400 max-w-xl leading-relaxed">
                  {rotatingRole}
                </p>
              </div>
              <p className="hero-fade text-base md:text-lg text-gray-400 mb-8 max-w-xl">
                Building scalable infrastructure, automated deployments, and
                reliable cloud platforms for modern engineering teams.
              </p>

              <div className="hero-fade flex flex-wrap gap-4 mb-10">
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
                  Start Collaboration
                </Link>
              </div>

              <div className="hero-fade flex flex-wrap gap-3">
                {stackPillars.map((pillar) => (
                  <span
                    key={pillar.label}
                    className="px-4 py-2 glass rounded-lg text-sm text-gray-300 flex items-center gap-2"
                  >
                    <pillar.icon size={14} className="text-indigo-400" />
                    {pillar.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative order-1 md:order-2 flex justify-center md:justify-end">
              <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-3xl animate-pulse-glow" />
              <div className="relative z-10">
                <img
                  src={getImagePath("IMG_SHIVA.JPG")}
                  alt="Shiva Krishna portrait" width={384} height={384}
                  className="w-72 h-72 md:w-96 md:h-96 rounded-full object-cover border-4 border-indigo-500/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {homeStats.map((stat) => (
              <AnimatedStat key={stat.label} stat={stat} start={countStart} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-exo font-bold text-3xl text-white mb-8 text-center">
            Delivery <span className="text-gradient">Impact</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {impactHighlights.map((item) => (
              <div
                key={item.title}
                className="glass rounded-2xl p-5 border border-white/5"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
                  <item.icon size={20} />
                </div>
                <p className="text-white font-semibold">{item.title}</p>
                <p className="text-indigo-300 text-lg font-exo font-bold mb-2">
                  {item.value}
                </p>
                <p className="text-gray-400 text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={servicesRef} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-exo font-bold text-4xl md:text-5xl text-white mb-4">
              Core <span className="text-gradient">Capabilities</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              End-to-end ownership from infrastructure design to delivery
              automation and production reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeServices.map((service) => (
              <div
                key={service.title}
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

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6 text-indigo-300">
                <Server size={20} />
                <span className="text-sm uppercase tracking-wider">
                  Current Focus
                </span>
              </div>
              <h2 className="font-exo font-bold text-3xl md:text-4xl text-white mb-6">
                Building production-ready platforms with clarity and speed.
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {currentFocus.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-gray-300"
                  >
                    <CheckCircle2 size={16} className="text-indigo-400" />
                    {item}
                  </div>
                ))}
              </div>
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


