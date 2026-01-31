import { useEffect, useRef, useState } from "react";
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
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

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
    // {
    //   icon: Phone,
    //   label: "Phone",
    //   value: "+91 9676380572",
    //   href: "tel:+919676380572",
    //   copyable: true,
    // },
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

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="contact-content text-center mb-16 opacity-0">
          <h1 className="font-exo font-bold text-4xl md:text-5xl text-white mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'm always open to
            discussing new opportunities in DevOps and Cloud Engineering.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="contact-content glass rounded-2xl p-8 opacity-0">
              <h2 className="font-exo font-semibold text-xl text-white mb-6 flex items-center gap-3">
                <MessageSquare className="text-indigo-400" size={24} />
                Contact Information
              </h2>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
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
                              item.href.startsWith("http")
                                ? "_blank"
                                : undefined
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

            {/* Availability */}
            <div className="contact-content glass rounded-2xl p-8 opacity-0">
              <h2 className="font-exo font-semibold text-xl text-white mb-6 flex items-center gap-3">
                <Calendar className="text-indigo-400" size={24} />
                Availability
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
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
                  <span className="text-white font-medium">
                    {availability.type}
                  </span>
                </div>

                <div className="p-4 bg-white/5 rounded-xl">
                  <p className="text-gray-500 text-sm mb-1">Timezone</p>
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-indigo-400" />
                    <span className="text-white font-medium">
                      {availability.timezone}
                    </span>
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
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="contact-content glass rounded-2xl p-8 opacity-0">
              <h2 className="font-exo font-semibold text-xl text-white mb-6">
                Quick Actions
              </h2>

              <div className="space-y-4">
                <a
                  href="mailto:shivagandra9664@gmail.com"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-colors"
                >
                  <Send size={18} />
                  Send Email
                </a>

                <a
                  href="https://linkedin.com/in/shivagandra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors"
                >
                  <Linkedin size={18} />
                  Connect on LinkedIn
                </a>

                <a
                  href="https://github.com/shivagandra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors"
                >
                  <Github size={18} />
                  View GitHub Profile
                </a>
              </div>
            </div>

            {/* Download Resume */}
            <div className="contact-content glass rounded-2xl p-8 opacity-0">
              <h2 className="font-exo font-semibold text-xl text-white mb-4">
                Resume
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                Download my resume for more details about my experience and
                skills.
              </p>
              <a
                href="/resume.pdf"
                download="Shiva Krishna Gandra Resume.pdf"
                className="flex items-center justify-center gap-2 w-full py-3 border border-indigo-500/50 hover:border-indigo-500 text-indigo-400 hover:text-white rounded-xl font-medium transition-colors"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
