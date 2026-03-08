import type { LucideIcon } from "lucide-react";
import {
  Cloud,
  Container,
  GitBranch,
  Shield,
  Database,
  Server,
  Gauge,
  Workflow,
  Sparkles,
  LineChart,
  Code2,
  Cpu,
  Lock,
} from "lucide-react";
import { getImagePath } from "@/lib/image";

export type HomeStat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
};

export type HomeService = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type ImpactHighlight = {
  title: string;
  value: string;
  detail: string;
  icon: LucideIcon;
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  title: string;
  category: "Cloud" | "DevOps" | "AI/ML" | "Full Stack";
  summary: string;
  challenge: string;
  approach: string[];
  outcomes: string[];
  metrics: ProjectMetric[];
  tech: string[];
  image: string;
  year: number;
  github: string;
  live?: string;
};

export type SkillItem = {
  name: string;
  level: number;
  context: string;
};

export type SkillDomain = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  skills: SkillItem[];
};

export const roleRotation = [
  "DevOps Engineer",
  "Cloud Infrastructure Engineer",
  "SRE-Oriented Platform Builder",
  "Automation-First Problem Solver",
];

export const homeStats: HomeStat[] = [
  { label: "Years of Hands-on Experience", value: 2, suffix: "+" },
  { label: "AWS Certifications", value: 5 },
  { label: "Production Projects Delivered", value: 6, suffix: "+" },
  { label: "Deployment Cycle Improvement", value: 60, suffix: "%" },
];

export const homeServices: HomeService[] = [
  {
    icon: Cloud,
    title: "Cloud Architecture",
    description:
      "Designing secure and scalable AWS foundations with reliability and cost in balance.",
  },
  {
    icon: Container,
    title: "Container Platforms",
    description:
      "Building Kubernetes and Docker-based deployments with reproducible environments.",
  },
  {
    icon: GitBranch,
    title: "CI/CD Engineering",
    description:
      "Automating delivery pipelines to reduce manual errors and release lead time.",
  },
  {
    icon: Shield,
    title: "DevSecOps Integration",
    description:
      "Embedding IAM, secrets, and policy checks directly into engineering workflows.",
  },
  {
    icon: Database,
    title: "Observability & Data Ops",
    description:
      "Improving incident response with logs, metrics, and actionable monitoring signals.",
  },
  {
    icon: Server,
    title: "Infrastructure as Code",
    description:
      "Provisioning immutable, auditable infrastructure using Terraform and AWS native tooling.",
  },
];

export const impactHighlights: ImpactHighlight[] = [
  {
    title: "Release Acceleration",
    value: "60% faster",
    detail: "Reduced deployment cycle time with pipeline automation and quality gates.",
    icon: Gauge,
  },
  {
    title: "System Reliability",
    value: "99.9% uptime",
    detail: "Improved stability through monitoring, alerting, and proactive incident handling.",
    icon: LineChart,
  },
  {
    title: "Platform Standardization",
    value: "IaC-first",
    detail: "Moved key infrastructure workflows to declarative and versioned configurations.",
    icon: Workflow,
  },
  {
    title: "Security Posture",
    value: "Shift-left",
    detail: "Added role-based access and secret management practices in delivery pipelines.",
    icon: Lock,
  },
];

export const currentFocus = [
  "AWS Well-Architected migrations",
  "Kubernetes production hardening",
  "Golden-path CI/CD templates",
  "Cost and performance optimization",
];

