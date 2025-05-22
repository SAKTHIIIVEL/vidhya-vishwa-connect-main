
import React, { useState } from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/LoginForm';
import NewsFeed from '../../components/news/NewsFeed';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Sparkles, MousePointer } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const AdminLogin = () => {
  const [activeTab, setActiveTab] = useState<string>('login');

  return (
    <AuthLayout 
      image="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
      imageAlt="School administration"
      backgroundClass="bg-gradient-to-r from-[#5F65D9] via-[#7786D9] to-[#B6CAF2]"
      overlayColor="bg-black/20"
      className="md:max-w-full h-full"
    >
      <div className="flex flex-col h-full">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-6"
        >
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Settings className="h-8 w-8 text-edu-blue mr-2" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Portal</h1>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="ml-2"
          >
            <Sparkles className="h-5 w-5 text-yellow-500" />
          </motion.div>
        </motion.div>
        
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full flex-grow flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-2 mb-6 flex-shrink-0 sticky top-0 z-10 bg-white/80 backdrop-blur-sm rounded-lg">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="news">
              System Updates
              <Badge variant="secondary" className="ml-1 bg-edu-lightBlue text-edu-blue">New</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-6 animate-fade-in flex-grow overflow-y-auto min-h-0 flex flex-col custom-scrollbar">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold">School Administration</h2>
              <p className="text-gray-500">Access school management system</p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-edu-lightBlue rounded-lg border border-edu-blue/20 mb-6"
            >
              <h3 className="font-semibold text-edu-blue mb-2">Admin Dashboard Features</h3>
              <ul className="text-sm space-y-1.5 text-gray-700">
                <motion.li 
                  whileHover={{ x: 5, color: "#1E65F3" }} 
                  className="transition-all flex items-center"
                >
                  <MousePointer className="h-3 w-3 mr-1 text-edu-blue inline" /> Student records management
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5, color: "#1E65F3" }} 
                  className="transition-all flex items-center"
                >
                  <MousePointer className="h-3 w-3 mr-1 text-edu-blue inline" /> Staff administration
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5, color: "#1E65F3" }} 
                  className="transition-all flex items-center"
                >
                  <MousePointer className="h-3 w-3 mr-1 text-edu-blue inline" /> Tamil Nadu NCERT compliance reporting
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5, color: "#1E65F3" }} 
                  className="transition-all flex items-center"
                >
                  <MousePointer className="h-3 w-3 mr-1 text-edu-blue inline" /> Matriculation school performance analytics
                </motion.li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4"
              whileHover={{ boxShadow: "0 15px 30px -10px rgba(0,0,0,0.1)" }}
            >
              <LoginForm userType="admin" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <p className="text-gray-600 text-sm">
                Need administrator access? Please contact the school IT department or the principal for administrator credentials.
              </p>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="news" className="flex-grow overflow-y-auto min-h-0 flex flex-col custom-scrollbar">
            <NewsFeed color="blue" />
          </TabsContent>
        </Tabs>
      </div>
    </AuthLayout>
  );
};

export default AdminLogin;
