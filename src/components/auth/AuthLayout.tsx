
import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
  image: string;
  imageAlt: string;
  backgroundClass?: string;
  overlayColor?: string;
}

const AuthLayout = ({ 
  children, 
  className, 
  image, 
  imageAlt,
  backgroundClass = "bg-gradient-to-r from-sky-100 to-blue-50",
  overlayColor = "bg-black/10"
}: AuthLayoutProps) => {
  // Particles for background animation
  const particles = Array.from({ length: 20 }).map((_, index) => ({
    id: index,
    size: Math.random() * 10 + 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={cn("min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden", backgroundClass)}
      style={{ minHeight: '100vh' }}
    >
      {/* Animated background particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-sky-200 opacity-30 pointer-events-none"
          style={{ 
            width: particle.size, 
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full max-w-7xl h-[90vh] flex items-stretch"
      >
        <Card className={cn("w-full grid md:grid-cols-2 lg:grid-cols-3 overflow-hidden shadow-xl h-[90vh]", className)}>
          <motion.div 
            className="hidden md:block relative h-full"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.img 
              src={image} 
              alt={imageAlt}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
              initial={{ scale: 1.1, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
            />
            <div className={cn("absolute inset-0", overlayColor)}></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-lg font-semibold drop-shadow-md"
              >
                Tamil Nadu Educational Portal
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-sm text-white/80 mt-1 drop-shadow-md"
              >
                Empowering futures through quality education
              </motion.div>
            </div>
          </motion.div>
          <CardContent className="p-8 flex flex-col justify-center h-full w-full relative md:col-span-1 lg:col-span-2 overflow-y-auto custom-scrollbar">
            {/* Extra background decoration */}
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-sky-50/30 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-sky-50/30 to-transparent pointer-events-none"></div>
            <motion.div
              className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-gradient-to-br from-sky-100/40 to-blue-100/40 blur-xl pointer-events-none"
              animate={{ 
                scale: [1, 1.2, 1], 
                rotate: [0, 180],
                opacity: [0.3, 0.5, 0.3] 
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <div className="w-full h-full flex flex-col">
              {children}
            </div>
            
            <style dangerouslySetInnerHTML={{
              __html: `
                .custom-scrollbar::-webkit-scrollbar {
                  width: 8px;
                  height: 8px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: rgba(240, 240, 240, 0.3);
                  border-radius: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: rgba(180, 180, 180, 0.5);
                  border-radius: 10px;
                  transition: all 0.3s ease;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: rgba(140, 140, 140, 0.7);
                }
              `
            }} />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AuthLayout;
