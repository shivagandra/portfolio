import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award, 
  BookOpen, 
  Code, 
  Cloud, 
  Database,
  Cpu,
  Star
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const education = {
    university: 'K L University',
    degree: 'Bachelor of Technology in Computer Science',
    period: '2020 - 2024',
    location: 'Vijayawada, Andhra Pradesh',
    gpa: '9.19 / 10.00',
    achievements: [
      'Graduated with First Class Honors',
      'Google Cloud & Flutter Lead at GDSC',
      'Peer Mentor for CSE Department',
      'Active participant in hackathons and coding competitions',
    ],
  };

  const coursework = [
    { name: 'Data Structures and Algorithms', icon: Code, category: 'Core' },
    { name: 'Object Oriented Programming (Java)', icon: Code, category: 'Core' },
    { name: 'Database Management Systems', icon: Database, category: 'Core' },
    { name: 'AI for Data Science', icon: Cpu, category: 'AI/ML' },
    { name: 'Cloud Computing', icon: Cloud, category: 'Cloud' },
    { name: 'DevOps & Continuous Delivery', icon: Cloud, category: 'DevOps' },
    { name: 'Cross Platform Development (Flutter)', icon: Code, category: 'Mobile' },
    { name: 'Data Engineering', icon: Database, category: 'Data' },
    { name: 'Software Engineering', icon: BookOpen, category: 'Core' },
    { name: 'Computer Networks', icon: Cloud, category: 'Core' },
    { name: 'Operating Systems', icon: Cpu, category: 'Core' },
    { name: 'Web Technologies', icon: Code, category: 'Web' },
  ];

  const certifications = [
    {
      name: 'AWS Certified DevOps Engineer',
      level: 'Professional',
      issuer: 'Amazon Web Services',
      date: '2024',
    },
    {
      name: 'AWS Certified Developer',
      level: 'Associate',
      issuer: 'Amazon Web Services',
      date: '2023',
    },
    {
      name: 'EPAM Cloud & DevOps',
      level: 'Associate',
      issuer: 'EPAM Systems',
      date: '2023',
    },
    {
      name: 'RedHat Certified Enterprise Application Developer',
      level: 'Professional',
      issuer: 'Red Hat',
      date: '2023',
    },
    {
      name: 'Aviatrix Multi-Cloud Networking',
      level: 'Associate',
      issuer: 'Aviatrix',
      date: '2023',
    },
  ];

  const extracurricular = [
    {
      role: 'Google Cloud & Flutter Lead',
      organization: 'Google Developer Student Clubs (GDSC)',
      description: 'Led workshops and mentored students on Google Cloud Platform and Flutter development.',
    },
    {
      role: 'Peer Mentor',
      organization: 'K L University - CSE Department',
      description: 'Supported students to enhance self-learning skills and guided them through technical projects.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.education-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.course-tag',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.03,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.courses-grid',
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo('.cert-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.certs-grid',
            start: 'top 85%',
          }
        }
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
            Education & <span className="text-gradient">Certifications</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My academic journey and professional certifications that shaped my expertise 
            in DevOps and Cloud Computing.
          </p>
        </div>

        {/* Main Education Card */}
        <div className="education-card glass rounded-3xl p-8 md:p-12 mb-12 opacity-0">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {/* Left - Icon & Basic Info */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-4">
                <GraduationCap className="text-indigo-400" size={40} />
              </div>
            </div>

            {/* Right - Details */}
            <div className="flex-1">
              <h2 className="font-exo font-bold text-3xl text-white mb-2">
                {education.university}
              </h2>
              <h3 className="text-xl text-indigo-400 mb-4">
                {education.degree}
              </h3>

              <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {education.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {education.location}
                </span>
                <span className="flex items-center gap-1">
                  <Award size={16} />
                  GPA: {education.gpa}
                </span>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3">Achievements</h4>
                <ul className="space-y-2">
                  {education.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-400">
                      <Star size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Coursework */}
        <div className="mb-12">
          <h2 className="font-exo font-bold text-2xl text-white mb-6 flex items-center gap-3">
            <BookOpen className="text-indigo-400" size={28} />
            Relevant Coursework
          </h2>
          
          <div className="courses-grid flex flex-wrap gap-3">
            {coursework.map((course, i) => (
              <div
                key={i}
                className="course-tag px-4 py-3 glass rounded-xl flex items-center gap-3 hover:bg-indigo-500/10 transition-colors cursor-default opacity-0"
              >
                <course.icon size={18} className="text-indigo-400" />
                <div>
                  <span className="text-gray-300 text-sm">{course.name}</span>
                  <span className="block text-xs text-gray-500">{course.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Certifications */}
        <div className="mb-12">
          <h2 className="font-exo font-bold text-2xl text-white mb-6 flex items-center gap-3">
            <Award className="text-indigo-400" size={28} />
            Professional Certifications
          </h2>
          
          <div className="certs-grid grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="cert-card glass rounded-xl p-5 hover:border-indigo-500/30 transition-all opacity-0"
              >
                <div className="flex items-start justify-between mb-3">
                  <Award className="text-indigo-400" size={24} />
                  <span className="text-xs text-gray-500">{cert.date}</span>
                </div>
                <h4 className="font-semibold text-white mb-1">{cert.name}</h4>
                <p className="text-indigo-400 text-sm mb-1">{cert.level}</p>
                <p className="text-gray-500 text-xs">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Extracurricular */}
        <div>
          <h2 className="font-exo font-bold text-2xl text-white mb-6 flex items-center gap-3">
            <Star className="text-indigo-400" size={28} />
            Extracurricular Activities
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {extracurricular.map((activity, i) => (
              <div
                key={i}
                className="glass rounded-xl p-6"
              >
                <h4 className="font-semibold text-white mb-1">{activity.role}</h4>
                <p className="text-indigo-400 text-sm mb-3">{activity.organization}</p>
                <p className="text-gray-400 text-sm">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
