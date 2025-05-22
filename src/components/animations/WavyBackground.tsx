import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface WavyBackgroundProps {
  className?: string;
  colors?: string[];
}

const WavyBackground: React.FC<WavyBackgroundProps> = ({ 
  className = '',
  colors = ['#4F46E5', '#3B82F6', '#0EA5E9', '#06B6D4']
}) => {
  // Pre-calculate all random values to prevent recalculation on each render
  const particles = useMemo(() => {
    return Array(10).fill(0).map((_, i) => {
      const size = Math.random() * 6 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const bottom = Math.random() * 100;
      const xOffset = Math.random() * 30 - 15;
      const duration = Math.random() * 5 + 8;
      const delay = Math.random() * 3;
      
      return { size, color, left, bottom, xOffset, duration, delay };
    });
  }, [colors]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Reduced number of waves and optimized animations */}
      {colors.slice(0, 3).map((color, index) => (
        <motion.div
          key={`wave-${index}`}
          className="absolute w-[200%] h-[50px] left-0 will-change-transform"
          style={{
            bottom: `${index * 60}px`,
            background: `linear-gradient(90deg, transparent, ${color}${index * 20 + 10}, transparent)`,
            opacity: 0.1 + (index * 0.05),
            borderRadius: '50%',
            // Removed blur filter for better performance
          }}
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{
            duration: 20 + index * 5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear", // Linear is more performant than easeInOut
          }}
        />
      ))}
      
      {/* Reduced number of reversed waves */}
      {colors.slice(0, 2).map((color, index) => (
        <motion.div
          key={`wave-reverse-${index}`}
          className="absolute w-[200%] h-[40px] left-0 will-change-transform"
          style={{
            bottom: `${(index * 60) + 30}px`,
            background: `linear-gradient(90deg, transparent, ${color}${index * 20 + 20}, transparent)`,
            opacity: 0.1 + (index * 0.03),
            borderRadius: '50%',
            // Removed blur filter for better performance
          }}
          initial={{ x: "0%" }}
          animate={{ x: "-100%" }}
          transition={{
            duration: 25 + index * 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear", // Linear is more performant than easeInOut
          }}
        />
      ))}
      
      {/* Reduced number of particles with optimized animations */}
      {particles.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full will-change-transform"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: 0.4,
            left: `${particle.left}%`,
            bottom: `${particle.bottom}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, particle.xOffset, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default React.memo(WavyBackground);