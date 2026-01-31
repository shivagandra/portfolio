import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Cloud, 
  Server, 
  Container, 
  GitBranch, 
  Shield, 
  Database,
  Code,
  Terminal,
  Cpu,
  Workflow
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const expertise = [
    {
      icon: Cloud,
      title: 'AWS Cloud',
      items: ['EC2', 'S3', 'Lambda', 'CloudFormation', 'CodePipeline', 'CloudWatch'],
    },
    {
      icon: Container,
      title: 'Containers',
      items: ['Docker', 'Kubernetes', 'ECS', 'EKS', 'Container Registry'],
    },
    {
      icon: GitBranch,
      title: 'CI/CD',
      items: ['Jenkins', 'GitHub Actions', 'AWS CodeBuild', 'ArgoCD'],
    },
    {
      icon: Server,
      title: 'Infrastructure',
      items: ['Terraform', 'Ansible', 'CloudFormation', 'Pulumi'],
    },
    {
      icon: Shield,
      title: 'Security',
      items: ['IAM', 'VPC', 'WAF', 'Secrets Management', 'SSL/TLS'],
    },
    {
      icon: Database,
      title: 'Databases',
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'DynamoDB', 'RDS'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-content',
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

      gsap.fromTo('.expertise-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.expertise-grid',
            start: 'top 80%',
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
        <div className="about-content text-center mb-16 opacity-0">
          <h1 className="font-exo font-bold text-4xl md:text-5xl text-white mb-6">
            About <span className="text-gradient">Me</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            I'm a passionate DevOps Engineer and Cloud Architect with expertise in building 
            scalable, automated infrastructure solutions. My journey in tech has been driven by 
            a curiosity to solve complex problems and create efficient, reliable systems.
          </p>
        </div>

        {/* Profile Section */}
        <div className="about-content grid md:grid-cols-2 gap-12 items-center mb-20 opacity-0">
          <div className="glass rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                <Terminal className="text-indigo-400" size={32} />
              </div>
              <div>
                <h3 className="font-exo font-bold text-2xl text-white">Current Role</h3>
                <p className="text-indigo-400">Development Analyst at TCS</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Currently working with TCS Bancs software, leveraging advanced Java skills 
              to investigate, diagnose, and resolve system faults while maintaining high 
              availability and performance.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Java', 'SQL', 'AWS', 'DevOps'].map((tech) => (
                <span key={tech} className="px-3 py-1 text-xs bg-indigo-500/10 text-indigo-300 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Workflow className="text-green-400" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-white">Automation First</h4>
                <p className="text-gray-400 text-sm">Infrastructure as Code advocate</p>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Cpu className="text-blue-400" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-white">Cloud Native</h4>
                <p className="text-gray-400 text-sm">Building scalable cloud solutions</p>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Code className="text-purple-400" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-white">Full Stack Mindset</h4>
                <p className="text-gray-400 text-sm">Understanding from code to deployment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise Section */}
        <div className="mb-12">
          <h2 className="font-exo font-bold text-3xl text-white text-center mb-12">
            Technical <span className="text-gradient">Expertise</span>
          </h2>
          
          <div className="expertise-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item, index) => (
              <div
                key={index}
                className="expertise-card glass rounded-2xl p-6 opacity-0"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                    <item.icon className="text-indigo-400" size={20} />
                  </div>
                  <h3 className="font-exo font-semibold text-lg text-white">
                    {item.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.items.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-white/5 text-gray-400 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="glass rounded-3xl p-8 md:p-12 text-center">
          <h2 className="font-exo font-bold text-2xl md:text-3xl text-white mb-4">
            My Philosophy
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            "Infrastructure should be treated as code, deployments should be automated, 
            and systems should be self-healing. I believe in building resilient, 
            observable, and scalable systems that enable teams to deliver value faster."
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
