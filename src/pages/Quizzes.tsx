
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertCircle, FileText, FileCheck } from 'lucide-react';
import { subjects, quizzes as allQuizzes, type Quiz } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const Quizzes = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizzes, setQuizzes] = useState(allQuizzes);

  const filteredQuizzes = quizzes.filter(quiz => {
    const subjectMatch = selectedSubject === 'all' || quiz.subject === selectedSubject;
    
    // Check if we have difficulty breakdown for filtering
    let difficultyMatch = true;
    if (selectedDifficulty !== 'all') {
      difficultyMatch = false;
      
      // Check if quiz has non-zero percentage of selected difficulty
      if (selectedDifficulty === 'easy' && quiz.difficultyBreakdown.easy > 0) {
        difficultyMatch = true;
      } else if (selectedDifficulty === 'medium' && quiz.difficultyBreakdown.medium > 0) {
        difficultyMatch = true;
      } else if (selectedDifficulty === 'hard' && quiz.difficultyBreakdown.hard > 0) {
        difficultyMatch = true;
      }
    }
    
    return subjectMatch && difficultyMatch;
  });

  const getDifficultyBadge = (quiz: Quiz) => {
    if (quiz.difficultyBreakdown.hard >= 50) {
      return <Badge variant="outline" className="bg-red-100 text-red-800">Hard</Badge>;
    } else if (quiz.difficultyBreakdown.medium >= 50) {
      return <Badge variant="outline" className="bg-amber-100 text-amber-800">Medium</Badge>;
    } else {
      return <Badge variant="outline" className="bg-green-100 text-green-800">Easy</Badge>;
    }
  };

  const getSubjectName = (id: string) => {
    const subject = subjects.find(subject => subject.id === id);
    return subject ? subject.name : id;
  };

  const takeQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Quizzes</h1>
        <p className="text-muted-foreground">Test your knowledge with these interactive quizzes.</p>
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-full sm:w-auto">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map(subject => (
                <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full sm:w-auto">
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredQuizzes.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredQuizzes.map(quiz => (
            <Card key={quiz.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-sm font-medium text-inlustro-blue">
                    {getSubjectName(quiz.subject)}
                  </CardDescription>
                  {getDifficultyBadge(quiz)}
                </div>
                <CardTitle className="line-clamp-1 mt-1">{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-sm text-muted-foreground">{quiz.description}</p>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span>Questions: {quiz.totalQuestions}</span>
                    <span>Time: {quiz.timeLimit} min</span>
                  </div>
                  
                  {quiz.completed && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium">Your Score: {quiz.score}%</span>
                        <span className={quiz.score && quiz.score >= 70 ? 'text-green-600' : 'text-amber-600'}>
                          {quiz.score && quiz.score >= 70 ? 'Passed' : 'Try Again'}
                        </span>
                      </div>
                      <Progress value={quiz.score} className="h-1.5" />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 pt-2">
                    {quiz.completed ? (
                      <Badge className="flex items-center gap-1 bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3" />
                        <span>Completed</span>
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Not Attempted</span>
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  className="w-full"
                  variant={quiz.completed ? "outline" : "default"}
                  onClick={() => takeQuiz(quiz)}
                >
                  {quiz.completed ? (
                    <>
                      <FileCheck className="mr-1 h-4 w-4" />
                      Review Quiz
                    </>
                  ) : (
                    <>
                      <FileText className="mr-1 h-4 w-4" />
                      Start Quiz
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-lg font-medium">No quizzes found</h3>
          <p className="text-sm text-muted-foreground">Try changing your filters or check back later.</p>
        </div>
      )}

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        {selectedQuiz && (
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle>{selectedQuiz.title}</DialogTitle>
                {getDifficultyBadge(selectedQuiz)}
              </div>
              <DialogDescription>
                {getSubjectName(selectedQuiz.subject)} - {selectedQuiz.timeLimit} minutes
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4 space-y-6">
              {selectedQuiz.completed ? (
                <div className="rounded-lg bg-muted p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-medium">Your Results</h3>
                    <Badge className={selectedQuiz.score && selectedQuiz.score >= 70 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                      {selectedQuiz.score && selectedQuiz.score >= 70 ? 'Passed' : 'Try Again'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Score</span>
                      <span className="font-medium">{selectedQuiz.score}%</span>
                    </div>
                    <Progress value={selectedQuiz.score} className="h-2" />
                  </div>
                </div>
              ) : (
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="mb-2 text-lg font-medium">Quiz Instructions</h3>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    <li>This quiz contains {selectedQuiz.totalQuestions} questions</li>
                    <li>You have {selectedQuiz.timeLimit} minutes to complete it</li>
                    <li>Each question has one correct answer</li>
                    <li>You need 70% to pass this quiz</li>
                  </ul>
                </div>
              )}
              
              <div>
                <h3 className="mb-3 text-lg font-medium">Questions Preview</h3>
                <div className="space-y-4">
                  {selectedQuiz.questions.slice(0, 2).map((question, index) => (
                    <div key={question.id} className="rounded-lg border p-4">
                      <h4 className="mb-2 font-medium">
                        {index + 1}. {question.text}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)} ({question.points} pts)
                      </Badge>
                    </div>
                  ))}
                  
                  {selectedQuiz.questions.length > 2 && (
                    <p className="text-center text-sm text-muted-foreground">
                      + {selectedQuiz.questions.length - 2} more questions
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <DialogFooter className="mt-6">
              <Button onClick={() => setSelectedQuiz(null)} variant="outline">Close Preview</Button>
              {!selectedQuiz.completed && (
                <Button onClick={() => {
                  setSelectedQuiz(null);
                  toast({
                    title: "Quiz started!",
                    description: "Good luck with your quiz."
                  });
                }}>Start Quiz</Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Quizzes;
