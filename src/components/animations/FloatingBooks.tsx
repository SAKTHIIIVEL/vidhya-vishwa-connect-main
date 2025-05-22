import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FloatingBooksProps {
  className?: string;
}

const FloatingBooks: React.FC<FloatingBooksProps> = ({ className = '' }) => {
  // Book data with different colors and sizes
  const books = [
    { color: '#FF5757', size: { width: 40, height: 60 }, delay: 0, rotate: 15 },
    { color: '#3498DB', size: { width: 45, height: 65 }, delay: 1.2, rotate: -10 },
    { color: '#2ECC71', size: { width: 35, height: 55 }, delay: 0.5, rotate: 5 },
    { color: '#F1C40F', size: { width: 50, height: 70 }, delay: 1.8, rotate: -15 },
    { color: '#9B59B6', size: { width: 38, height: 58 }, delay: 0.8, rotate: 20 },
  ];

  // Pre-calculate particle data
  const particles = useMemo(() => {
    return Array(8).fill(0).map((_, i) => {
      const size = Math.random() * 5 + 2;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const xOffset = Math.random() * 15 - 7.5;
      const duration = Math.random() * 2 + 2;
      const delay = Math.random() * 3;
      
      return { size, left, top, xOffset, duration, delay };
    });
  }, []);

  return (
    <div className={`relative ${className}`} style={{ height: '300px' }}>
      {books.map((book, index) => (
        <motion.div
          key={index}
          className="absolute will-change-transform"
          style={{
            left: `${(index * 18) + 5}%`,
            top: '50%',
            width: book.size.width,
            height: book.size.height,
            transformOrigin: 'center',
            zIndex: 10 - index,
          }}
          initial={{ y: 0, rotate: book.rotate, opacity: 0.8 }}
          animate={{
            y: [-15, 15, -15],
            rotate: [book.rotate, book.rotate + (index % 2 === 0 ? 3 : -3), book.rotate],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 5,
            delay: book.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Book cover */}
          <div
            className="absolute inset-0 rounded-r-md"
            style={{ 
              backgroundColor: book.color,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          
          {/* Book pages */}
          <div
            className="absolute inset-y-0 left-0 w-2 bg-white rounded-l-sm"
            style={{ transform: 'translateX(-1px)' }}
          >
            {/* Reduced number of page lines */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-px bg-gray-200"
                style={{ top: `${(i + 1) * 25}%` }}
              />
            ))}
          </div>
          
          {/* Book title lines */}
          <div className="absolute inset-0 flex flex-col justify-center items-center p-2">
            <div className="w-3/4 h-1 bg-white/30 rounded mb-2" />
            <div className="w-1/2 h-1 bg-white/30 rounded" />
          </div>
        </motion.div>
      ))}
      
      {/* Reduced number of floating particles with optimized animations */}
      {particles.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-white/30 will-change-transform"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, particle.xOffset, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default React.memo(FloatingBooks);