export const projects: Project[] = [
  {
    id: "federated-iot",
    title: "Federated Learning for IoT Predictive Maintenance",
    category: "AI/ML",
    summary:
      "Designed a decentralized training workflow for IoT predictive maintenance without centralizing sensitive data.",
    challenge:
      "Model quality needed to improve while preserving device privacy and reducing centralized compute dependency.",
    approach: [
      "Implemented federated model orchestration using Flower + gRPC.",
      "Established AWS-backed experiment tracking and reproducible training workflows.",
      "Benchmarked model variants and communication strategies to optimize convergence.",
    ],
    outcomes: [
      "Improved model efficiency by approximately 30% in internal evaluations.",
      "Demonstrated practical privacy-preserving learning architecture for distributed devices.",
      "Created a reusable experimentation baseline for future ML research iterations.",
    ],
    metrics: [
      { label: "Model Efficiency Gain", value: "30%" },
      { label: "Architecture", value: "Federated" },
      { label: "Core Stack", value: "Flower + AWS" },
    ],
    tech: ["Python", "Flower", "gRPC", "TensorFlow", "AWS", "ML Ops"],
    image: getImagePath("project-federated-learning.jpg"),
    year: 2023,
    github: "https://github.com/shivagandra",
  },
  {
    id: "kl-connect",
    title: "KL Connect University Communication Platform",
    category: "Full Stack",
    summary:
      "Built a multi-role communication system for students, parents, and institution stakeholders with secure access flows.",
    challenge:
      "Stakeholders needed real-time updates, role-based interactions, and a maintainable backend API model.",
    approach: [
      "Developed cross-platform UI flows in Flutter with modular feature routing.",
      "Implemented authentication and identity workflows with AWS Cognito.",
      "Designed REST + websocket interactions for notifications and message updates.",
    ],
    outcomes: [
      "Unified parent-student communication into one structured platform.",
      "Reduced manual communication delays through real-time messaging workflows.",
      "Delivered scalable backend integration with clear role boundaries.",
    ],
    metrics: [
      { label: "Architecture", value: "Mobile + API" },
      { label: "Auth Model", value: "AWS Cognito" },
      { label: "Realtime Layer", value: "WebSockets" },
    ],
    tech: ["Flutter", "Node.js", "SQL", "AWS Cognito", "WebSockets", "REST API"],
    image: getImagePath("project-kl-connect.jpg"),
    year: 2023,
    github: "https://github.com/shivagandra/KL-Connect-Application",
  },
  {
    id: "lms-platform",
    title: "Library Management and Notification Platform",
    category: "Full Stack",
    summary:
      "Engineered a management platform for cataloging, payments, and automated borrower communication.",
    challenge:
      "The platform required reliable inventory tracking, secure transactions, and maintainable service boundaries.",
    approach: [
      "Designed Java + Spring Boot services for book lifecycle and user workflows.",
      "Integrated email notifications for due dates and transactional events.",
      "Structured relational storage and query plans for predictable response times.",
    ],
    outcomes: [
      "Enabled operational visibility for lending and user activity flows.",
      "Reduced manual notification effort through automation.",
      "Created a modular backend architecture suitable for incremental feature growth.",
    ],
    metrics: [
      { label: "Backend", value: "Spring Boot" },
      { label: "Data Layer", value: "PostgreSQL" },
      { label: "Automation", value: "Spring Mail" },
    ],
    tech: ["Java", "Spring Boot", "PostgreSQL", "Spring Mail", "AWS"],
    image: getImagePath("project-library.jpg"),
    year: 2022,
    github: "https://github.com/shivagandra/LMS-JFSD",
  },
  {
    id: "deployment-automation",
    title: "AWS Deployment Automation Blueprint",
    category: "DevOps",
    summary:
      "Created reusable CI/CD and infrastructure templates for faster and safer multi-environment releases.",
    challenge:
      "Teams faced inconsistent manual deployments, environment drift, and slow release approvals.",
    approach: [
      "Standardized build, test, and release stages across environments.",
      "Adopted infrastructure definitions for repeatable provisioning.",
      "Added monitoring and alert hooks as a deployment quality gate.",
    ],
    outcomes: [
      "Cut release cycle time by around 60% in internship delivery workflows.",
      "Improved release confidence with consistent environments and checks.",
      "Reduced rollback risk through validation and observability-first practices.",
    ],
    metrics: [
      { label: "Cycle Time Reduction", value: "60%" },
      { label: "Pipeline Style", value: "Template-driven" },
      { label: "Primary Cloud", value: "AWS" },
    ],
    tech: ["AWS CodePipeline", "CodeBuild", "CloudFormation", "Shell", "Docker"],
    image: getImagePath("project-federated-learning.jpg"),
    year: 2024,
    github: "https://github.com/shivagandra",
  },
];

