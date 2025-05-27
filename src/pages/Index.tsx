import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { School, User, BookOpen, ScrollText, Award, Calendar, Bell, Image, BookOpen as BookOpenIcon, Sparkles, Rocket, Brain, Lightbulb, GraduationCap, Atom } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// Lazy load heavy animation components for better performance
const SolarSystem = lazy(() => import('@/components/animations/SolarSystem'));
const FloatingBooks = lazy(() => import('@/components/animations/FloatingBooks'));
const LearningBrain = lazy(() => import('@/components/animations/LearningBrain'));
const WavyBackground = lazy(() => import('@/components/animations/WavyBackground'));
import EducationalIcons from '@/components/animations/EducationalIcons';
import ColorfulBackground from '@/components/animations/ColorfulBackground';

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Educational images to show in the gallery
  const educationalImages = [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80",
  ];

  const classroomImages = [
    "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80",
  ];

  // Add state for animated hero text
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const heroTexts = [
    "Tamil Nadu School Learning Portal",
    "Empowering Education Through Technology",
    "Learn, Grow, Succeed Together"
  ];

  // Cycle through hero texts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % heroTexts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col overflow-hidden">
      {/* Colorful animated background */}
      <div className="fixed inset-0 z-0">
        <ColorfulBackground />
      </div>
      
      {/* Wavy background with reduced opacity for better performance */}
      <div className="fixed inset-0 z-0 opacity-10">
        <Suspense fallback={null}>
          <WavyBackground colors={['#4F46E5', '#3B82F6', '#0EA5E9']} />
        </Suspense>
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        
        {/* Logo + Title */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center w-full sm:w-auto justify-between"
        >
          <div className="flex items-center">
            <motion.img 
              src="/logo.png.jpg" 
              alt="InLustro Logo" 
              className="h-10 w-10 mr-2 object-cover rounded-full"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.h1 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500"
              animate={{ backgroundPosition: ['0% center', '100% center', '0% center'] }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              Inlustro
            </motion.h1>
          </div>

          {/* Menu Toggle Icon for Mobile */}
          <div className="sm:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </motion.div>

        {/* Login Buttons */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`flex-col sm:flex sm:flex-row gap-2 ${menuOpen ? 'flex' : 'hidden'} sm:flex`}
        >
          <Link to="/login/student">
            <Button variant="outline" size="sm" className="w-full sm:w-auto border-edu-blue text-blue-600 hover:bg-edu-lightOrange hover:scale-105 transition-transform">
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Student Login
              </motion.span>
            </Button>
          </Link>
          <Link to="/login/tutor">
            <Button variant="outline" size="sm" className="w-full sm:w-auto border-edu-blue text-blue-600 hover:bg-edu-lightGreen hover:scale-105 transition-transform">
              Tutor Login
            </Button>
          </Link>
          <Link to="/login/admin">
            <Button size="sm" className="w-full sm:w-auto bg-gradient-to-r from-edu-blue to-blue-600 hover:from-blue-600 hover:to-edu-blue hover:scale-105 transition-all duration-300">
              Admin
            </Button>
          </Link>
        </motion.div>
      </div>
    </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-50 via-blue-50 to-sky-50 py-16 md:py-24 overflow-hidden z-10">
        {/* Animated particles - optimized with useMemo and reduced count */}
        {useMemo(() => {
          const particles = [];
          for (let i = 0; i < 10; i++) {
            const size = Math.random() * 15 + 5;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const xOffset = Math.random() * 30 - 15;
            const duration = Math.random() * 5 + 8;
            const delay = Math.random() * 3;
            
            particles.push(
              <motion.div
                key={`hero-particle-${i}`}
                className="absolute rounded-full bg-blue-400/20 will-change-transform"
                style={{
                  width: size,
                  height: size,
                  top: `${top}%`,
                  left: `${left}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, xOffset, 0],
                  opacity: [0, 0.4, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut"
                }}
              />
            );
          }
          return particles;
        }, [])}
        
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <motion.div 
            className="md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-2 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center"
              >
                <Rocket className="w-4 h-4 mr-1" /> Welcome to the future of learning
              </motion.span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTextIndex}
                  className="block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {heroTexts[currentTextIndex].split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      className={i % 3 === 0 ? "text-edu-blue" : i % 2 === 0 ? "text-edu-green" : ""}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 + 0.5 }}
                    >
                      {word}{' '}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
              
              {/* Animated underline */}
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-edu-orange via-edu-blue to-edu-green"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 1 }}
              />
            </h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-10 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Access educational resources, connect with teachers, and track your academic progress with our integrated school management system
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <Link to="/login/student">
                <Button className="bg-gradient-to-tl from-edu-orange to-orange-500 hover:from-orange-500 hover:to-edu-orange text-white shadow-lg hover:shadow-orange-200/50 transition-all duration-300 group">
                  <motion.span
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    Student Dashboard
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.span>
                </Button>
              </Link>
              <Link to="/login/tutor">
                <Button variant="outline" className="border-edu-green text-edu-green hover:bg-edu-lightGreen group">
                  <motion.span
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    Tutor Portal
                    <motion.span
                      className="ml-2 opacity-0 group-hover:opacity-100"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Main image with floating effect */}
              <motion.div
                className="relative z-20 rounded-lg shadow-2xl overflow-hidden"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80" 
                  alt="Indian students learning" 
                  className="w-full max-w-lg object-cover rounded-lg"
                />
                
                {/* Glowing overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-purple-500/20 mix-blend-overlay"
                  animate={{ 
                    background: [
                      'linear-gradient(to top right, rgba(59, 130, 246, 0.2), transparent, rgba(168, 85, 247, 0.2))',
                      'linear-gradient(to top right, rgba(168, 85, 247, 0.2), transparent, rgba(59, 130, 246, 0.2))',
                      'linear-gradient(to top right, rgba(59, 130, 246, 0.2), transparent, rgba(168, 85, 247, 0.2))'
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg rotate-6 z-10 opacity-70"
                animate={{ rotate: [6, 0, 6], scale: [1, 1.05, 1] }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{ filter: 'blur(8px)' }}
              />
              <motion.div
                className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-r from-orange-300 to-yellow-200 rounded-lg -rotate-6 z-0 opacity-70"
                animate={{ rotate: [-6, 0, -6], scale: [1, 1.05, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ filter: 'blur(8px)' }}
              />
              
              {/* Floating icons around the image */}
              {['📚', '🔬', '🧮', '🌍', '🎓', '💡'].map((icon, index) => (
                <motion.div
                  key={`floating-icon-${index}`}
                  className="absolute text-2xl z-30"
                  style={{
                    top: `${20 + (index * 15)}%`,
                    left: index % 2 === 0 ? '-10%' : '105%',
                  }}
                  animate={{
                    y: [0, -10, 0],
                    x: index % 2 === 0 ? [0, 5, 0] : [0, -5, 0],
                    rotate: [0, index % 2 === 0 ? 10 : -10, 0],
                  }}
                  transition={{
                    duration: 3 + index,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {icon}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
        
      {/* Visual Education Banner with Floating Books */}
      <motion.section
        className="container mx-auto px-4 py-16 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="relative">
          <motion.div
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <GraduationCap className="h-6 w-6 text-indigo-600" />
            </motion.div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
              Learning Through Visual Exploration
            </h2>
          </motion.div>
          
          {/* Educational Icons Animation */}
          <div className="mb-12">
            <EducationalIcons className="h-64 w-full" />
          </div>
          
          {/* Floating Books Animation */}
          <div className="mb-12 hidden md:block">
            <Suspense fallback={<div className="h-64 w-full flex items-center justify-center">Loading books...</div>}>
              <FloatingBooks className="h-64 w-full" />
            </Suspense>
          </div>
          
          {/* Image Gallery with enhanced animations */}
          <div className="flex overflow-x-auto py-4 gap-6 scrollbar-hide">
            {educationalImages.map((img, index) => (
              <motion.div 
                key={index}
                className="flex-shrink-0 w-72 h-56 rounded-xl overflow-hidden relative group"
                whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.3 } }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <img 
                  src={img} 
                  alt={`Educational scene ${index + 1}`} 
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" 
                />
                
                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-lg">Interactive Learning {index + 1}</h3>
                  <p className="text-white/80 text-sm">Explore educational content through visual learning</p>
                </div>
                
                {/* Decorative corner accent */}
                <motion.div 
                  className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/40 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Gradient fades on sides */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
          
          {/* Scroll indicator */}
          <motion.div 
            className="flex justify-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex items-center text-sm text-gray-500">
              <span>Scroll to explore</span>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
        
      {/* User Type Cards with Brain Animation */}
      <section className="relative py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white/80 z-0"></div>
        
        {/* Animated background shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`bg-shape-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-blue-200/20 to-indigo-200/20"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="flex flex-col items-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-4 px-4 py-1.5 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center"
              >
                <Lightbulb className="w-4 h-4 mr-1" /> Choose Your Path
              </motion.span>
            </motion.div>
            
            <h2 className="text-4xl font-bold text-center mb-4 relative">
              Access Your <span className="text-edu-blue">Portal</span>
              
              {/* Animated underline */}
              <motion.div
                className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-edu-orange via-edu-blue to-edu-green"
                initial={{ width: "0%", left: "50%" }}
                animate={{ width: "50%", left: "25%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </h2>
            
            <p className="text-gray-600 text-center max-w-2xl">
              Choose the portal that matches your role in our educational ecosystem and access personalized features
            </p>
          </motion.div>
          
          {/* Brain animation in the background */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <Suspense fallback={null}>
              <LearningBrain />
            </Suspense>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Student Card */}
            <motion.div 
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Link to="/login/student" className="block h-full">
                <Card className="h-full border-t-4 border-edu-orange overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <motion.div 
                      className="h-20 w-20 rounded-full bg-gradient-to-br from-edu-orange to-orange-400 flex items-center justify-center mb-6 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <User className="h-10 w-10 text-white" />
                    </motion.div>
                    
                    <h2 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-edu-orange transition-colors duration-300">Students</h2>
                    
                    <p className="text-gray-600 mb-6">Access your courses, assignments, and study materials to enhance your learning journey</p>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="mt-auto w-full"
                    >
                      <Button className="w-full bg-gradient-to-r from-edu-orange to-orange-500 hover:from-orange-500 hover:to-edu-orange text-white shadow-lg group-hover:shadow-orange-200/50 transition-all duration-300">
                        <motion.span
                          className="flex items-center justify-center"
                          animate={{ scale: [1, 1.03, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Student Login
                          <motion.span
                            className="ml-2 opacity-0 group-hover:opacity-100"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </motion.span>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Tutor Card */}
            <motion.div 
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Link to="/login/tutor" className="block h-full">
                <Card className="h-full border-t-4 border-edu-green overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <motion.div 
                      className="h-20 w-20 rounded-full bg-gradient-to-br from-edu-green to-green-400 flex items-center justify-center mb-6 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <BookOpen className="h-10 w-10 text-white" />
                    </motion.div>
                    
                    <h2 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-edu-green transition-colors duration-300">Tutors</h2>
                    
                    <p className="text-gray-600 mb-6">Manage your classes, access teaching resources, and track student progress efficiently</p>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="mt-auto w-full"
                    >
                      <Button className="w-full bg-gradient-to-r from-edu-green to-green-500 hover:from-green-500 hover:to-edu-green text-white shadow-lg group-hover:shadow-green-200/50 transition-all duration-300">
                        <motion.span
                          className="flex items-center justify-center"
                          animate={{ scale: [1, 1.03, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                        >
                          Tutor Login
                          <motion.span
                            className="ml-2 opacity-0 group-hover:opacity-100"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </motion.span>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Admin Card */}
            <motion.div 
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Link to="/login/admin" className="block h-full">
                <Card className="h-full border-t-4 border-edu-blue overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <motion.div 
                      className="h-20 w-20 rounded-full bg-gradient-to-br from-edu-blue to-blue-500 flex items-center justify-center mb-6 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <School className="h-10 w-10 text-white" />
                    </motion.div>
                    
                    <h2 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-edu-blue transition-colors duration-300">Administrators</h2>
                    
                    <p className="text-gray-600 mb-6">Oversee school operations, manage staff, and access comprehensive analytics dashboards</p>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="mt-auto w-full"
                    >
                      <Button className="w-full bg-gradient-to-r from-edu-blue to-blue-600 hover:from-blue-600 hover:to-edu-blue text-white shadow-lg group-hover:shadow-blue-200/50 transition-all duration-300">
                        <motion.span
                          className="flex items-center justify-center"
                          animate={{ scale: [1, 1.03, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                        >
                          Admin Login
                          <motion.span
                            className="ml-2 opacity-0 group-hover:opacity-100"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </motion.span>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section with Solar System */}
      <section className="relative py-24 overflow-hidden">
        {/* Background with stars */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/90 via-blue-900/90 to-purple-900/90 z-0"></div>
        
        {/* Solar System Animation in the background */}
        <div className="absolute inset-0 opacity-70">
          <Suspense fallback={<div className="h-full w-full flex items-center justify-center text-white/50">Loading universe...</div>}>
            <SolarSystem />
          </Suspense>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="flex flex-col items-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-4 px-4 py-1.5 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center"
              >
                <Atom className="w-4 h-4 mr-1" /> Explore Our Universe of Features
              </motion.span>
            </motion.div>
            
            <h2 className="text-4xl font-bold text-center mb-4 text-white">
              Platform <span className="text-blue-300">Features</span>
            </h2>
            
            <p className="text-blue-100 text-center max-w-2xl mb-6">
              Discover the powerful tools and features designed to enhance your educational experience
            </p>
            
            {/* Animated stars */}
            <div className="relative w-48 h-8 mb-8">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  className="absolute top-1/2 transform -translate-y-1/2"
                  style={{ left: `${i * 25}%` }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                  }}
                >
                  <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <ScrollText className="h-12 w-12 text-white" />,
                title: "Interactive Lessons",
                description: "Access interactive curriculum-aligned lessons and study materials",
                color: "from-orange-500 to-red-500",
                delay: 0
              },
              {
                icon: <Award className="h-12 w-12 text-white" />,
                title: "Progress Tracking",
                description: "Track academic achievements and learning progress with visual analytics",
                color: "from-green-500 to-emerald-500",
                delay: 0.1
              },
              {
                icon: <Calendar className="h-12 w-12 text-white" />,
                title: "Class Schedule",
                description: "View timetables and upcoming academic events with smart reminders",
                color: "from-blue-500 to-indigo-500",
                delay: 0.2
              },
              {
                icon: <Bell className="h-12 w-12 text-white" />,
                title: "Announcements",
                description: "Stay updated with important school announcements and notifications",
                color: "from-purple-500 to-violet-500",
                delay: 0.3
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + feature.delay }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="h-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <motion.div 
                      className={`w-20 h-20 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: index % 2 === 0 ? 10 : -10,
                        boxShadow: "0 0 20px rgba(255,255,255,0.5)"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {feature.icon}
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-200 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-blue-100 group-hover:text-white transition-colors duration-300">
                      {feature.description}
                    </p>
                    
                    {/* Animated particle effects */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={`particle-${index}-${i}`}
                          className="absolute rounded-full bg-white/30"
                          style={{
                            width: Math.random() * 6 + 2,
                            height: Math.random() * 6 + 2,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            delay: Math.random() * 2,
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Learning Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Colorful background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="flex flex-col items-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-4 px-4 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center"
              >
                <Sparkles className="w-4 h-4 mr-1" /> Interactive Learning Experience
              </motion.span>
            </motion.div>
            
            <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Learn Through Interaction
            </h2>
            
            <p className="text-gray-600 text-center max-w-2xl mb-8">
              Our platform offers interactive learning experiences that make education engaging and effective
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Interactive Learning Cards */}
            {[
              {
                icon: '🧠',
                title: 'Adaptive Learning',
                description: 'Personalized learning paths that adapt to your progress and learning style',
                color: 'from-blue-500 to-indigo-500',
                delay: 0.1
              },
              {
                icon: '🎮',
                title: 'Gamified Lessons',
                description: 'Learn through interactive games and challenges that make education fun',
                color: 'from-purple-500 to-pink-500',
                delay: 0.2
              },
              {
                icon: '🔍',
                title: 'Interactive Simulations',
                description: 'Explore complex concepts through interactive simulations and visualizations',
                color: 'from-green-500 to-teal-500',
                delay: 0.3
              },
              {
                icon: '👥',
                title: 'Collaborative Projects',
                description: 'Work together with classmates on group projects and learning activities',
                color: 'from-orange-500 to-amber-500',
                delay: 0.4
              },
              {
                icon: '📊',
                title: 'Progress Tracking',
                description: 'Visual dashboards to track your learning progress and achievements',
                color: 'from-red-500 to-rose-500',
                delay: 0.5
              },
              {
                icon: '🎓',
                title: 'Virtual Classrooms',
                description: 'Join interactive virtual classrooms with teachers and fellow students',
                color: 'from-cyan-500 to-blue-500',
                delay: 0.6
              }
            ].map((item, index) => (
              <motion.div
                key={`learning-card-${index}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <motion.div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-2xl mr-4`}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 10,
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                  
                  <motion.button
                    className={`mt-6 px-4 py-2 rounded-lg bg-gradient-to-r ${item.color} text-white w-full flex items-center justify-center group-hover:shadow-md transition-all duration-300`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Explore</span>
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Classroom Images */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-center mb-8">Modern Learning Environment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {classroomImages.map((img, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-md aspect-video group"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <img src={img} alt={`Classroom ${index + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:opacity-100 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-semibold text-lg">Modern Classroom {index + 1}</h3>
                      <p className="text-sm text-white/80">Equipped with latest educational technology</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* News Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold">Latest School News</h2>
          <p className="text-gray-600">Updates from Tamil Nadu Education Department</p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-edu-blue hover:bg-edu-lightBlue hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">NCERT Updates</h3>
                <p className="text-gray-600 text-sm">Tamil Nadu NCERT announces new digital learning initiatives for the academic year 2025-2026.</p>
                <Button variant="link" className="text-edu-blue p-0 mt-2">Read More</Button>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-edu-green hover:bg-edu-lightGreen hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Teaching Excellence Award</h3>
                <p className="text-gray-600 text-sm">Tamil Nadu Matriculation Schools Association announces annual teaching excellence awards.</p>
                <Button variant="link" className="text-edu-green p-0 mt-2">Read More</Button>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <Card className="border-l-4 border-edu-orange hover:bg-edu-lightOrange hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Student Competition</h3>
                <p className="text-gray-600 text-sm">Statewide science project competition for students announced - register by May 30th.</p>
                <Button variant="link" className="text-edu-orange p-0 mt-2">Read More</Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Visual Learning Tools */}
      <motion.section 
        className="bg-gradient-to-r from-indigo-50 to-purple-50 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Visual Learning Tools</h2>
            <p className="text-gray-600">Enhance your learning experience with interactive tools</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                title: "Virtual Lab",
                icon: <BookOpenIcon className="h-10 w-10" />,
                color: "from-blue-500 to-sky-400",
                image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80"
              },
              {
                title: "3D Models",
                icon: <Image className="h-10 w-10" />,
                color: "from-green-500 to-teal-400",
                image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80"
              },
              {
                title: "Digital Library",
                icon: <BookOpen className="h-10 w-10" />,
                color: "from-purple-500 to-indigo-400",
                image: "https://images.unsplash.com/photo-1529148482759-b35b25c5f44d?auto=format&fit=crop&q=80"
              },
              {
                title: "Interactive Maps",
                icon: <Sparkles className="h-10 w-10" />,
                color: "from-amber-500 to-orange-400",
                image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80"
              }
            ].map((tool, index) => (
              <motion.div
                key={index}
                className="overflow-hidden rounded-xl shadow-md"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="relative h-48">
                  <img 
                    src={tool.image} 
                    alt={tool.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${tool.color} opacity-70`}></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mb-3">
                      {tool.icon}
                    </div>
                    <h3 className="text-white font-semibold text-lg text-center">{tool.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-r from-sky-100 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Success <span className="text-edu-blue">Stories</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm shadow-md p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-edu-lightOrange flex items-center justify-center mr-4">
                      <span className="text-edu-orange font-semibold">AP</span>
                    </div>
                    <div>
                      <p className="font-semibold">Arjun Patel</p>
                      <p className="text-sm text-gray-500">Class 10 Student</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "The online learning portal has helped me prepare for my exams effectively. The interactive lessons and practice tests have improved my understanding of complex subjects."
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm shadow-md p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-edu-lightGreen flex items-center justify-center mr-4">
                      <span className="text-edu-green font-semibold">SM</span>
                    </div>
                    <div>
                      <p className="font-semibold">Sangeeta Murthy</p>
                      <p className="text-sm text-gray-500">Science Teacher</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "As a teacher, the portal has simplified my work with streamlined assignment management and easy communication with students and parents. The digital resources have enhanced my teaching."
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Enhanced Footer with Animation */}
      <footer className="relative bg-gradient-to-b from-indigo-50 to-white border-t border-indigo-100 pt-16 pb-8 mt-auto overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`footer-shape-${i}`}
              className="absolute rounded-full bg-gradient-to-r from-blue-100/30 to-indigo-100/30"
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(50px)',
              }}
              animate={{
                x: [0, Math.random() * 50 - 25, 0],
                y: [0, Math.random() * 50 - 25, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo and About */}
            <div className="col-span-1 md:col-span-1">
              <motion.div 
                className="flex items-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.img 
                  src="/logo.png.jpg" 
                  alt="InLustro Logo" 
                  className="h-10 w-10 mr-3 object-contain rounded-lg shadow-md"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                />
                <motion.h2 
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500"
                  animate={{ 
                    backgroundPosition: ['0% center', '100% center', '0% center'],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                >
                  Inlustro
                </motion.h2>
              </motion.div>
              
              <motion.p 
                className="text-gray-600 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Empowering education through technology. Serving Tamil Nadu NCERT and Matriculation Schools with innovative learning solutions.
              </motion.p>
              
              {/* Social Media Icons */}
              <motion.div 
                className="flex space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[
                  { icon: "facebook", color: "text-blue-600 hover:text-blue-700" },
                  { icon: "twitter", color: "text-blue-400 hover:text-blue-500" },
                  { icon: "instagram", color: "text-pink-500 hover:text-pink-600" },
                  { icon: "youtube", color: "text-red-500 hover:text-red-600" }
                ].map((social, index) => (
                  <motion.a
                    key={social.icon}
                    href="#"
                    className={`${social.color} transition-colors duration-300`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="sr-only">{social.icon}</span>
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                      {social.icon === "facebook" && <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />}
                      {social.icon === "twitter" && <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />}
                      {social.icon === "instagram" && <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />}
                      {social.icon === "youtube" && <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />}
                    </svg>
                  </motion.a>
                ))}
              </motion.div>
            </div>
            
            {/* Quick Links */}
            <div className="col-span-1">
              <motion.h3 
                className="text-lg font-bold mb-6 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Quick Links
              </motion.h3>
              <motion.ul 
                className="space-y-3"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {["About Us", "Contact", "Help Center", "Privacy Policy", "Terms of Service"].map((link, index) => (
                  <motion.li 
                    key={link}
                    variants={fadeIn}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                  >
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-edu-blue transition-colors duration-300 flex items-center group"
                    >
                      <motion.span
                        className="mr-2 opacity-0 group-hover:opacity-100"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                      {link}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            
            {/* Resources */}
            <div className="col-span-1">
              <motion.h3 
                className="text-lg font-bold mb-6 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Resources
              </motion.h3>
              <motion.ul 
                className="space-y-3"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {["Curriculum", "Study Materials", "Exam Calendar", "Video Tutorials", "Academic Research"].map((link, index) => (
                  <motion.li 
                    key={link}
                    variants={fadeIn}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                  >
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-edu-green transition-colors duration-300 flex items-center group"
                    >
                      <motion.span
                        className="mr-2 opacity-0 group-hover:opacity-100"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                      {link}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            
            {/* Newsletter */}
            <div className="col-span-1">
              <motion.h3 
                className="text-lg font-bold mb-6 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Stay Updated
              </motion.h3>
              <motion.p 
                className="text-gray-600 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Subscribe to our newsletter for the latest educational updates and resources.
              </motion.p>
              <motion.div
                className="flex"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-edu-blue focus:border-transparent"
                />
                <Button className="rounded-l-none bg-gradient-to-r from-edu-blue to-blue-600 hover:from-blue-600 hover:to-edu-blue">
                  Subscribe
                </Button>
              </motion.div>
            </div>
          </div>
          
          {/* Bottom bar */}
          <motion.div 
            className="pt-8 mt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 Inlustro. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Cookie Policy</a>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
