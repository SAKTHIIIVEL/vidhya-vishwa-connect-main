
export interface Lesson {
  id: string;
  title: string;
  subject: string;
  grade: string;
  description: string;
  duration: number; // in minutes
  content: string;
  objectives: string[];
  resources: {
    type: 'document' | 'video' | 'link';
    title: string;
    url: string;
  }[];
  createdAt: string;
  createdBy: string;
  status: 'Not Started' | 'In Progress' | 'Completed'; // Changed for UI compatibility
  hasVoiceTutor?: boolean; // Added for UI compatibility
}

export const lessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "Introduction to Algebra",
    subject: "Mathematics",
    grade: "9th Grade",
    description: "Basic algebraic concepts and equations",
    duration: 45,
    content: `
      # Introduction to Algebra
      
      Algebra is a branch of mathematics that uses symbols to represent quantities and express relationships.
      
      ## Key Concepts
      
      - Variables and constants
      - Expressions and equations
      - Solving linear equations
      - Real-world applications
      
      ## Example Problems
      
      1. Solve for x: 2x + 5 = 15
      2. If a rectangle has length 2x and width x+3, express its area as a function of x
      3. A train travels at v km/h for t hours. Express the total distance traveled.
    `,
    objectives: [
      "Understand basic algebraic notation",
      "Solve simple linear equations",
      "Apply algebraic concepts to word problems",
      "Recognize patterns and relationships"
    ],
    resources: [
      {
        type: "document",
        title: "Algebra Workbook",
        url: "/resources/algebra-workbook.pdf"
      },
      {
        type: "video",
        title: "Introduction to Variables",
        url: "https://example.com/algebra-intro"
      }
    ],
    createdAt: "2024-04-15T08:30:00Z",
    createdBy: "Teacher Smith",
    status: "Completed",
    hasVoiceTutor: true
  },
  {
    id: "lesson-2",
    title: "Shakespeare's Macbeth",
    subject: "English Literature",
    grade: "11th Grade",
    description: "Analysis of themes and characters in Macbeth",
    duration: 60,
    content: `
      # Macbeth: Themes and Characters
      
      ## Major Themes
      
      - Ambition and its consequences
      - Fate vs. free will
      - Appearance vs. reality
      - Nature and the unnatural
      
      ## Key Characters
      
      - Macbeth: A brave Scottish general who receives a prophecy that he will become King
      - Lady Macbeth: Macbeth's wife who encourages him to kill King Duncan
      - The Three Witches: Supernatural beings who prophesize Macbeth's rise to power
      - Banquo: Macbeth's friend who also receives prophecies from the witches
    `,
    objectives: [
      "Analyze the tragic elements in Macbeth",
      "Discuss the role of supernatural elements in the play",
      "Evaluate the character development of Macbeth",
      "Identify and interpret key themes in the play"
    ],
    resources: [
      {
        type: "document",
        title: "Macbeth Full Text",
        url: "/resources/macbeth.pdf"
      },
      {
        type: "link",
        title: "Character Analysis Guide",
        url: "https://example.com/macbeth-characters"
      }
    ],
    createdAt: "2024-04-18T10:15:00Z",
    createdBy: "Teacher Jones",
    status: "In Progress",
    hasVoiceTutor: false
  },
  {
    id: "lesson-3",
    title: "Introduction to Chemical Reactions",
    subject: "Chemistry",
    grade: "10th Grade",
    description: "Basic principles of chemical reactions and balancing equations",
    duration: 55,
    content: `
      # Chemical Reactions
      
      A chemical reaction is a process that leads to the transformation of one set of chemical substances to another.
      
      ## Types of Chemical Reactions
      
      1. Synthesis (Combination)
      2. Decomposition
      3. Single Replacement
      4. Double Replacement
      5. Combustion
      
      ## Balancing Chemical Equations
      
      Chemical equations must be balanced to satisfy the law of conservation of mass.
      
      Example:
      Unbalanced: H₂ + O₂ → H₂O
      Balanced: 2H₂ + O₂ → 2H₂O
    `,
    objectives: [
      "Identify different types of chemical reactions",
      "Balance chemical equations",
      "Predict products of simple chemical reactions",
      "Understand the law of conservation of mass"
    ],
    resources: [
      {
        type: "document",
        title: "Chemical Reactions Worksheet",
        url: "/resources/chem-reactions.pdf"
      },
      {
        type: "video",
        title: "Balancing Chemical Equations",
        url: "https://example.com/balancing-equations"
      }
    ],
    createdAt: "2024-04-22T13:45:00Z",
    createdBy: "Teacher Wilson",
    status: "Not Started",
    hasVoiceTutor: true
  }
];
