
export interface LeaderboardItem {
  id: string;
  name: string;
  avatar: string;
  points: number;
  rank: number;
  classId: string;
  class: string; // Added class field
  streak: number;
  xp: number; // Added xp field
  level: number; // Added level field
  badges: string[];
  lastActivity: string;
}

export const leaderboardData: LeaderboardItem[] = [
  {
    id: "student-1",
    name: "Alex Johnson",
    avatar: "/avatars/alex.png",
    points: 2450,
    rank: 1,
    classId: "class-10a",
    class: "10A",
    streak: 15,
    xp: 8750,
    level: 12,
    badges: ["Quiz Master", "Homework Hero", "Perfect Attendance"],
    lastActivity: "2024-05-15T08:30:00Z"
  },
  {
    id: "student-2",
    name: "Sam Williams",
    avatar: "/avatars/sam.png",
    points: 2380,
    rank: 2,
    classId: "class-10a",
    class: "10A",
    streak: 12,
    xp: 8200,
    level: 11,
    badges: ["Math Wizard", "Science Explorer"],
    lastActivity: "2024-05-15T09:45:00Z"
  },
  {
    id: "student-3",
    name: "Taylor Chen",
    avatar: "/avatars/taylor.png",
    points: 2290,
    rank: 3,
    classId: "class-10b",
    class: "10B",
    streak: 10,
    xp: 7800,
    level: 10,
    badges: ["Bookworm", "Team Player"],
    lastActivity: "2024-05-14T15:20:00Z"
  },
  {
    id: "student-4",
    name: "Jordan Smith",
    avatar: "/avatars/jordan.png",
    points: 2150,
    rank: 4,
    classId: "class-10c",
    class: "10C",
    streak: 7,
    xp: 7500,
    level: 10,
    badges: ["Quick Learner"],
    lastActivity: "2024-05-14T14:10:00Z"
  },
  {
    id: "student-5",
    name: "Casey Brown",
    avatar: "/avatars/casey.png",
    points: 2080,
    rank: 5,
    classId: "class-10b",
    class: "10B",
    streak: 5,
    xp: 7100,
    level: 9,
    badges: ["Homework Hero"],
    lastActivity: "2024-05-15T10:30:00Z"
  }
];

export const badgeTypes = [
  {
    id: "quiz-master",
    name: "Quiz Master",
    description: "Achieve 90% or higher on 5 quizzes",
    icon: "award",
    color: "#FFD700"
  },
  {
    id: "homework-hero",
    name: "Homework Hero",
    description: "Complete homework assignments for 14 consecutive days",
    icon: "clipboard-check",
    color: "#4CAF50"
  },
  {
    id: "bookworm",
    name: "Bookworm",
    description: "Read 10 books and complete their reviews",
    icon: "book-open",
    color: "#9C27B0"
  },
  {
    id: "perfect-attendance",
    name: "Perfect Attendance",
    description: "Attend all classes for a full month",
    icon: "calendar",
    color: "#2196F3"
  },
  {
    id: "math-wizard",
    name: "Math Wizard",
    description: "Solve 50 difficult math problems correctly",
    icon: "calculator",
    color: "#FF5722"
  },
  {
    id: "science-explorer",
    name: "Science Explorer",
    description: "Complete 5 science projects with distinction",
    icon: "flask",
    color: "#607D8B"
  },
  {
    id: "team-player",
    name: "Team Player",
    description: "Participate in 3 group activities with positive feedback",
    icon: "users",
    color: "#00BCD4"
  },
  {
    id: "quick-learner",
    name: "Quick Learner",
    description: "Complete learning modules ahead of schedule",
    icon: "zap",
    color: "#FFEB3B"
  }
];

export const pointsHistory = [
  {
    date: "2024-05-01",
    points: 1850
  },
  {
    date: "2024-05-05",
    points: 1920
  },
  {
    date: "2024-05-10",
    points: 2100
  },
  {
    date: "2024-05-15",
    points: 2450
  }
];

export const achievements = [
  {
    id: "achievement-1",
    title: "First Quiz Completed",
    description: "Completed your first quiz",
    earnedAt: "2024-03-10T14:30:00Z",
    points: 50
  },
  {
    id: "achievement-2",
    title: "Perfect Score",
    description: "Achieved 100% on a quiz",
    earnedAt: "2024-04-05T09:45:00Z",
    points: 100
  },
  {
    id: "achievement-3",
    title: "Consistent Learner",
    description: "Logged in for 7 consecutive days",
    earnedAt: "2024-04-20T16:15:00Z",
    points: 75
  },
  {
    id: "achievement-4",
    title: "Homework Champion",
    description: "Completed 10 homework assignments on time",
    earnedAt: "2024-05-01T11:20:00Z",
    points: 125
  },
  {
    id: "achievement-5",
    title: "Subject Master",
    description: "Achieved an average of 90% or higher in a subject",
    earnedAt: "2024-05-12T13:30:00Z",
    points: 150
  }
];
