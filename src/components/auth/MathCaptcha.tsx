
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MathCaptchaProps {
  onVerification: (isCorrect: boolean) => void;
  className?: string;
}

const MathCaptcha = ({ onVerification, className }: MathCaptchaProps) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState<'+' | '-' | '×'>('×');
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);

  // Generate a new math problem
  const generateProblem = () => {
    // For addition, use larger numbers
    if (operator === '+') {
      setNum1(Math.floor(Math.random() * 50) + 1);
      setNum2(Math.floor(Math.random() * 50) + 1);
    } 
    // For subtraction, ensure positive result
    else if (operator === '-') {
      const a = Math.floor(Math.random() * 20) + 10;
      const b = Math.floor(Math.random() * a) + 1;
      setNum1(a);
      setNum2(b);
    } 
    // For multiplication, use smaller numbers
    else {
      setNum1(Math.floor(Math.random() * 10) + 1);
      setNum2(Math.floor(Math.random() * 10) + 1);
    }
    
    setAnswer('');
    setIsCorrect(null);
  };

  // Calculate the correct answer
  const calculateCorrectAnswer = (): number => {
    switch(operator) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '×': return num1 * num2;
      default: return 0;
    }
  };

  // Change the problem type after 3 attempts or when explicitly requested
  const changeProblemType = () => {
    const operators: ('+' | '-' | '×')[] = ['+', '-', '×'];
    const currentIndex = operators.indexOf(operator);
    const nextIndex = (currentIndex + 1) % operators.length;
    setOperator(operators[nextIndex]);
    setAttempts(0);
  };

  // Verify the user's answer
  const verifyAnswer = () => {
    const userAnswer = parseInt(answer);
    const correctAnswer = calculateCorrectAnswer();
    
    const correct = userAnswer === correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      onVerification(true);
    } else {
      setAttempts(attempts + 1);
      if (attempts >= 2) {
        setTimeout(() => {
          changeProblemType();
          generateProblem();
        }, 1500);
      }
      onVerification(false);
    }
  };

  // Initialize the problem on component mount or when operator changes
  useEffect(() => {
    generateProblem();
  }, [operator]);

  return (
    <div className={cn("p-4 bg-gray-50 rounded-lg border auth-animate-in", className)}>
      <div className="flex items-center mb-3">
        <Calculator className="mr-2 h-5 w-5 text-edu-blue" />
        <h3 className="font-semibold text-lg">Math Verification</h3>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Solve this math problem to verify you're a student:
        </p>
        
        <div className="flex items-center justify-center p-3 bg-white rounded-md shadow-sm border text-2xl font-bold">
          <span className="text-edu-blue">{num1}</span>
          <span className="mx-2 text-edu-orange">{operator}</span>
          <span className="text-edu-green">{num2}</span>
          <span className="mx-2">=</span>
          <span className="text-gray-400">?</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="captcha-answer">Your Answer</Label>
        <div className="flex gap-2">
          <Input
            id="captcha-answer"
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            className={cn(
              "edu-input edu-input-blue",
              isCorrect === true && "border-edu-green bg-edu-lightGreen",
              isCorrect === false && "border-red-500 bg-red-50"
            )}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                verifyAnswer();
              }
            }}
          />
          <button
            onClick={verifyAnswer}
            className="edu-btn edu-btn-blue"
          >
            Verify
          </button>
        </div>
        
        {isCorrect === true && (
          <p className="text-edu-green text-sm">Correct! Well done!</p>
        )}
        
        {isCorrect === false && (
          <div className="text-sm">
            <p className="text-red-500">Incorrect. Try again!</p>
            {attempts >= 2 && (
              <p className="text-gray-500 mt-1">Finding this difficult? We'll try a different type of problem.</p>
            )}
          </div>
        )}
        
        <button 
          onClick={() => {
            changeProblemType();
            generateProblem();
          }}
          className="text-xs text-edu-blue hover:underline mt-2"
        >
          Try a different problem
        </button>
      </div>
    </div>
  );
};

export default MathCaptcha;
