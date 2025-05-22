
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { FileText, Download, Share2, Upload, FileUp, CheckCircle2, Edit2, CheckSquare, CircleSlash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

// Mock data
const subjects = [
  { id: 'math', name: 'Mathematics' },
  { id: 'science', name: 'Science' },
  { id: 'english', name: 'English' },
  { id: 'history', name: 'History' },
  { id: 'geography', name: 'Geography' },
];

const ExamPreparation = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('create');
  const [examTitle, setExamTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [duration, setDuration] = useState('60');
  const [difficultyDistribution, setDifficultyDistribution] = useState({
    easy: 30,
    medium: 40,
    hard: 30,
  });
  
  // For manual creation
  const [questions, setQuestions] = useState([
    { id: 1, text: 'What is the formula for calculating the area of a circle?', difficulty: 'easy' },
    { id: 2, text: 'Solve for x: 3x + 7 = 22', difficulty: 'easy' },
    { id: 3, text: 'If a car travels at 60 mph, how long will it take to travel 150 miles?', difficulty: 'medium' },
    { id: 4, text: 'Find the derivative of f(x) = x³ + 4x² - 2x + 7', difficulty: 'medium' },
    { id: 5, text: 'Prove that the sequence defined by a₁ = 1, aₙ₊₁ = aₙ/2 + 1/aₙ converges to √2.', difficulty: 'hard' }
  ]);
  
  const [newQuestion, setNewQuestion] = useState('');
  const [newQuestionDifficulty, setNewQuestionDifficulty] = useState('medium');
  
  // For question pattern
  const [oneMarkQuestions, setOneMarkQuestions] = useState('5');
  const [twoMarkQuestions, setTwoMarkQuestions] = useState('5');
  const [fiveMarkQuestions, setFiveMarkQuestions] = useState('3');
  const [sevenMarkQuestions, setSevenMarkQuestions] = useState('2');
  const [tenMarkQuestions, setTenMarkQuestions] = useState('1');
  
  // For syllabus-based creation
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [syllabusSubject, setSyllabusSubject] = useState('');
  const [syllabusGrade, setSyllabusGrade] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);
  
  // For syllabus-based question pattern
  const [syllabusOneMarkQuestions, setSyllabusOneMarkQuestions] = useState('5');
  const [syllabusTwoMarkQuestions, setSyllabusTwoMarkQuestions] = useState('5');
  const [syllabusFiveMarkQuestions, setSyllabusFiveMarkQuestions] = useState('3');
  const [syllabusSevenMarkQuestions, setSyllabusSevenMarkQuestions] = useState('2');
  const [syllabusTenMarkQuestions, setSyllabusTenMarkQuestions] = useState('1');
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setUploadedFileName(file.name);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };
  
  const simulateGeneration = () => {
    if (!syllabusSubject || !syllabusGrade || !uploadedFile) {
      toast({
        title: "Missing Information",
        description: "Please select a subject, grade, and upload a document.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          
          // Simulate generated questions
          setGeneratedQuestions([
            { id: 1, text: 'What is the significance of mitochondria in cellular respiration?', type: 'mcq', options: ['Energy production', 'Protein synthesis', 'Cell division', 'Waste removal'], answer: 'Energy production' },
            { id: 2, text: 'Explain the process of photosynthesis and its importance in ecosystems.', type: 'essay' },
            { id: 3, text: 'Calculate the acceleration of an object with a mass of 5kg when a force of 20N is applied.', type: 'problem', answer: '4 m/s²' },
            { id: 4, text: 'Name the four main tissue types in the human body and give an example of each.', type: 'short_answer' },
            { id: 5, text: 'True or False: DNA replication is semiconservative.', type: 'true_false', answer: 'True' },
          ]);
          
          setActiveTab('syllabusPreview');
          toast({
            title: "Questions Generated",
            description: "AI has generated questions based on your syllabus document.",
          });
        }
        return newProgress;
      });
    }, 500);
  };
  
  const addQuestion = () => {
    if (newQuestion.trim() === '') {
      toast({
        title: "Error",
        description: "Question text cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    
    setQuestions([
      ...questions,
      { id: newId, text: newQuestion, difficulty: newQuestionDifficulty }
    ]);
    
    setNewQuestion('');
    setNewQuestionDifficulty('medium');
    
    toast({
      title: "Question Added",
      description: "Your question has been added to the exam.",
    });
  };
  
  const handleDifficultyChange = (type: 'easy' | 'medium' | 'hard', value: number[]) => {
    const newValue = value[0];
    
    // Calculate adjustments for other difficulties to ensure total is 100%
    const others = ['easy', 'medium', 'hard'].filter(d => d !== type) as ('easy' | 'medium' | 'hard')[];
    const currentTotal = difficultyDistribution.easy + difficultyDistribution.medium + difficultyDistribution.hard;
    const currentTypeValue = difficultyDistribution[type];
    const diff = newValue - currentTypeValue;
    
    // Distribute the difference proportionally among other difficulties
    const newDistribution = {...difficultyDistribution, [type]: newValue};
    
    if (diff !== 0) {
      const otherTotal = currentTotal - currentTypeValue;
      if (otherTotal > 0) {
        others.forEach(other => {
          const proportion = difficultyDistribution[other] / otherTotal;
          const adjustment = Math.round(diff * proportion * -1);
          newDistribution[other] = Math.max(0, Math.min(100, difficultyDistribution[other] + adjustment));
        });
      } else {
        // If other values were zero, distribute equally
        others.forEach(other => {
          newDistribution[other] = Math.max(0, Math.min(100, (100 - newValue) / others.length));
        });
      }
    }
    
    // Ensure total is exactly 100%
    const newTotal = newDistribution.easy + newDistribution.medium + newDistribution.hard;
    if (newTotal !== 100) {
      const lastAdjustment = 100 - newTotal;
      // Add the remainder to the last difficulty that's not the one being changed
      newDistribution[others[others.length - 1]] += lastAdjustment;
    }
    
    setDifficultyDistribution(newDistribution);
  };
  
  const handleCreateExam = () => {
    if (!examTitle || !subject || !grade) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (questions.length < 3) {
      toast({
        title: "Not Enough Questions",
        description: "Please add at least 3 questions to create an exam.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Exam Created",
      description: "Your exam has been created successfully.",
    });
    
    setActiveTab('preview');
  };
  
  const handleSavePattern = (isManual: boolean) => {
    toast({
      title: "Pattern Saved",
      description: "Your exam pattern has been saved successfully.",
    });
  };
  
  const handleDownload = () => {
    toast({
      title: "Downloading Exam",
      description: "Your exam is being prepared for download.",
    });
    
    // In a real app, this would generate and download a PDF
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Your exam has been downloaded successfully.",
      });
    }, 1500);
  };
  
  const handleShare = () => {
    toast({
      title: "Exam Shared",
      description: "Your exam has been shared with students.",
    });
  };
  
  const renderQuestionEditForm = (question: any, index: number) => {
    switch(question.type) {
      case 'mcq':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Options</Label>
              <div className="text-sm text-inlustro-purple">Answer: {question.answer}</div>
            </div>
            {question.options.map((option: string, i: number) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${question.answer === option ? 'bg-inlustro-purple text-white border-inlustro-purple' : 'border-gray-300'}`}>
                  {question.answer === option && <CheckSquare className="w-3 h-3" />}
                </div>
                <Input value={option} className="rounded-full" onChange={() => {}} />
              </div>
            ))}
          </div>
        );
      case 'essay':
        return (
          <div className="space-y-3">
            <Label>Answer Guidelines</Label>
            <Textarea 
              placeholder="Enter expected key points for the essay answer..."
              className="min-h-[100px] rounded-xl"
            />
          </div>
        );
      case 'problem':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Answer</Label>
              <div className="text-sm text-inlustro-purple">Expected: {question.answer}</div>
            </div>
            <Input value={question.answer} className="rounded-full" onChange={() => {}} />
          </div>
        );
      case 'true_false':
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${question.answer === 'True' ? 'bg-inlustro-purple text-white border-inlustro-purple' : 'border-gray-300'}`}>
                  {question.answer === 'True' && <CheckSquare className="w-3 h-3" />}
                </div>
                <span>True</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${question.answer === 'False' ? 'bg-inlustro-purple text-white border-inlustro-purple' : 'border-gray-300'}`}>
                  {question.answer === 'False' && <CheckSquare className="w-3 h-3" />}
                </div>
                <span>False</span>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-3">
            <Label>Answer Guidelines</Label>
            <Input placeholder="Sample answer or guidelines" className="rounded-full" />
          </div>
        );
    }
  };
  
  // Question pattern component for reuse
  const QuestionPatternSection = ({ 
    oneMarkValue,
    setOneMarkValue,
    twoMarkValue,
    setTwoMarkValue,
    fiveMarkValue,
    setFiveMarkValue,
    sevenMarkValue,
    setSevenMarkValue,
    tenMarkValue,
    setTenMarkValue,
    onSave,
  }: {
    oneMarkValue: string;
    setOneMarkValue: (value: string) => void;
    twoMarkValue: string;
    setTwoMarkValue: (value: string) => void;
    fiveMarkValue: string;
    setFiveMarkValue: (value: string) => void;
    sevenMarkValue: string;
    setSevenMarkValue: (value: string) => void;
    tenMarkValue: string;
    setTenMarkValue: (value: string) => void;
    onSave: () => void;
  }) => {
    // Calculate estimated total
    const estimatedTotal = 
      parseInt(oneMarkValue || '0') * 1 + 
      parseInt(twoMarkValue || '0') * 2 + 
      parseInt(fiveMarkValue || '0') * 5 + 
      parseInt(sevenMarkValue || '0') * 7 + 
      parseInt(tenMarkValue || '0') * 10;
    
    const totalQuestions = 
      parseInt(oneMarkValue || '0') + 
      parseInt(twoMarkValue || '0') + 
      parseInt(fiveMarkValue || '0') + 
      parseInt(sevenMarkValue || '0') + 
      parseInt(tenMarkValue || '0');
    
    return (
      <Card className="rounded-3xl shadow-inlustro border-0">
        <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
          <CardTitle>Set Exam Pattern</CardTitle>
          <CardDescription>Define the number of questions for each mark category.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="one-mark">1-Mark Questions</Label>
              <Input
                id="one-mark"
                type="number"
                min="0"
                value={oneMarkValue}
                onChange={(e) => setOneMarkValue(e.target.value)}
                className="rounded-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="two-mark">2-Mark Questions</Label>
              <Input
                id="two-mark"
                type="number"
                min="0"
                value={twoMarkValue}
                onChange={(e) => setTwoMarkValue(e.target.value)}
                className="rounded-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="five-mark">5-Mark Questions</Label>
              <Input
                id="five-mark"
                type="number"
                min="0"
                value={fiveMarkValue}
                onChange={(e) => setFiveMarkValue(e.target.value)}
                className="rounded-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="seven-mark">7-Mark Questions</Label>
              <Input
                id="seven-mark"
                type="number"
                min="0"
                value={sevenMarkValue}
                onChange={(e) => setSevenMarkValue(e.target.value)}
                className="rounded-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ten-mark">10/15-Mark Questions</Label>
              <Input
                id="ten-mark"
                type="number"
                min="0"
                value={tenMarkValue}
                onChange={(e) => setTenMarkValue(e.target.value)}
                className="rounded-full"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between mt-6 pt-4 border-t">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Questions: <span className="font-medium text-inlustro-purple">{totalQuestions}</span></p>
              <p className="text-sm text-muted-foreground">Estimated Total Marks: <span className="font-medium text-inlustro-purple">{estimatedTotal}</span></p>
            </div>
            <Button 
              onClick={onSave}
              className="ml-auto mt-2 rounded-full bg-inlustro-purple hover:bg-inlustro-purple/90"
            >
              Save Pattern
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Exam Preparation</h1>
        <p className="text-muted-foreground">Create, preview, and share exam papers.</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full max-w-4xl rounded-full p-1 bg-gray-100">
          <TabsTrigger value="create" className="rounded-full data-[state=active]:bg-inlustro-purple data-[state=active]:text-white">Manual Create</TabsTrigger>
          <TabsTrigger value="syllabus" className="rounded-full data-[state=active]:bg-inlustro-purple data-[state=active]:text-white">Syllabus Based</TabsTrigger>
          <TabsTrigger value="preview" className="rounded-full data-[state=active]:bg-inlustro-purple data-[state=active]:text-white">Preview</TabsTrigger>
          <TabsTrigger value="syllabusPreview" className="rounded-full data-[state=active]:bg-inlustro-purple data-[state=active]:text-white">Syllabus Preview</TabsTrigger>
          <TabsTrigger value="share" className="rounded-full data-[state=active]:bg-inlustro-purple data-[state=active]:text-white">Share</TabsTrigger>
        </TabsList>
        
        {/* Manual Exam Creation Tab */}
        <TabsContent value="create" className="space-y-6">
          <Card className="rounded-3xl shadow-inlustro border-0">
            <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
              <CardTitle>Exam Details</CardTitle>
              <CardDescription>Enter the basic information about your exam.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="exam-title">Exam Title</Label>
                  <Input 
                    id="exam-title" 
                    value={examTitle} 
                    onChange={(e) => setExamTitle(e.target.value)} 
                    placeholder="e.g., Mid-Term Mathematics Exam" 
                    className="rounded-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger id="subject" className="rounded-full">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {subjects.map(subject => (
                        <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger id="grade" className="rounded-full">
                      <SelectValue placeholder="Select a grade" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((gradeNum) => (
                        <SelectItem key={gradeNum} value={gradeNum.toString()}>
                          Grade {gradeNum}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input 
                    id="duration" 
                    value={duration} 
                    onChange={(e) => setDuration(e.target.value)} 
                    type="number" 
                    min="15" 
                    max="180" 
                    className="rounded-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="rounded-3xl shadow-inlustro border-0">
            <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
              <CardTitle>Difficulty Distribution</CardTitle>
              <CardDescription>Set the percentage of questions at each difficulty level.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Easy</Label>
                    <span className="text-sm font-medium text-inlustro-purple">{difficultyDistribution.easy}%</span>
                  </div>
                  <Slider
                    value={[difficultyDistribution.easy]}
                    onValueChange={(value) => handleDifficultyChange('easy', value)}
                    min={0}
                    max={100}
                    step={5}
                    className="py-2"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Medium</Label>
                    <span className="text-sm font-medium text-inlustro-purple">{difficultyDistribution.medium}%</span>
                  </div>
                  <Slider
                    value={[difficultyDistribution.medium]}
                    onValueChange={(value) => handleDifficultyChange('medium', value)}
                    min={0}
                    max={100}
                    step={5}
                    className="py-2"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Hard</Label>
                    <span className="text-sm font-medium text-inlustro-purple">{difficultyDistribution.hard}%</span>
                  </div>
                  <Slider
                    value={[difficultyDistribution.hard]}
                    onValueChange={(value) => handleDifficultyChange('hard', value)}
                    min={0}
                    max={100}
                    step={5}
                    className="py-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="rounded-3xl shadow-inlustro border-0">
            <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
              <CardTitle>Questions</CardTitle>
              <CardDescription>Add questions to your exam.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-4">
                {questions.map((question) => (
                  <div 
                    key={question.id} 
                    className="p-4 border rounded-xl flex flex-col space-y-2 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Question {question.id}</span>
                      <span 
                        className={`text-xs px-3 py-1 rounded-full ${
                          question.difficulty === 'easy' 
                            ? 'bg-green-100 text-green-800' 
                            : question.difficulty === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm">{question.text}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="new-question">Add New Question</Label>
                  <Textarea
                    id="new-question"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Enter your question here..."
                    className="min-h-[100px] rounded-xl"
                  />
                </div>
                
                <div className="flex flex-wrap gap-4 items-end">
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select 
                      value={newQuestionDifficulty} 
                      onValueChange={setNewQuestionDifficulty}
                    >
                      <SelectTrigger id="difficulty" className="w-[180px] rounded-full">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={addQuestion} 
                    className="rounded-full bg-inlustro-purple hover:bg-inlustro-purple/90"
                  >
                    Add Question
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Question Pattern Section for Manual Create */}
          <QuestionPatternSection 
            oneMarkValue={oneMarkQuestions}
            setOneMarkValue={setOneMarkQuestions}
            twoMarkValue={twoMarkQuestions}
            setTwoMarkValue={setTwoMarkQuestions}
            fiveMarkValue={fiveMarkQuestions}
            setFiveMarkValue={setFiveMarkQuestions}
            sevenMarkValue={sevenMarkQuestions}
            setSevenMarkValue={setSevenMarkQuestions}
            tenMarkValue={tenMarkQuestions}
            setTenMarkValue={setTenMarkQuestions}
            onSave={() => handleSavePattern(true)}
          />
          
          <div className="flex justify-end">
            <Button 
              onClick={handleCreateExam} 
              className="rounded-full bg-inlustro-purple hover:bg-inlustro-purple/90"
            >
              Create Exam
            </Button>
          </div>
        </TabsContent>
        
        {/* Syllabus-Based Exam Creation Tab */}
        <TabsContent value="syllabus" className="space-y-6">
          <Card className="rounded-3xl shadow-inlustro border-0">
            <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
              <CardTitle>Upload Syllabus Document</CardTitle>
              <CardDescription>Upload your curriculum or syllabus to auto-generate relevant exam questions.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="syllabus-subject">Subject</Label>
                    <Select value={syllabusSubject} onValueChange={setSyllabusSubject}>
                      <SelectTrigger id="syllabus-subject" className="rounded-full">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {subjects.map(subject => (
                          <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="syllabus-grade">Grade</Label>
                    <Select value={syllabusGrade} onValueChange={setSyllabusGrade}>
                      <SelectTrigger id="syllabus-grade" className="rounded-full">
                        <SelectValue placeholder="Select a grade" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((gradeNum) => (
                          <SelectItem key={gradeNum} value={gradeNum.toString()}>
                            Grade {gradeNum}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center items-center p-8 border-2 border-dashed rounded-3xl bg-gray-50 border-gray-200 h-full">
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-inlustro-purple/10 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-inlustro-purple" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Upload your document</h3>
                      <p className="text-sm text-muted-foreground">PDF, DOCX or TXT up to 10MB</p>
                    </div>
                    <div className="relative">
                      <Input 
                        type="file" 
                        id="file-upload" 
                        className="sr-only"
                        accept=".pdf,.docx,.txt"
                        onChange={handleFileUpload}
                      />
                      <Label 
                        htmlFor="file-upload" 
                        className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-inlustro-purple px-4 py-2 text-sm font-medium text-white hover:bg-inlustro-purple/90 focus:outline-none"
                      >
                        <FileUp className="h-4 w-4" />
                        Choose file
                      </Label>
                    </div>
                    {uploadedFileName && (
                      <div className="flex items-center gap-2 text-sm font-medium text-inlustro-purple">
                        <FileText className="h-4 w-4" />
                        {uploadedFileName}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {uploadedFile && syllabusSubject && syllabusGrade && !isGenerating && (
            <QuestionPatternSection 
              oneMarkValue={syllabusOneMarkQuestions}
              setOneMarkValue={setSyllabusOneMarkQuestions}
              twoMarkValue={syllabusTwoMarkQuestions}
              setTwoMarkValue={setSyllabusTwoMarkQuestions}
              fiveMarkValue={syllabusFiveMarkQuestions}
              setFiveMarkValue={setSyllabusFiveMarkQuestions}
              sevenMarkValue={syllabusSevenMarkQuestions}
              setSevenMarkValue={setSyllabusSevenMarkQuestions}
              tenMarkValue={syllabusTenMarkQuestions}
              setTenMarkValue={setSyllabusTenMarkQuestions}
              onSave={() => handleSavePattern(false)}
            />
          )}
          
          {isGenerating ? (
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium">
                <span>Generating questions...</span>
                <span>{generationProgress}%</span>
              </div>
              <Progress value={generationProgress} className="h-2" />
            </div>
          ) : (
            <div className="flex justify-end">
              <Button 
                onClick={simulateGeneration}
                className="rounded-full bg-inlustro-purple hover:bg-inlustro-purple/90"
                disabled={!uploadedFile || !syllabusSubject || !syllabusGrade}
              >
                Generate Questions
              </Button>
            </div>
          )}
        </TabsContent>
        
        {/* Manual Preview Tab */}
        <TabsContent value="preview" className="space-y-6">
          <Card className="rounded-3xl shadow-inlustro border-0">
            <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
              <div className="flex items-center justify-between">
                <CardTitle>Exam Preview</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleDownload} 
                    className="rounded-full h-10 w-10"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleShare}
                    className="rounded-full h-10 w-10"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>Preview how your exam will appear to students.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="border rounded-2xl p-6 space-y-8 bg-white shadow-sm">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">
                    {examTitle || "Exam Title"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {subjects.find(s => s.id === subject)?.name || "Subject"} - Grade {grade || "X"}
                  </p>
                  <p className="text-sm text-muted-foreground">Duration: {duration || "60"} minutes</p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium border-b pb-2">Instructions</h3>
                  <p className="text-sm">
                    Answer all questions. Show your work where applicable. 
                    Each question is marked with its difficulty level.
                  </p>
                </div>
                
                <div className="space-y-8">
                  {questions.map((question, index) => (
                    <div key={question.id} className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Question {index + 1}</h4>
                        <span 
                          className={`text-xs px-3 py-1 rounded-full ${
                            question.difficulty === 'easy' 
                              ? 'bg-green-100 text-green-800' 
                              : question.difficulty === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm">{question.text}</p>
                      <div className="h-10 border-b border-dotted" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Syllabus Preview Tab */}
        <TabsContent value="syllabusPreview" className="space-y-6">
          <Card className="rounded-3xl shadow-inlustro border-0">
            <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
              <div className="flex items-center justify-between">
                <CardTitle>Generated Exam Preview</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleDownload}
                    className="rounded-full h-10 w-10"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleShare}
                    className="rounded-full h-10 w-10"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>
                AI-generated questions based on your syllabus. You can edit these questions before finalizing.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="border rounded-2xl p-6 space-y-6 bg-white shadow-sm">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">
                    {subjects.find(s => s.id === syllabusSubject)?.name || "Subject"} Exam
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Grade {syllabusGrade || "X"} - Based on {uploadedFileName || "uploaded syllabus"}
                  </p>
                </div>
                
                <div className="space-y-6">
                  {generatedQuestions.map((question, index) => (
                    <div key={question.id} className="border rounded-xl p-4 space-y-4 bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="bg-inlustro-purple text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </span>
                          <h4 className="font-medium">
                            {question.text}
                          </h4>
                        </div>
                        <Button variant="ghost" size="sm" className="text-inlustro-purple hover:text-inlustro-purple/80">
                          <Edit2 className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </div>
                      
                      <div className="pl-8 space-y-3">
                        <div className="text-xs uppercase tracking-wide text-gray-500 font-medium">
                          {question.type === 'mcq' ? 'Multiple Choice' : 
                            question.type === 'essay' ? 'Essay Question' :
                            question.type === 'problem' ? 'Problem Solving' :
                            question.type === 'true_false' ? 'True/False' :
                            'Short Answer'}
                        </div>
                        
                        {renderQuestionEditForm(question, index)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-6">
                  <Button variant="outline" className="rounded-full" onClick={() => setActiveTab('syllabus')}>
                    Go Back
                  </Button>
                  <Button className="rounded-full bg-inlustro-purple hover:bg-inlustro-purple/90">
                    Finalize Exam
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Share Tab */}
        <TabsContent value="share" className="space-y-6">
          <Card className="rounded-3xl shadow-inlustro border-0">
            <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
              <CardTitle>Share Exam</CardTitle>
              <CardDescription>Share your exam with students or classes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-4">
                <Label>Exam Link</Label>
                <div className="flex">
                  <Input 
                    value="https://inlustro.edu/exams/math-midterm-2025" 
                    readOnly 
                    className="rounded-l-full" 
                  />
                  <Button className="rounded-r-full bg-inlustro-purple hover:bg-inlustro-purple/90">Copy</Button>
                </div>
              </div>
              
              <div className="space-y-4 pt-6">
                <Label>Share with Class</Label>
                <Select>
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="class-10a">Class 10A</SelectItem>
                    <SelectItem value="class-10b">Class 10B</SelectItem>
                    <SelectItem value="class-10c">Class 10C</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="mt-2 rounded-full bg-inlustro-purple hover:bg-inlustro-purple/90">Share with Class</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamPreparation;
