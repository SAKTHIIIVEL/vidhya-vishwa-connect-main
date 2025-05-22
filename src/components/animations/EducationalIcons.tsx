import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface EducationalIconsProps {
  className?: string;
}

const EducationalIcons: React.FC<EducationalIconsProps> = ({ className = '' }) => {
  // Pre-calculate all icon positions and animations
  const icons = useMemo(() => {
    const subjects = [
      { icon: '🧮', name: 'Math', color: '#FF5757' },
      { icon: '🧪', name: 'Science', color: '#3498DB' },
      { icon: '📚', name: 'Literature', color: '#2ECC71' },
      { icon: '🌍', name: 'Geography', color: '#F1C40F' },
      { icon: '🎭', name: 'Arts', color: '#9B59B6' },
      { icon: '🏛️', name: 'History', color: '#1ABC9C' },
      { icon: '💻', name: 'Computer', color: '#E74C3C' },
      { icon: '🔬', name: 'Biology', color: '#34495E' },
    ];

    return subjects.map((subject, index) => {
      const angle = (index / subjects.length) * Math.PI * 2;
      const radius = 120;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const delay = index * 0.2;
      
      return {
        ...subject,
        x,
        y,
        delay,
      };
    });
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ height: '300px' }}>
      {/* Central education icon */}
      <motion.div
        className="absolute z-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg will-change-transform"
        style={{ width: 80, height: 80 }}
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 10px 15px -3px rgba(79, 70, 229, 0.3)',
            '0 15px 20px -3px rgba(79, 70, 229, 0.4)',
            '0 10px 15px -3px rgba(79, 70, 229, 0.3)'
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-4xl">🎓</span>
      </motion.div>

      {/* Orbiting subject icons */}
      {icons.map((item, index) => (
        <motion.div
          key={`subject-${index}`}
          className="absolute flex flex-col items-center will-change-transform"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: item.x,
            y: item.y,
            opacity: 1,
            rotate: [0, 360],
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 10,
            delay: item.delay,
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              delay: 0
            }
          }}
        >
          <motion.div
            className="rounded-full flex items-center justify-center shadow-md cursor-pointer"
            style={{ 
              width: 50, 
              height: 50, 
              backgroundColor: item.color,
            }}
            whileHover={{ 
              scale: 1.2,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              y: {
                duration: 2 + index * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <span className="text-2xl">{item.icon}</span>
          </motion.div>
          
          <motion.div
            className="mt-2 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-md text-xs font-medium shadow-sm"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item.delay + 0.3 }}
          >
            {item.name}
          </motion.div>
        </motion.div>
      ))}

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
        {icons.map((item, index) => (
          <motion.line
            key={`line-${index}`}
            x1="50%"
            y1="50%"
            x2={`calc(50% + ${item.x}px)`}
            y2={`calc(50% + ${item.y}px)`}
            stroke={item.color}
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: item.delay + 0.2 }}
          />
        ))}
      </svg>
    </div>
  );
};

export default React.memo(EducationalIcons);