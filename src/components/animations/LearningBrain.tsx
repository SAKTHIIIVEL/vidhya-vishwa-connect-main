import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface LearningBrainProps {
  className?: string;
}

const LearningBrain: React.FC<LearningBrainProps> = ({ className = '' }) => {
  // Pre-calculate all random values using useMemo to prevent recalculation on each render
  const connections = useMemo(() => {
    const result = [];
    for (let i = 0; i < 8; i++) { // Reduced from 15 to 8 connections
      result.push({
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 2,
        color: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.5 + 0.2})`,
      });
    }
    return result;
  }, []);

  const nodes = useMemo(() => {
    return Array(12).fill(0).map((_, i) => ({ // Reduced from 20 to 12 nodes
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      size: Math.random() * 8 + 4, // Slightly smaller sizes
      delay: Math.random() * 2,
      color: i % 5 === 0 ? '#FF5757' : 
             i % 4 === 0 ? '#3498DB' : 
             i % 3 === 0 ? '#2ECC71' : 
             i % 2 === 0 ? '#F1C40F' : '#9B59B6',
    }));
  }, []);

  const icons = useMemo(() => {
    return ['📚', '🔬', '🧮', '🌍', '🧠', '💡'].map((icon, index) => ({
      icon,
      left: (index * 15) + 10,
      top: (index % 3) * 30 + 20,
      delay: index * 0.7
    }));
  }, []);

  return (
    <div className={`relative ${className}`} style={{ height: '300px' }}>
      {/* Brain outline shape */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-3/4 h-3/4 border-2 border-indigo-300/30 rounded-full will-change-transform"
        style={{ transform: 'translate(-50%, -50%)' }}
        initial={{ scale: 0.9, opacity: 0.5 }}
        animate={{ 
          scale: [0.9, 1.05, 0.9],
          opacity: [0.5, 0.7, 0.5],
          borderColor: ['rgba(102, 126, 234, 0.3)', 'rgba(102, 126, 234, 0.5)', 'rgba(102, 126, 234, 0.3)']
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Neural connections - reduced number and optimized */}
      {connections.map((connection, index) => (
        <motion.div
          key={`connection-${index}`}
          className="absolute top-0 left-0 w-full h-full will-change-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ 
            duration: connection.duration,
            delay: connection.delay,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <svg width="100%" height="100%" style={{ position: 'absolute' }}>
            <motion.line
              x1={`${connection.x1}%`}
              y1={`${connection.y1}%`}
              x2={`${connection.x2}%`}
              y2={`${connection.y2}%`}
              stroke={connection.color}
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ 
                duration: connection.duration,
                delay: connection.delay,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </svg>
        </motion.div>
      ))}
      
      {/* Neural nodes - reduced number and optimized */}
      {nodes.map((node, index) => (
        <motion.div
          key={`node-${index}`}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
            backgroundColor: node.color,
            // Removed boxShadow for better performance
          }}
          initial={{ scale: 0.5, opacity: 0.3 }}
          animate={{ 
            scale: [0.5, 1.1, 0.5],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ 
            duration: 3 + (index % 3),
            delay: node.delay,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
      
      {/* Knowledge icons floating around - using pre-calculated values */}
      {icons.map((item, index) => (
        <motion.div
          key={`icon-${index}`}
          className="absolute text-xl will-change-transform"
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1.1, 0],
            y: [0, -15, 0]
          }}
          transition={{ 
            duration: 4,
            delay: item.delay,
            repeat: Infinity,
            repeatDelay: 4
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default React.memo(LearningBrain);