export const skillDomains: SkillDomain[] = [
  {
    id: "cloud",
    title: "Cloud Engineering",
    description: "Designing secure, scalable AWS environments and workloads.",
    icon: Cloud,
    skills: [
      { name: "AWS EC2 / VPC", level: 90, context: "Compute + network design" },
      { name: "S3 / Route53 / CloudFront", level: 86, context: "Storage + edge delivery" },
      { name: "Lambda / Serverless", level: 82, context: "Event-driven workloads" },
      { name: "CloudFormation", level: 85, context: "AWS native IaC" },
      { name: "CloudWatch", level: 88, context: "Monitoring and alerts" },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Delivery",
    description: "Automating quality checks and production deployments.",
    icon: GitBranch,
    skills: [
      { name: "Jenkins", level: 88, context: "Pipeline orchestration" },
      { name: "GitHub Actions", level: 85, context: "CI automation" },
      { name: "AWS CodePipeline", level: 82, context: "Managed CD workflows" },
      { name: "GitOps Practices", level: 76, context: "Declarative release patterns" },
      { name: "Release Strategy", level: 80, context: "Rollback and validation design" },
    ],
  },
  {
    id: "containers",
    title: "Containers & Platforms",
    description: "Running resilient containerized systems in production-style environments.",
    icon: Container,
    skills: [
      { name: "Docker", level: 90, context: "Containerized packaging" },
      { name: "Kubernetes", level: 85, context: "Orchestration and scaling" },
      { name: "Amazon ECS/EKS", level: 80, context: "Managed container platforms" },
      { name: "Image Optimization", level: 78, context: "Build efficiency" },
      { name: "Runtime Debugging", level: 77, context: "Production incident support" },
    ],
  },
  {
    id: "engineering",
    title: "Software Engineering",
    description: "Building and supporting backend-centric production systems.",
    icon: Code2,
    skills: [
      { name: "Java", level: 88, context: "Core backend implementation" },
      { name: "Python", level: 90, context: "Automation and tooling" },
      { name: "SQL", level: 85, context: "Data access and optimization" },
      { name: "TypeScript", level: 80, context: "Modern frontend tooling" },
      { name: "Shell Scripting", level: 84, context: "Ops automation" },
    ],
  },
];

export const skillRadarData = [
  { area: "Cloud", score: 88 },
  { area: "DevOps", score: 86 },
  { area: "Containers", score: 84 },
  { area: "Automation", score: 89 },
  { area: "Security", score: 81 },
  { area: "Backend", score: 85 },
];

export const learningNow = [
  "Certified Kubernetes Administrator (CKA) preparation",
  "Advanced Terraform module design patterns",
  "SRE-aligned incident and error-budget practices",
];

export const quickNavLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Experience", path: "/experience" },
  { label: "Projects", path: "/projects" },
  { label: "Skills", path: "/skills" },
  { label: "Education", path: "/education" },
  { label: "Certifications", path: "/certifications" },
  { label: "Contact", path: "/contact" },
];

export const toolHighlights = [
  "Terraform",
  "Docker",
  "Kubernetes",
  "Jenkins",
  "GitHub Actions",
  "AWS CLI",
  "Prometheus",
  "ELK Stack",
  "Postman",
  "Jira",
];

export const stackPillars = [
  { label: "Cloud", icon: Cloud },
  { label: "Automation", icon: Sparkles },
  { label: "Reliability", icon: LineChart },
  { label: "Security", icon: Lock },
  { label: "Platforms", icon: Cpu },
];
