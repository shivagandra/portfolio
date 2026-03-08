import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  Copy,
  Check,
  MessageSquare,
  Calendar,
  Globe,
  Clock3,
} from "lucide-react";
import { getResumePath } from "@/lib/image";

gsap.registerPlugin(ScrollTrigger);

type ContactForm = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const initialForm: ContactForm = {
  name: "",
  email: "",
  company: "",
  message: "",
};

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [localTime, setLocalTime] = useState("");

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "shivagandra9664@gmail.com",
      href: "mailto:shivagandra9664@gmail.com",
      copyable: true,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/shivagandra",
      href: "https://linkedin.com/in/shivagandra",
      copyable: false,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/shivagandra",
      href: "https://github.com/shivagandra",
      copyable: false,
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Kolkata, West Bengal, India",
      href: null,
      copyable: false,
    },
  ];

  const availability = {
    status: "Open to opportunities",
    type: "Full-time | Contract | Freelance",
    timezone: "IST (UTC+5:30)",
    response: "Usually responds within 24 hours",
  };

  useEffect(() => {
    const updateClock = () => {
      setLocalTime(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }).format(new Date()),
      );
    };
    updateClock();
    const timer = window.setInterval(updateClock, 60000);
    return () => window.clearInterval(timer);
  }, []);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      setCopiedField(null);
    }
  };

  const onChange = (key: keyof ContactForm, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setFormError(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFormError("Name, email, and message are required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email.trim())) {
      setFormError("Please provide a valid email address.");
      return;
    }

    const subject = `Portfolio Inquiry from ${form.name.trim()}`;
    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Company: ${form.company.trim() || "Not provided"}`,
      "",
      "Message:",
      form.message.trim(),
    ].join("\n");

    window.location.href = `mailto:shivagandra9664@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setForm(initialForm);
    setFormError(null);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-content",
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="contact-content text-center mb-16 opacity-0">
          <h1 className="font-exo font-bold text-4xl md:text-5xl text-white mb-4">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discuss cloud architecture, DevOps automation, or engineering
            collaboration opportunities.
          </p>
        </div>

        <div className="grid xl:grid-cols-5 gap-8">
          <div className="xl:col-span-3 space-y-6">
            <div className="contact-content glass rounded-2xl p-8 opacity-0">
              <h2 className="font-exo font-semibold text-xl text-white mb-6 flex items-center gap-3">
                <MessageSquare className="text-indigo-400" size={24} />
                Contact Information
              </h2>

              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl group hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                        <item.icon className="text-indigo-400" size={22} />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={
                              item.href.startsWith("http") ? "_blank" : undefined
                            }
                            rel={
                              item.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="text-white font-medium hover:text-indigo-400 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-white font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>

                    {item.copyable && (
                      <button
                        onClick={() => copyToClipboard(item.value, item.label)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-gray-400 hover:text-indigo-400 transition-all"
                        title="Copy to clipboard"
                        aria-label={`Copy ${item.label}`}
                      >
                        {copiedField === item.label ? (
                          <Check size={18} className="text-green-400" />
                        ) : (
                          <Copy size={18} />
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-content glass rounded-2xl p-8 opacity-0">
              <h2 className="font-exo font-semibold text-xl text-white mb-6 flex items-center gap-3">
                <Send className="text-indigo-400" size={24} />
                Send a Quick Brief
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs text-gray-400">Name</span>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(event) => onChange("name", event.target.value)}
                      placeholder="Your name"
                      autoComplete="name"
                      required
                      className="mt-1.5 w-full bg-white/5 border border-white/10 focus:border-indigo-400/60 outline-none rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-500"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs text-gray-400">Email</span>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(event) => onChange("email", event.target.value)}
                      placeholder="Your email"
                      autoComplete="email"
                      required
                      className="mt-1.5 w-full bg-white/5 border border-white/10 focus:border-indigo-400/60 outline-none rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-500"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-xs text-gray-400">Company (optional)</span>
                  <input
                    id="contact-company"
                    type="text"
                    value={form.company}
                    onChange={(event) => onChange("company", event.target.value)}
                    placeholder="Company"
                    autoComplete="organization"
                    className="mt-1.5 w-full bg-white/5 border border-white/10 focus:border-indigo-400/60 outline-none rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-500"
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-gray-400">Project brief</span>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={(event) => onChange("message", event.target.value)}
                    placeholder="Project context, goals, and timeline..."
                    required
                    className="mt-1.5 w-full bg-white/5 border border-white/10 focus:border-indigo-400/60 outline-none rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-500 resize-none"
                  />
                </label>

                {formError && (
                  <p className="text-sm text-red-300" role="alert">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm"
                >
                  <Send size={16} />
                  Compose Email
                </button>
              </form>
            </div>
          </div>

          <div className="xl:col-span-2 space-y-6">
            <div className="contact-content glass rounded-2xl p-8 opacity-0">
              <h2 className="font-exo font-semibold text-xl text-white mb-6 flex items-center gap-3">
                <Calendar className="text-indigo-400" size={24} />
                Availability
              </h2>

              <div className="space-y-3">
                <div className="p-4 bg-white/5 rounded-xl">
                  <p className="text-gray-500 text-sm mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white font-medium">
                      {availability.status}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl">
                  <p className="text-gray-500 text-sm mb-1">Engagement Type</p>
                  <span className="text-white font-medium">{availability.type}</span>
                </div>

                <div className="p-4 bg-white/5 rounded-xl">
                  <p className="text-gray-500 text-sm mb-1">Timezone</p>
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Globe size={16} className="text-indigo-400" />
                    {availability.timezone}
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl">
                  <p className="text-gray-500 text-sm mb-1">Current Local Time</p>
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Clock3 size={16} className="text-indigo-400" />
                    {localTime || "--:--"}
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl">
                  <p className="text-gray-500 text-sm mb-1">Response Time</p>
                  <span className="text-white font-medium">
                    {availability.response}
                  </span>
                </div>
              </div>
            </div>

            <div className="contact-content glass rounded-2xl p-8 opacity-0">
              <h2 className="font-exo font-semibold text-xl text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <a
                  href="mailto:shivagandra9664@gmail.com"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-colors"
                >
                  <Mail size={17} />
                  Direct Email
                </a>
                <a
                  href="https://linkedin.com/in/shivagandra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors"
                >
                  <Linkedin size={17} />
                  Connect on LinkedIn
                </a>
                <a
                  href="https://github.com/shivagandra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors"
                >
                  <Github size={17} />
                  View GitHub
                </a>
                <a
                  href={getResumePath()}
                  download="Shiva-Krishna-Gandra-Resume.pdf"
                  className="flex items-center justify-center gap-2 w-full py-3.5 border border-indigo-500/50 hover:border-indigo-400 text-indigo-300 hover:text-white rounded-xl font-medium transition-colors"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

