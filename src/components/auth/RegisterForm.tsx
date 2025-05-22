import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { BookOpen, User, Calendar, School, Mail } from 'lucide-react';

interface RegisterFormProps {
  userType: 'student' | 'tutor' | 'admin';
  onRegistered?: () => void;
  className?: string;
}

const RegisterForm = ({ userType, onRegistered, className }: RegisterFormProps) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [grade, setGrade] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [school, setSchool] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !password || !confirmPassword) {
      toast({
        title: 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Registration successful!',
        description: `Welcome, ${fullName}! Your account is being reviewed.`,
      });
      
      if (onRegistered) {
        onRegistered();
      }
    }, 1500);
  };

  const getButtonColor = () => {
    switch (userType) {
      case 'student':
        return 'edu-btn-orange';
      case 'tutor':
        return 'edu-btn-green';
      case 'admin':
        return 'edu-btn-blue';
      default:
        return 'edu-btn-blue';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <div className="relative">
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="edu-input pl-10"
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="edu-input pl-10"
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        {userType === 'student' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="grade">Grade/Class</Label>
              <div className="relative">
                <Select value={grade} onValueChange={setGrade}>
                  <SelectTrigger className="edu-input pl-10">
                    <SelectValue placeholder="Select your grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                      <SelectItem key={g} value={g.toString()}>
                        Class {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <div className="relative">
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                  className="edu-input pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </>
        )}
        
        {(userType === 'tutor' || userType === 'student') && (
          <div className="space-y-2">
            <Label htmlFor="school">School Name</Label>
            <div className="relative">
              <Input
                id="school"
                type="text"
                placeholder="Enter your school name"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                required
                className="edu-input pl-10"
              />
              <School className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="edu-input"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="edu-input"
          />
        </div>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button
            type="submit"
            className={`w-full edu-btn ${getButtonColor()}`}
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </motion.div>

        <div className="text-center">
          <span className="text-sm text-gray-500">
            By registering, you agree to our terms of service and privacy policy
          </span>
        </div>
      </form>
    </motion.div>
  );
};

export default RegisterForm;
