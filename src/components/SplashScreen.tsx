import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-sky-500 to-blue-700">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1.2 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="flex flex-col items-center"
      >
        <img src="/logo.png.jpg" alt="Inlustro Logo" className="h-24 w-24 mb-4 object-contain" />
        <h1 className="text-4xl font-bold text-white">Inlustro</h1>
        <p className="text-lg text-sky-200">Loading your learning experience...</p>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
