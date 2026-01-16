
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the tilt
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Transform values for rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Spotlight position
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const spotXSpring = useSpring(spotX, { stiffness: 150, damping: 20 });
  const spotYSpring = useSpring(spotY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate relative mouse position (0 to 1)
    const mouseX = (e.clientX - rect.left) / width;
    const mouseY = (e.clientY - rect.top) / height;

    // Set tilt values (-0.5 to 0.5)
    x.set(mouseX - 0.5);
    y.set(mouseY - 0.5);

    // Set spotlight values
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      className={`relative group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden perspective-1000 ${className}`}
    >
      {/* Dynamic Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [spotXSpring, spotYSpring],
            ([sx, sy]) => `radial-gradient(600px circle at ${sx}px ${sy}px, rgba(217, 70, 239, 0.15), transparent 40%)`
          ),
        }}
      />

      {/* Static Gradient Border Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />
      
      <div className="relative z-10 h-full translate-z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
