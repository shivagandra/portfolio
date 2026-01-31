import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Cloud, Award, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const quickFacts = [
    { icon: Briefcase, label: 'Years Experience', value: '3+' },
    { icon: Code2, label: 'Projects Completed', value: '10+' },
    { icon: Cloud, label: 'Cloud Certifications', value: '5' },
    { icon: Award, label: 'AWS Certified', value: 'Pro' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        {
          opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Text reveal
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="font-exo font-bold text-4xl md:text-5xl text-white mb-6 opacity-0"
          >
            About <span className="text-gradient">Me</span>
          </h2>
          <p
            ref={textRef}
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed opacity-0"
          >
            I'm a passionate software developer with expertise in building scalable applications 
            and cloud infrastructure. My journey in tech has been driven by a curiosity to solve 
            complex problems and create meaningful digital experiences. Currently working as a 
            Development Analyst at Tata Consultancy Services, I specialize in Java, cloud technologies, 
            and DevOps practices.
          </p>
        </div>

        {/* Quick Facts Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {quickFacts.map((fact, index) => (
            <div
              key={index}
              className="glass glass-hover rounded-2xl p-6 text-center group cursor-default opacity-0"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <fact.icon className="text-indigo-400" size={24} />
              </div>
              <div className="font-exo font-bold text-3xl text-white mb-1">
                {fact.value}
              </div>
              <div className="text-sm text-gray-400">{fact.label}</div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mt-16 glass rounded-2xl p-8">
          <h3 className="font-exo font-bold text-2xl text-white mb-6">Education</h3>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-xl text-white">K L University</h4>
              <p className="text-gray-400">Bachelor of Technology in Computer Science</p>
              <p className="text-indigo-400 text-sm mt-1">GPA: 9.19 / 10.00</p>
            </div>
            <div className="text-right">
              <span className="text-gray-400">May 2024</span>
              <p className="text-gray-500 text-sm">Vijayawada, Andhra Pradesh</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Data Structures', 'AI for Data Science', 'Cloud DevOps', 'Flutter & Kotlin', 'Java', 'Database Management'].map((course) => (
              <span
                key={course}
                className="px-3 py-1 text-xs bg-indigo-500/10 text-indigo-300 rounded-full border border-indigo-500/20"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
