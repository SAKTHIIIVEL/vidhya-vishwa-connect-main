
import React, { useState, useEffect } from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/LoginForm';
import RegisterForm from '../../components/auth/RegisterForm';
import NewsFeed from '../../components/news/NewsFeed';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Sparkles, MousePointer, Images } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const TutorLogin = () => {
  const [activeTab, setActiveTab] = useState<string>('login');
  
  const tutorImages = [
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522071901873-411886a10004?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?auto=format&fit=crop&q=80",
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % tutorImages.length);
    }, 15000);
    
    return () => clearInterval(imageInterval);
  }, [tutorImages.length]);

  const tutorResources = [
    "Class management tools",
    "Tamil Nadu NCERT curriculum guides",
    "Interactive teaching materials",
    "Student performance tracking",
    "Lesson planning templates",
    "Digital assessment tools"
  ];
  
  const [hoveredResource, setHoveredResource] = useState<number | null>(null);

  return (
    <AuthLayout 
      image={tutorImages[currentImageIndex]}
      imageAlt="Teacher in classroom"
      backgroundClass="bg-gradient-to-r from-[#5F65D9] via-[#7786D9] to-[#B6CAF2]"
      overlayColor="bg-black/20"
      className="md:max-w-full h-full"
    >
      <div className="flex flex-col h-full w-full">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-6 flex-shrink-0"
        >
          <motion.div
            whileHover={{ rotate: 15 }}
            animate={{ rotate: [0, 10, 0] }}
            transition={{ ease: "easeInOut", duration: 5, repeat: Infinity }}
          >
            <Book className="h-8 w-8 text-edu-blue mr-2" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800">Tutor Portal</h1>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="ml-2"
          >
            <Sparkles className="h-5 w-5 text-yellow-400" />
          </motion.div>
        </motion.div>
        
        <Tabs 
          defaultValue="login" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full flex-grow flex flex-col min-h-0"
        >
          <TabsList className="grid w-full grid-cols-3 mb-6 flex-shrink-0 sticky top-0 z-10 bg-white/80 backdrop-blur-sm rounded-lg">
            <TabsTrigger value="login" className="transition-all hover:scale-105 active:scale-95">
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 2 }}>Login</motion.div>
            </TabsTrigger>
            <TabsTrigger value="register" className="transition-all hover:scale-105 active:scale-95">
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 2 }}>Register</motion.div>
            </TabsTrigger>
            <TabsTrigger value="news" className="transition-all hover:scale-105 active:scale-95">
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 2 }} className="flex items-center">
                Educational Updates
                <Badge variant="secondary" className="ml-1 bg-edu-lightBlue text-edu-blue">New</Badge>
              </motion.div>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-6 flex-grow overflow-y-auto min-h-0 flex flex-col custom-scrollbar">
            <div className="text-center mb-6 flex-shrink-0">
              <h2 className="text-xl font-semibold">Welcome, Educator!</h2>
              <motion.p 
                className="text-gray-500"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Access your teaching resources
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-edu-lightBlue rounded-lg border border-edu-blue/20 mb-6 flex-shrink-0"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center">
                <motion.div
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  <Images className="h-5 w-5 text-edu-blue" />
                </motion.div>
                <h3 className="font-semibold text-edu-blue">Tutor Resources</h3>
              </div>
              <ul className="text-sm space-y-1.5 text-gray-700 mt-2">
                {tutorResources.map((resource, index) => (
                  <motion.li 
                    key={index}
                    onMouseEnter={() => setHoveredResource(index)}
                    onMouseLeave={() => setHoveredResource(null)}
                    className="transition-all flex items-center"
                    whileHover={{ x: 5, color: "#1E65F3" }}
                    animate={{ 
                      backgroundColor: hoveredResource === index ? 'rgba(30, 101, 243, 0.1)' : 'transparent',
                      borderRadius: '4px',
                      padding: '2px 4px'
                    }}
                  >
                    <MousePointer className="h-3 w-3 mr-1 text-edu-blue inline" /> {resource}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-grow bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4"
              whileHover={{ boxShadow: "0 15px 30px -10px rgba(0,0,0,0.1)" }}
            >
              <LoginForm userType="tutor" />
            </motion.div>
            
            <div className="text-center mt-4 flex-shrink-0">
              <motion.p 
                className="text-gray-600 text-sm"
                whileHover={{ scale: 1.05 }}
              >
                New tutor?{" "}
                <motion.button 
                  onClick={() => setActiveTab("register")}
                  className="text-edu-blue hover:underline font-medium transition-all hover:scale-105 active:scale-95"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register your profile
                </motion.button>
              </motion.p>
            </div>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-6 flex-grow overflow-y-auto min-h-0 flex flex-col custom-scrollbar">
            <div className="text-center mb-6 flex-shrink-0">
              <h2 className="text-xl font-semibold">Join as a Tutor</h2>
              <p className="text-gray-500">Create your educator account</p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-grow bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4"
              whileHover={{ boxShadow: "0 15px 30px -10px rgba(0,0,0,0.1)" }}
            >
              <RegisterForm userType="tutor" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-6 flex-shrink-0"
            >
              <p className="text-gray-600 text-sm">
                Already registered?{" "}
                <motion.button 
                  onClick={() => setActiveTab("login")}
                  className="text-edu-blue hover:underline font-medium"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login here
                </motion.button>
              </p>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="news" className="flex-grow overflow-y-auto min-h-0 flex flex-col custom-scrollbar">
            <NewsFeed color="blue" />
          </TabsContent>
        </Tabs>

        <div className="absolute bottom-5 right-5 opacity-70">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-100 to-sky-200/30 blur-xl"
          />
        </div>
        <div className="absolute top-10 right-10 opacity-50">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ delay: 1, duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 rounded-full bg-gradient-to-bl from-sky-200 to-blue-100/20 blur-lg"
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default TutorLogin;
