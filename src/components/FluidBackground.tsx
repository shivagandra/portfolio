import { useRef, useEffect } from 'react';

const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle system for fluid effect
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 150 + 100,
        alpha: Math.random() * 0.03 + 0.01,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      // Render every 2nd frame for performance (30fps)
      if (frameCount % 2 === 0) {
        ctx.fillStyle = '#05050a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, i) => {
          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Mouse interaction (only for every 5th particle for performance)
          if (i % 5 === 0) {
            const dx = mouseRef.current.x - particle.x;
            const dy = mouseRef.current.y - particle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 300) {
              particle.vx -= dx * 0.00005;
              particle.vy -= dy * 0.00005;
            }
          }

          // Boundary check
          if (particle.x < -particle.radius) particle.x = canvas.width + particle.radius;
          if (particle.x > canvas.width + particle.radius) particle.x = -particle.radius;
          if (particle.y < -particle.radius) particle.y = canvas.height + particle.radius;
          if (particle.y > canvas.height + particle.radius) particle.y = -particle.radius;

          // Draw gradient
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.radius
          );
          gradient.addColorStop(0, `rgba(99, 102, 241, ${particle.alpha})`);
          gradient.addColorStop(0.5, `rgba(79, 70, 229, ${particle.alpha * 0.5})`);
          gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        });

        // Draw connecting lines (limited for performance)
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.02)';
        ctx.lineWidth = 1;
        for (let i = 0; i < particles.length; i += 3) {
          for (let j = i + 3; j < particles.length; j += 3) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ background: '#05050a' }}
    />
  );
};

export default FluidBackground;
