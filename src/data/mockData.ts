
export const currentUser = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'admin',
  profilePicture: '/avatars/avatar-1.png',
  avatar: '/avatars/avatar-1.png', // Added for backward compatibility
  lastLogin: '2024-05-15T10:30:00Z',
  xp: 3580,
  level: 10,
  class: '10A',
  language: 'English',
  theme: 'light',
  preferences: {
    theme: 'light',
    notificationsEnabled: true,
  },
};

export const weeklyActivity = [
  { day: 'Mon', minutes: 35 },
  { day: 'Tue', minutes: 50 },
  { day: 'Wed', minutes: 40 },
  { day: 'Thu', minutes: 65 },
  { day: 'Fri', minutes: 55 },
  { day: 'Sat', minutes: 20 },
  { day: 'Sun', minutes: 15 },
];

export const subjects = [
  { id: 'math', name: 'Mathematics' },
  { id: 'science', name: 'Science' },
  { id: 'english', name: 'English' },
  { id: 'history', name: 'History' },
  { id: 'geography', name: 'Geography' },
];

export const badges = [
  {
    id: 'badge-1',
    title: 'Quiz Master',
    description: 'Completed 10 quizzes with high scores',
    imageUrl: '/badges/quiz-master.png',
    earned: true,
    earnedDate: '2024-04-15T08:30:00Z',
  },
  {
    id: 'badge-2',
    title: 'Perfect Attendance',
    description: 'Logged in every day for a month',
    imageUrl: '/badges/attendance.png',
    earned: true,
    earnedDate: '2024-04-10T14:45:00Z',
  },
  {
    id: 'badge-3',
    title: 'Fast Learner',
    description: 'Completed all beginner courses',
    imageUrl: '/badges/fast-learner.png',
    earned: false,
    earnedDate: null,
  },
];

export const leaderboard = [
  {
    id: 'student-1',
    name: 'Alex Johnson',
    avatar: '/avatars/alex.png',
    points: 2450,
    xp: 8750,
    level: 12,
    class: '10A',
    streak: 15,
  },
  {
    id: 'student-2',
    name: 'Sam Williams',
    avatar: '/avatars/sam.png',
    points: 2380,
    xp: 8200,
    level: 11,
    class: '10A',
    streak: 12,
  },
  {
    id: 'student-3',
    name: 'Taylor Chen',
    avatar: '/avatars/taylor.png',
    points: 2290,
    xp: 7800,
    level: 10,
    class: '10B',
    streak: 10,
  },
  {
    id: 'student-4',
    name: 'Jordan Smith',
    avatar: '/avatars/jordan.png',
    points: 2150,
    xp: 7500,
    level: 10,
    class: '10C',
    streak: 7,
  },
  {
    id: 'student-5',
    name: 'Casey Brown',
    avatar: '/avatars/casey.png',
    points: 2080,
    xp: 7100,
    level: 9,
    class: '10B',
    streak: 5,
  },
];

// Export types and mock data from other files
export { quizzes, type Quiz, type Question } from './mockQuizzesData';
export { lessons, type Lesson } from './mockLessonsData';
export { leaderboardData, badgeTypes, pointsHistory, achievements, type LeaderboardItem } from './mockGamificationData';
