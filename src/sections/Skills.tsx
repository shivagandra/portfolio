import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      title: 'Languages',
      skills: ['Python', 'JavaScript', 'C++', 'Java', 'Kotlin', 'Dart', 'SQL'],
    },
    {
      title: 'Technologies',
      skills: ['Flutter', 'Node.js', 'Django', 'MongoDB', 'MySQL', 'Docker', 'Kubernetes', 'Jenkins'],
    },
    {
      title: 'Cloud & DevOps',
      skills: ['AWS', 'GitHub Actions', 'Docker', 'Kubernetes', 'Jenkins', 'Linux', 'Shell Scripting'],
    },
    {
      title: 'Concepts',
      skills: ['Data Structures', 'Agile', 'Scrum', 'Cloud Computing', 'CI/CD', 'Microservices'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SVG path draw animation
      const paths = svgRef.current?.querySelectorAll('path');
      paths?.forEach((path) => {
        const length = (path as SVGPathElement).getTotalLength?.() || 100;
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        });
      });

      // Tags pop-in animation
      gsap.fromTo(
        tagsRef.current?.querySelectorAll('.skill-tag') || [],
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.03,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: tagsRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-exo font-bold text-4xl md:text-5xl text-white mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit built through years of hands-on experience and continuous learning.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="relative">
          {/* Background Network SVG */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
            viewBox="0 0 800 400"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Network lines */}
            <path
              d="M100,100 Q200,50 300,100 T500,100 T700,150"
              fill="none"
              stroke="#6366f1"
              strokeWidth="1"
            />
            <path
              d="M50,200 Q150,150 250,200 T450,180 T650,220"
              fill="none"
              stroke="#6366f1"
              strokeWidth="1"
            />
            <path
              d="M100,300 Q200,250 300,300 T500,280 T700,320"
              fill="none"
              stroke="#6366f1"
              strokeWidth="1"
            />
            <path
              d="M200,50 L200,350"
              fill="none"
              stroke="#6366f1"
              strokeWidth="0.5"
            />
            <path
              d="M400,50 L400,350"
              fill="none"
              stroke="#6366f1"
              strokeWidth="0.5"
            />
            <path
              d="M600,50 L600,350"
              fill="none"
              stroke="#6366f1"
              strokeWidth="0.5"
            />
          </svg>

          {/* Skills Categories */}
          <div ref={tagsRef} className="grid md:grid-cols-2 gap-8 relative z-10">
            {skillCategories.map((category, catIndex) => (
              <div
                key={catIndex}
                className="glass rounded-2xl p-6"
              >
                <h3 className="font-exo font-semibold text-xl text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="skill-tag px-4 py-2 text-sm text-gray-300 bg-white/5 border border-white/10 rounded-full cursor-default opacity-0"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Programming Languages', value: '7+' },
            { label: 'Frameworks & Tools', value: '15+' },
            { label: 'Cloud Platforms', value: '3' },
            { label: 'Certifications', value: '5' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-exo font-bold text-4xl text-indigo-400 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
