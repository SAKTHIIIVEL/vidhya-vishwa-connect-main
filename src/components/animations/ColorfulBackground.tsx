import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface ColorfulBackgroundProps {
  className?: string;
}

const ColorfulBackground: React.FC<ColorfulBackgroundProps> = ({ className = '' }) => {
  // Pre-calculate blob positions and colors
  const blobs = useMemo(() => {
    const colors = [
      'from-blue-400/30 to-indigo-400/30',
      'from-purple-400/30 to-pink-400/30',
      'from-green-400/30 to-teal-400/30',
      'from-orange-400/30 to-amber-400/30',
      'from-red-400/30 to-rose-400/30',
    ];
    
    return Array(5).fill(0).map((_, i) => {
      const size = Math.random() * 300 + 200;
      const top = Math.random() * 80;
      const left = Math.random() * 80;
      const color = colors[i % colors.length];
      const duration = Math.random() * 20 + 20;
      const delay = Math.random() * 5;
      
      return { size, top, left, color, duration, delay };
    });
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Colorful gradient blobs */}
      {blobs.map((blob, i) => (
        <motion.div
          key={`blob-${i}`}
          className={`absolute rounded-full bg-gradient-to-br ${blob.color}`}
          style={{
            width: blob.size,
            height: blob.size,
            top: `${blob.top}%`,
            left: `${blob.left}%`,
            filter: 'blur(70px)',
            willChange: 'transform',
          }}
          animate={{
            x: [0, 30, 0, -30, 0],
            y: [0, -30, 0, 30, 0],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: blob.delay,
          }}
        />
      ))}
      
      {/* Educational pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default React.memo(ColorfulBackground);