import { NavLink } from "react-router-dom";
import { Github, Linkedin, Mail, Cloud, Heart } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Experience", href: "/experience" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/skills" },
    { label: "Education", href: "/education" },
    { label: "Certifications", href: "/certifications" },
    { label: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/shivagandra", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/shivagandra",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:shivagandra9664@gmail.com", label: "Email" },
  ];

  return (
    <footer className="relative z-10 border-t border-white/10 bg-void/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <NavLink
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 mb-4"
            >
              <Cloud className="text-indigo-500" size={28} />
              <span className="font-exo font-bold text-2xl text-white">
                Shiva<span className="text-indigo-500">.</span>Dev
              </span>
            </NavLink>
            <p className="text-gray-400 mb-4 max-w-md">
              DevOps Engineer & Cloud Architect specializing in AWS, Kubernetes,
              and scalable infrastructure solutions.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-500/20 transition-all"
                  aria-label={link.label}
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-exo font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.href}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-exo font-semibold text-white mb-4">More</h4>
            <ul className="space-y-2">
              {quickLinks.slice(4).map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.href}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Shiva Krishna Gandra. All rights
            reserved.
          </p>
          <p className="text-gray-600 text-sm flex items-center gap-1">
            Built with <Heart size={14} className="text-red-500 fill-red-500" />{" "}
            using React, TypeScript & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
