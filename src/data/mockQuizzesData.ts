
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  questions: Question[];
  totalQuestions: number;
  timeLimit: number; // in minutes
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  status: 'draft' | 'published' | 'archived';
  completed?: boolean; // Added for UI compatibility
  score?: number; // Added for UI compatibility
  difficultyBreakdown: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export const quizzes: Quiz[] = [
  {
    id: "quiz-1",
    title: "Mathematics Mid-Term Exam",
    description: "Mid-term exam covering algebra, geometry, and calculus",
    subject: "Mathematics",
    grade: "10th Grade",
    questions: [
      {
        id: "q1",
        text: "Solve for x: 3x + 5 = 20",
        options: ["x = 3", "x = 5", "x = 7", "x = 15"],
        correctAnswer: "x = 5",
        difficulty: "easy",
        points: 5
      },
      {
        id: "q2",
        text: "What is the area of a circle with radius 5cm?",
        options: ["25π cm²", "10π cm²", "5π cm²", "15π cm²"],
        correctAnswer: "25π cm²",
        difficulty: "medium",
        points: 10
      },
      {
        id: "q3",
        text: "Find the derivative of f(x) = x² + 3x + 2",
        options: ["f'(x) = 2x + 3", "f'(x) = x + 3", "f'(x) = 2x", "f'(x) = 3"],
        correctAnswer: "f'(x) = 2x + 3",
        difficulty: "hard",
        points: 15
      }
    ],
    totalQuestions: 3,
    timeLimit: 60,
    createdAt: "2024-05-10T10:00:00Z",
    updatedAt: "2024-05-10T10:00:00Z",
    createdBy: "Teacher Smith",
    status: "published",
    completed: true,
    score: 85,
    difficultyBreakdown: {
      easy: 33,
      medium: 33,
      hard: 34
    }
  },
  {
    id: "quiz-2",
    title: "English Literature Quiz",
    description: "Quiz on Shakespeare and modern literature",
    subject: "English",
    grade: "11th Grade",
    questions: [
      {
        id: "q1",
        text: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: "William Shakespeare",
        difficulty: "easy",
        points: 5
      },
      {
        id: "q2",
        text: "Which of these is NOT a play by Shakespeare?",
        options: ["Hamlet", "Macbeth", "Great Expectations", "Othello"],
        correctAnswer: "Great Expectations",
        difficulty: "medium",
        points: 10
      }
    ],
    totalQuestions: 2,
    timeLimit: 45,
    createdAt: "2024-05-12T14:30:00Z",
    updatedAt: "2024-05-12T14:30:00Z",
    createdBy: "Teacher Jones",
    status: "draft",
    completed: false,
    difficultyBreakdown: {
      easy: 50,
      medium: 50,
      hard: 0
    }
  },
  {
    id: "quiz-3",
    title: "Science Test: Physics",
    description: "Covering mechanics and thermodynamics",
    subject: "Physics",
    grade: "12th Grade",
    questions: [
      {
        id: "q1",
        text: "What is Newton's Second Law of Motion?",
        options: ["F = ma", "E = mc²", "a² + b² = c²", "F = G(m₁m₂)/r²"],
        correctAnswer: "F = ma",
        difficulty: "medium",
        points: 10
      },
      {
        id: "q2",
        text: "What is the unit of electric current?",
        options: ["Volt", "Watt", "Ampere", "Ohm"],
        correctAnswer: "Ampere",
        difficulty: "easy",
        points: 5
      },
      {
        id: "q3",
        text: "Calculate the work done when a force of 10N moves an object 5m in the direction of the force.",
        options: ["2J", "15J", "50J", "100J"],
        correctAnswer: "50J",
        difficulty: "medium",
        points: 10
      },
      {
        id: "q4",
        text: "What is Heisenberg's Uncertainty Principle?",
        options: [
          "Energy can neither be created nor destroyed",
          "The position and momentum of a particle cannot be precisely determined simultaneously",
          "Matter can be converted to energy",
          "Two objects cannot occupy the same space"
        ],
        correctAnswer: "The position and momentum of a particle cannot be precisely determined simultaneously",
        difficulty: "hard",
        points: 15
      }
    ],
    totalQuestions: 4,
    timeLimit: 90,
    createdAt: "2024-05-15T09:45:00Z",
    updatedAt: "2024-05-15T09:45:00Z",
    createdBy: "Teacher Wilson",
    status: "published",
    completed: true,
    score: 92,
    difficultyBreakdown: {
      easy: 25,
      medium: 50,
      hard: 25
    }
  }
];
