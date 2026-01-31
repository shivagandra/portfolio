import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Cloud,
  Container,
  GitBranch,
  Server,
  Shield,
  Code,
  Settings,
  Monitor,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      title: "Cloud Platforms",
      icon: Cloud,
      description: "Expert in AWS cloud services and architecture",
      skills: [
        { name: "AWS EC2", level: 90 },
        { name: "AWS S3", level: 85 },
        { name: "AWS Lambda", level: 80 },
        { name: "CloudFormation", level: 85 },
        { name: "AWS IAM", level: 88 },
        { name: "VPC & Networking", level: 82 },
        { name: "Route 53", level: 78 },
        { name: "CloudWatch", level: 85 },
      ],
    },
    {
      title: "Containers & Orchestration",
      icon: Container,
      description: "Containerization and Kubernetes expertise",
      skills: [
        { name: "Docker", level: 90 },
        { name: "Kubernetes", level: 85 },
        { name: "Amazon ECS", level: 82 },
        { name: "Amazon EKS", level: 78 },
        { name: "Docker Compose", level: 88 },
        //{ name: 'Helm', level: 75 },
      ],
    },
    {
      title: "CI/CD & Automation",
      icon: GitBranch,
      description: "Building efficient deployment pipelines",
      skills: [
        { name: "Jenkins", level: 88 },
        { name: "GitHub Actions", level: 85 },
        { name: "AWS CodePipeline", level: 82 },
        //{ name: 'ArgoCD', level: 78 },
        { name: "GitLab CI", level: 75 },
      ],
    },
    {
      title: "Infrastructure as Code",
      icon: Server,
      description: "Automating infrastructure provisioning",
      skills: [
        { name: "Terraform", level: 90 },
        { name: "AWS CloudFormation", level: 85 },
        { name: "Ansible", level: 78 },
        //{ name: 'Pulumi', level: 70 },
      ],
    },
    {
      title: "Monitoring & Observability",
      icon: Monitor,
      description: "Ensuring system reliability and performance",
      skills: [
        { name: "Prometheus", level: 82 },
        //{ name: 'Grafana', level: 85 },
        { name: "AWS CloudWatch", level: 88 },
        { name: "ELK Stack", level: 75 },
        //{ name: 'Datadog', level: 70 },
      ],
    },
    {
      title: "Security & Compliance",
      icon: Shield,
      description: "Implementing DevSecOps practices",
      skills: [
        { name: "AWS IAM", level: 88 },
        { name: "VPC Security", level: 85 },
        { name: "SSL/TLS", level: 82 },
        { name: "Secrets Management", level: 80 },
        { name: "Compliance", level: 75 },
      ],
    },
  ];

  const programmingSkills = [
    { name: "Python", level: 90 },
    { name: "Java", level: 88 },
    { name: "Bash/Shell", level: 85 },
    { name: "JavaScript/TypeScript", level: 80 },
    { name: "YAML/JSON", level: 90 },
    { name: "HCL (Terraform)", level: 88 },
    { name: "SQL", level: 85 },
    //{ name: 'Go', level: 65 },
  ];

  const tools = [
    "Git",
    "GitHub",
    "GitLab",
    "Bitbucket",
    "Jira",
    "Confluence",
    "VS Code",
    "IntelliJ",
    "Postman",
    "Docker Desktop",
    "kubectl",
    "AWS CLI",
    "Terraform CLI",
    "Ansible",
    "Vagrant",
    "VirtualBox",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-category",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      // Animate progress bars
      gsap.utils.toArray<HTMLElement>(".progress-bar").forEach((bar) => {
        const width = bar.dataset.level;
        gsap.fromTo(
          bar,
          { width: 0 },
          {
            width: `${width}%`,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-exo font-bold text-4xl md:text-5xl text-white mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit built through years of hands-on experience
            in DevOps, Cloud Computing, and Software Development.
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-category glass rounded-2xl p-6 opacity-0"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <category.icon className="text-indigo-400" size={24} />
                </div>
                <div>
                  <h3 className="font-exo font-semibold text-xl text-white">
                    {category.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {category.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-indigo-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="progress-bar h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full"
                        data-level={skill.level}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Programming Languages */}
        <div className="glass rounded-2xl p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Code className="text-purple-400" size={24} />
            </div>
            <div>
              <h3 className="font-exo font-semibold text-xl text-white">
                Programming Languages
              </h3>
              <p className="text-gray-500 text-sm">
                Languages I use for automation and development
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {programmingSkills.map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{skill.name}</span>
                  <span className="text-purple-400">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="progress-bar h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                    data-level={skill.level}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="glass rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Settings className="text-green-400" size={24} />
            </div>
            <div>
              <h3 className="font-exo font-semibold text-xl text-white">
                Tools & Platforms
              </h3>
              <p className="text-gray-500 text-sm">
                Daily drivers for development and operations
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {tools.map((tool, i) => (
              <span
                key={i}
                className="px-4 py-2 glass rounded-lg text-sm text-gray-300 hover:bg-indigo-500/20 hover:text-white transition-all cursor-default"
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
