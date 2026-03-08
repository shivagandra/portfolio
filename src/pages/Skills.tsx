import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BarChart3, Sparkles } from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  learningNow,
  skillDomains,
  skillRadarData,
  toolHighlights,
} from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeDomainId, setActiveDomainId] = useState(skillDomains[0].id);

  const activeDomain = useMemo(
    () => skillDomains.find((domain) => domain.id === activeDomainId) ?? skillDomains[0],
    [activeDomainId],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".domain-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: "power3.out",
        },
      );

      gsap.utils.toArray<HTMLElement>(".skill-progress").forEach((bar) => {
        const targetWidth = Number(bar.dataset.level ?? "0");
        gsap.fromTo(
          bar,
          { width: 0 },
          {
            width: `${targetWidth}%`,
            duration: 0.75,
            ease: "power2.out",
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeDomainId]);

  return (
    <div ref={sectionRef} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="font-exo font-bold text-4xl md:text-5xl text-white mb-4">
            Skill <span className="text-gradient">Intelligence</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            A domain-by-domain view of technical depth with practical project
            context and growth areas.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 mb-10">
          <div className="lg:col-span-3 glass rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-2 text-indigo-300 mb-4">
              <BarChart3 size={18} />
              <span className="text-sm uppercase tracking-wide">
                Capability Radar
              </span>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillRadarData}>
                  <PolarGrid stroke="rgba(255, 255, 255, 0.15)" />
                  <PolarAngleAxis
                    dataKey="area"
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />
                  <Radar
                    name="Skill"
                    dataKey="score"
                    stroke="#818cf8"
                    fill="#6366f1"
                    fillOpacity={0.45}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#11131f",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-2 glass rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-2 text-indigo-300 mb-4">
              <Sparkles size={18} />
              <span className="text-sm uppercase tracking-wide">
                Currently Learning
              </span>
            </div>
            <ul className="space-y-3">
              {learningNow.map((item) => (
                <li
                  key={item}
                  className="text-sm text-gray-300 p-3 rounded-lg bg-white/5 border border-white/10"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-1 space-y-3">
            {skillDomains.map((domain) => (
              <button
                key={domain.id}
                onClick={() => setActiveDomainId(domain.id)}
                className={`domain-card w-full text-left rounded-xl p-4 border transition-all ${
                  activeDomain.id === domain.id
                    ? "bg-indigo-500/20 border-indigo-500/40"
                    : "bg-white/5 border-white/10 hover:border-indigo-500/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                    <domain.icon className="text-indigo-300" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-white">{domain.title}</p>
                    <p className="text-xs text-gray-400">{domain.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 glass rounded-2xl p-6 border border-white/5">
            <h2 className="font-exo font-semibold text-2xl text-white mb-1">
              {activeDomain.title}
            </h2>
            <p className="text-gray-400 text-sm mb-6">{activeDomain.description}</p>

            <div className="space-y-4">
              {activeDomain.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <div>
                      <span className="text-gray-200">{skill.name}</span>
                      <span className="text-gray-500 ml-2">({skill.context})</span>
                    </div>
                    <span className="text-indigo-300">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="skill-progress h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-300"
                      data-level={skill.level}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-8 border border-white/5">
          <h2 className="font-exo font-semibold text-2xl text-white mb-2">
            Tools & Daily Workflow Stack
          </h2>
          <p className="text-gray-400 text-sm mb-5">
            Core tools used for cloud operations, debugging, delivery, and
            collaboration.
          </p>

          <div className="flex flex-wrap gap-2.5">
            {toolHighlights.map((tool) => (
              <span
                key={tool}
                className="px-3 py-2 rounded-lg text-sm text-gray-300 bg-white/5 border border-white/10"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
