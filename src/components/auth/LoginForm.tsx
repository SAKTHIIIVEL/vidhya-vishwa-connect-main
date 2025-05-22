import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Key, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoginFormProps {
  userType: "student" | "tutor" | "admin";
  className?: string;
  onLoginSuccess?: () => void;
}

const LoginForm = ({ userType, className, onLoginSuccess }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);
      
      // In a real application, you would verify credentials with backend
      const successfulLogin = true;
      
      if (successfulLogin) {
        toast({
          title: "Login successful",
          description: `Welcome back, ${username}!`,
          action: (
            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="h-5 w-5 text-white" />
            </div>
          ),
        });
        
        // Redirect to the appropriate dashboard
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          navigate(`/dashboard/${userType}`);
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const getButtonColor = () => {
    switch (userType) {
      case "student":
        return "edu-btn-orange";
      case "tutor":
        return "edu-btn-green";
      case "admin":
        return "edu-btn-blue";
      default:
        return "edu-btn-blue";
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className={cn("space-y-5 auth-animate-in", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <motion.div
          whileFocus="focus"
          animate="blur"
          variants={inputVariants}
        >
          <Input
            id="username"
            type="text"
            placeholder={`Enter your ${userType} username`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="edu-input edu-input-blue"
          />
        </motion.div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <a 
            href="#" 
            className="text-sm text-edu-blue hover:underline"
            onClick={(e) => {
              e.preventDefault();
              toast({
                title: "Password Reset",
                description: "Please contact your school administrator for password reset.",
              });
            }}
          >
            Forgot password?
          </a>
        </div>
        <motion.div 
          className="relative"
          whileFocus="focus"
          animate="blur"
          variants={inputVariants}
        >
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="edu-input edu-input-blue"
          />
          <Key className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </motion.div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="remember-me" 
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
        />
        <label
          htmlFor="remember-me"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember me for 30 days
        </label>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="submit"
          className={`w-full edu-btn ${getButtonColor()}`}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </motion.div>

      <div className="text-center">
        <span className="text-sm text-gray-500">
          {userType === "student"
            ? "Need help? Ask your class teacher"
            : "Don't have an account? Contact administrator"}
        </span>
      </div>
    </motion.form>
  );
};

export default LoginForm;
