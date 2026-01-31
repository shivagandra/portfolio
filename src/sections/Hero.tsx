import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Greeting animation
      tl.fromTo(
        greetingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.2,
      );

      // Name animation with 3D rotate
      tl.fromTo(
        nameRef.current,
        { opacity: 0, rotateX: 90, transformOrigin: "center bottom" },
        { opacity: 1, rotateX: 0, duration: 1 },
        0.4,
      );

      // Role typewriter effect
      tl.fromTo(
        roleRef.current,
        { opacity: 0, width: 0 },
        { opacity: 1, width: "auto", duration: 1.2 },
        0.8,
      );

      // Image animation
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" },
        0.5,
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        1,
      );

      // Social links
      tl.fromTo(
        socialsRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
        1.2,
      );

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      style={{ perspective: "1000px" }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div
            className="order-2 lg:order-1 text-center lg:text-left"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span
              ref={greetingRef}
              className="inline-block text-indigo-400 font-medium mb-4 opacity-0"
            >
              Hello, I'm
            </span>

            <h1
              ref={nameRef}
              className="font-exo font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-4 opacity-0"
            >
              Shiva Krishna
            </h1>

            <p
              ref={roleRef}
              className="font-exo text-2xl md:text-3xl text-gradient mb-8 overflow-hidden whitespace-nowrap"
            >
              Software Developer
            </p>

            <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Passionate about building scalable applications and cloud
              infrastructure. Transforming complex problems into elegant
              solutions.
            </p>

            <div
              ref={ctaRef}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8 opacity-0"
            >
              <button
                onClick={scrollToProjects}
                className="btn-magnetic px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-medium flex items-center gap-2"
              >
                View My Work
                <ArrowDown size={18} />
              </button>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-magnetic px-8 py-3 border border-indigo-500/50 hover:border-indigo-500 text-white rounded-full font-medium transition-all"
              >
                Get In Touch
              </a>
            </div>

            <div
              ref={socialsRef}
              className="flex gap-4 justify-center lg:justify-start"
            >
              <a
                href="https://github.com/shivagandra"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-500/20 transition-all"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/shivagandra"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-500/20 transition-all"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:shivagandra9664@gmail.com"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-500/20 transition-all"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div
              ref={imageRef}
              className="relative w-72 h-72 md:w-96 md:h-96 opacity-0"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-3xl animate-pulse-glow" />

              {/* Image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-indigo-500/30 animate-pulse-glow">
                <img
                  src="IMG_SHIVA.jpg"
                  alt="Shiva Krishna"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -bottom-4 -left-4 glass px-4 py-2 rounded-full text-sm text-indigo-300">
                AWS Certified
              </div>
              <div className="absolute -top-4 -right-4 glass px-4 py-2 rounded-full text-sm text-indigo-300">
                Full Stack
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-indigo-400" size={24} />
      </div>
    </section>
  );
};

export default Hero;
