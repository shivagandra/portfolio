import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      company: 'Tata Consultancy Services Limited',
      role: 'Development Analyst',
      period: 'June 2024 – Present',
      location: 'Kolkata, West Bengal',
      type: 'Full-time',
      description: 'Supporting team in maintaining and fine-tuning TCS Bancs software, leveraging advanced Java skills to efficiently investigate, diagnose, and resolve system faults.',
      achievements: [
        'Collaborated in cross-functional teams to investigate and resolve complex software faults',
        'Utilized advanced full-stack development techniques with emphasis on Java frameworks',
        'Engineered and optimized core components using Java and SQL for scalable backend services',
        'Proactively identified, diagnosed, and mitigated potential issues impacting user experience',
        'Maintained 99.9% system uptime through proactive monitoring and maintenance',
      ],
      technologies: ['Java', 'Spring Boot', 'SQL', 'Oracle', 'Git', 'Jenkins'],
    },
    {
      company: 'Safertek Software LLC',
      role: 'DevOps Engineering Intern',
      period: 'Nov 2023 – March 2024',
      location: 'Hyderabad, Telangana',
      type: 'Internship',
      description: 'Streamlined development and deployment processes through innovative DevOps practices, leveraging cloud technologies and automation.',
      achievements: [
        'Designed cloud infrastructure automation using AWS services (EC2, CloudFormation, Lambda)',
        'Developed automation scripts using Shell for systematic project development',
        'Implemented CI/CD pipelines using AWS CodePipeline and CodeBuild',
        'Utilized AWS CloudWatch for monitoring and logging application performance',
        'Reduced deployment time by 60% through automation implementation',
      ],
      technologies: ['AWS', 'CloudFormation', 'Lambda', 'CodePipeline', 'Shell', 'Docker'],
    },
    {
      company: 'Samsung R&D Institute India',
      role: 'Research Intern',
      period: 'Sept 2022 – Mar 2023',
      location: 'Remote (Bangalore, India)',
      type: 'Internship',
      description: 'Built a Machine Learning model for predictive maintenance of IoT Devices based on noise produced.',
      achievements: [
        'Designed experiments comparing ML algorithms, improving efficiency by 30%',
        'Implemented Federated Machine Learning frameworks like Flower using gRPC',
        'Developed secure data transfer protocols for distributed learning',
        'Optimized predictive maintenance model for IoT devices',
        'Published research findings in internal Samsung technical review',
      ],
      technologies: ['Python', 'TensorFlow', 'Flower', 'gRPC', 'AWS', 'ML'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.experience-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-exo font-bold text-4xl md:text-5xl text-white mb-4">
            Work <span className="text-gradient">Experience</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My professional journey through impactful roles in software development, 
            cloud engineering, and research.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 timeline-line transform md:-translate-x-1/2" />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`experience-card relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-start md:items-center gap-8 opacity-0`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-void z-10">
                  <div className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-50" />
                </div>

                {/* Card */}
                <div
                  className={`ml-12 md:ml-0 md:w-[48%] ${
                    index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                  }`}
                >
                  <div className="glass rounded-2xl p-6 md:p-8 group hover:border-indigo-500/30 transition-all duration-300">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-exo font-bold text-xl text-white group-hover:text-indigo-400 transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-400 mt-1">
                          <Building2 size={16} />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 text-xs bg-indigo-500/10 text-indigo-300 rounded-full">
                        {exp.type}
                      </span>
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
                    <p className="text-gray-400 mb-4">{exp.description}</p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white mb-2">Key Achievements</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-300"
                          >
                            <CheckCircle2 size={16} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-white/5 text-gray-400 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
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
