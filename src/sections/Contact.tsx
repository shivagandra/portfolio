import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, MapPin, Phone, Send, Copy, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'shivagandra9664@gmail.com',
      href: 'mailto:shivagandra9664@gmail.com',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/shivagandra',
      href: 'https://linkedin.com/in/shivagandra',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/shivagandra',
      href: 'https://github.com/shivagandra',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9676380572',
      href: 'tel:+919676380572',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kolkata, West Bengal, India',
      href: null,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading glitch reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Content slide up
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('shivagandra9664@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 px-6"
    >
      {/* Matrix Background */}
      <div className="matrix-bg">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="matrix-char"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            {String.fromCharCode(0x30A0 + Math.random() * 96)}
          </span>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="font-exo font-bold text-4xl md:text-5xl text-white mb-4 opacity-0"
          >
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Have a project in mind or want to collaborate? I'm always open to discussing new opportunities and ideas.
          </p>
        </div>

        {/* Contact Content */}
        <div ref={contentRef} className="space-y-8">
          {/* Primary CTA */}
          <div className="glass rounded-2xl p-8 text-center opacity-0">
            <p className="text-gray-400 mb-6">Ready to start a conversation?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:shivagandra9664@gmail.com"
                className="btn-magnetic px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-medium flex items-center gap-2"
              >
                <Send size={18} />
                Send Email
              </a>
              <button
                onClick={copyEmail}
                className="btn-magnetic px-8 py-4 border border-indigo-500/50 hover:border-indigo-500 text-white rounded-full font-medium flex items-center gap-2"
              >
                {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy Email'}
              </button>
            </div>
          </div>

          {/* Contact Links */}
          <div className="grid md:grid-cols-2 gap-4 opacity-0">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="glass glass-hover rounded-xl p-4 flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/30 transition-colors">
                  <item.icon className="text-indigo-400" size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-500 text-sm">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-white font-medium truncate block hover:text-indigo-400 transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white font-medium truncate">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Shiva Krishna Gandra. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Built with React, TypeScript, Tailwind CSS & GSAP
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
