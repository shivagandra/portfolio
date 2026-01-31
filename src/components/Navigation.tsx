import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Cloud,
  Server,
  Code,
  GraduationCap,
  Award,
  User,
  Briefcase,
  Mail,
} from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/", icon: Cloud },
    { label: "About", href: "/about", icon: User },
    { label: "Experience", href: "/experience", icon: Briefcase },
    { label: "Projects", href: "/projects", icon: Code },
    { label: "Skills", href: "/skills", icon: Server },
    { label: "Education", href: "/education", icon: GraduationCap },
    { label: "Certifications", href: "/certifications", icon: Award },
    { label: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "nav-blur py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="font-exo font-bold text-xl text-white hover:text-indigo-400 transition-colors flex items-center gap-2"
        >
          <Cloud className="text-indigo-500" size={24} />
          <span>
            Shiva<span className="text-indigo-100"> Krishna</span>
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={({ isActive }) =>
                `px-4 py-2 text-sm rounded-lg transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "text-white bg-indigo-500/20 border border-indigo-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 nav-blur transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={({ isActive }) =>
                `px-4 py-3 text-gray-300 hover:text-white transition-colors rounded-lg flex items-center gap-3 ${
                  isActive ? "bg-indigo-500/20 text-white" : "hover:bg-white/5"
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
