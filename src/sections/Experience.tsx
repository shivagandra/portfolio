import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      company: 'Tata Consultancy Services Limited',
      role: 'Development Analyst',
      period: 'June 2024 – Present',
      location: 'Kolkata, West Bengal',
      description: 'Supported team in maintaining and fine-tuning TCS Bancs software, leveraging advanced Java skills to efficiently investigate, diagnose, and resolve system faults.',
      achievements: [
        'Collaborated in cross-functional teams to investigate and resolve complex software faults',
        'Utilized advanced full-stack development techniques with emphasis on Java frameworks',
        'Engineered and optimized core components using Java and SQL for scalable backend services',
        'Proactively identified, diagnosed, and mitigated potential issues impacting user experience',
      ],
    },
    {
      company: 'Safertek Software LLC',
      role: 'DevOps Engineering Intern',
      period: 'Nov 2023 – March 2024',
      location: 'Hyderabad, Telangana',
      description: 'Streamlined development and deployment processes through innovative DevOps practices, leveraging cloud technologies and automation.',
      achievements: [
        'Designed cloud infrastructure automation using AWS services (EC2, CloudFormation, Lambda)',
        'Developed automation scripts using Shell for systematic project development',
        'Implemented CI/CD pipelines using AWS CodePipeline and CodeBuild',
        'Utilized AWS CloudWatch for monitoring and logging application performance',
      ],
    },
    {
      company: 'Samsung R&D Institute India',
      role: 'Research Intern',
      period: 'Sept 2022 – Mar 2023',
      location: 'Remote (Bangalore, India)',
      description: 'Built a Machine Learning model for predictive maintenance of IoT Devices based on noise produced.',
      achievements: [
        'Designed experiments comparing ML algorithms, improving efficiency by 30%',
        'Implemented Federated Machine Learning frameworks like Flower using gRPC',
        'Developed secure data transfer protocols for distributed learning',
        'Optimized predictive maintenance model for IoT devices',
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line draw animation
      gsap.fromTo(
        timelineRef.current,
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Cards 3D flip animation
      const cards = cardsRef.current?.querySelectorAll('.experience-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, rotateY: index % 2 === 0 ? -45 : 45, transformOrigin: index % 2 === 0 ? 'right center' : 'left center' },
          {
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });

      // Pulse animation on timeline
      gsap.to('.timeline-pulse', {
        opacity: 1,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-exo font-bold text-4xl md:text-5xl text-white mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My professional journey through impactful roles in software development and cloud engineering.
          </p>
        </div>

        {/* Timeline */}
        <div ref={cardsRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 timeline-line transform md:-translate-x-1/2">
            <div
              ref={timelineRef}
              className="absolute inset-0 bg-gradient-to-b from-indigo-500 via-indigo-400 to-indigo-500"
              style={{ transformOrigin: 'top' }}
            />
          </div>

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`experience-card relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-start md:items-center gap-8 opacity-0`}
                style={{ perspective: '1000px' }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-void z-10">
                  <div className="timeline-pulse absolute inset-0 rounded-full bg-indigo-400 opacity-0" />
                </div>

                {/* Card */}
                <div
                  className={`ml-12 md:ml-0 md:w-[45%] ${
                    index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                  }`}
                >
                  <div className="glass rounded-2xl p-6 card-3d group hover:border-indigo-500/50 transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-exo font-bold text-xl text-white group-hover:text-indigo-400 transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-400 mt-1">
                          <Building2 size={16} />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4">{exp.description}</p>

                    {/* Achievements */}
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
