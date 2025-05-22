
import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StudentLogin from "./pages/auth/StudentLogin";
import TutorLogin from "./pages/auth/TutorLogin";
import AdminLogin from "./pages/auth/AdminLogin";
// StudentDashboard removed
import SplashScreen from "./components/SplashScreen"; // Import the new splash screen
import AiAssistant from "./components/ai/AiAssistant"; // Import the AI Assistant
import Dashboard from './pages/Dashboard';
import ExamPreparation from './pages/ExamPreparation';
import Teachers from './pages/Teachers';
import Submissions from './pages/Submissions';
import Profile from './pages/Profile';
import AIVoiceTutor from './pages/AIVoiceTutor';
import Chatbot from './pages/Chatbot';
import Layout from './components/Layout';

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show splash screen for 2 seconds

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login/student" element={<StudentLogin />} />
            <Route path="/login/tutor" element={<TutorLogin />} />
            <Route path="/login/admin" element={<AdminLogin />} />

            {/* Protected/Dashboard Routes under Layout */}
            <Route element={<Layout />}>
              <Route path="/dashboard/admin" element={<Dashboard />} />
              <Route path="/exam-preparation" element={<ExamPreparation />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/submissions" element={<Submissions />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/ai-tutor" element={<AIVoiceTutor />} />
              <Route path="/chatbot" element={<Chatbot />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <AiAssistant /> {/* Add the AI Assistant here */}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

