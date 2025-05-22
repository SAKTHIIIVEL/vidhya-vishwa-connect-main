
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward, Repeat, HelpCircle, MessageSquare } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

// Mock data for lesson content
const lessonData = [
  {
    id: '1',
    title: 'Introduction to Algebra',
    description: 'Learn the basics of algebraic expressions and equations.',
    transcript: 'Welcome to the introduction to algebra. Algebra is a branch of mathematics that uses symbols and letters to represent numbers, quantities, and operations in formulas and equations. In this lesson, we\'ll explore the basic concepts of algebraic expressions and how to manipulate them. We\'ll start with understanding variables, constants, and coefficients...',
    audioLength: 180, // seconds
    subject: 'Math',
    keyPoints: [
      'Algebra uses symbols to represent unknown values',
      'Variables are letters that represent changing values',
      'Equations show relationships between expressions',
      'Algebraic expressions can be simplified and solved'
    ],
    comingUpNext: 'Solving Simple Equations'
  },
  {
    id: '2',
    title: 'Photosynthesis Explained',
    description: 'Discover how plants convert sunlight into energy.',
    transcript: 'In this lesson, we\'ll explore photosynthesis, the process by which plants convert sunlight into chemical energy. Plants are unique organisms that can create their own food using light energy from the sun, carbon dioxide from the air, and water from the soil. Through a series of complex chemical reactions, these simple ingredients are transformed into glucose and oxygen...',
    audioLength: 210, // seconds
    subject: 'Science',
    keyPoints: [
      'Plants convert sunlight into chemical energy',
      'Carbon dioxide + water + light → glucose + oxygen',
      'Chlorophyll is the key molecule that captures light',
      'Photosynthesis occurs in the chloroplasts'
    ],
    comingUpNext: 'The Cellular Respiration Process'
  },
  {
    id: '3',
    title: 'Understanding Shakespeare',
    description: 'Explore the themes and language in Shakespeare\'s works.',
    transcript: 'William Shakespeare is considered one of the greatest writers in the English language. His plays and sonnets continue to be studied and performed centuries after his death. In this lesson, we\'ll examine some of the common themes in Shakespeare\'s works, including love, power, ambition, and fate. We\'ll also look at the unique language and poetic devices Shakespeare employed...',
    audioLength: 195, // seconds
    subject: 'English',
    keyPoints: [
      'Shakespeare wrote 37 plays and 154 sonnets',
      'Common themes include love, power, and fate',
      'Shakespeare invented over 1,700 words',
      'His work uses iambic pentameter extensively'
    ],
    comingUpNext: 'Analyzing Romeo and Juliet'
  }
];

const AIVoiceTutor = () => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [currentPointIndex, setCurrentPointIndex] = useState(0);

  const currentLesson = lessonData[currentLessonIndex];

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    setIsAISpeaking(!isAISpeaking);
    // In a real implementation, this would trigger TTS playback
  };

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setProgress(0);
      setIsPlaying(false);
      setIsAISpeaking(false);
      setCurrentPointIndex(0);
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < lessonData.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setProgress(0);
      setIsPlaying(false);
      setIsAISpeaking(false);
      setCurrentPointIndex(0);
    }
  };

  const handleRepeat = () => {
    setProgress(0);
    setIsPlaying(true);
    setIsAISpeaking(true);
    setCurrentPointIndex(0);
    // In a real implementation, this would restart the current lesson
  };

  const handleAskQuestion = () => {
    // This would open a dialog to ask a question
    alert("Question feature would be connected to the backend AI system");
  };

  const handleExplainDifferently = () => {
    // This would trigger an alternative explanation
    alert("Alternative explanation would be provided by the backend AI system");
  };

  // For demo purposes, simulate progress when playing
  useEffect(() => {
    let interval: number;
    
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            setIsAISpeaking(false);
            return 100;
          }
          // Update the current point being explained
          const pointProgressThreshold = 100 / currentLesson.keyPoints.length;
          const newPointIndex = Math.min(
            Math.floor(prev / pointProgressThreshold),
            currentLesson.keyPoints.length - 1
          );
          
          if (newPointIndex !== currentPointIndex) {
            setCurrentPointIndex(newPointIndex);
          }
          
          return prev + 1;
        });
      }, currentLesson.audioLength * 10); // Speed up for demo
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentLesson, currentPointIndex]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Voice Tutor</h1>
        <p className="text-muted-foreground">Learn through interactive voice lessons</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{currentLesson.title}</CardTitle>
                <CardDescription>
                  {currentLesson.subject} • {Math.floor(currentLesson.audioLength / 60)}:{(currentLesson.audioLength % 60).toString().padStart(2, '0')} minutes
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            {/* AI Avatar with animation */}
            <div className="flex justify-center py-4">
              <div className={`relative rounded-full bg-inlustro-blue-light p-8 transition-all duration-300 ${isAISpeaking ? 'animate-pulse shadow-lg shadow-inlustro-blue/50' : ''}`}>
                <div className="absolute inset-0 rounded-full bg-inlustro-blue/20 animate-ping" 
                     style={{ animationDuration: isAISpeaking ? '1.5s' : '0s' }}></div>
                <MessageSquare size={48} className={`text-inlustro-blue ${isAISpeaking ? 'animate-bounce' : ''}`} />
              </div>
            </div>
            
            {/* Current Point Being Explained */}
            <div className="space-y-4">
              <div className="text-lg font-medium">Currently Explaining:</div>
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <p className="text-lg font-medium">{currentLesson.keyPoints[currentPointIndex]}</p>
              </div>
            </div>
            
            {/* Key Points */}
            <div className="space-y-4">
              <div className="text-lg font-medium">Key Points</div>
              <div className="space-y-2">
                {currentLesson.keyPoints.map((point, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-2 rounded-lg border p-3 transition-all ${
                      index === currentPointIndex && isAISpeaking 
                        ? 'border-inlustro-blue bg-inlustro-blue-light/20' 
                        : index < currentPointIndex 
                          ? 'border-green-200 bg-green-50' 
                          : ''
                    }`}
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-sm font-medium">
                      {index + 1}
                    </span>
                    <p>{point}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Coming Up Next */}
            <div className="space-y-2">
              <div className="text-lg font-medium">Coming Up Next</div>
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-inlustro-yellow-light text-inlustro-yellow-dark">
                      Next Lesson
                    </Badge>
                    <span className="font-medium">{currentLesson.comingUpNext}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button variant="outline" size="icon" onClick={handlePrevious} disabled={currentLessonIndex === 0}>
                <SkipBack className="h-5 w-5" />
                <span className="sr-only">Previous lesson</span>
              </Button>
              <Button onClick={togglePlayback} className="h-12 w-12 rounded-full">
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 translate-x-0.5" />
                )}
                <span className="sr-only">{isPlaying ? 'Pause' : 'Play'} lesson</span>
              </Button>
              <Button variant="outline" size="icon" onClick={handleNext} disabled={currentLessonIndex === lessonData.length - 1}>
                <SkipForward className="h-5 w-5" />
                <span className="sr-only">Next lesson</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleRepeat}>
                <Repeat className="mr-1 h-4 w-4" />
                Repeat
              </Button>
              <Button variant="outline" size="sm" onClick={handleExplainDifferently}>
                Explain Differently
              </Button>
              <Button variant="outline" size="sm" onClick={handleAskQuestion}>
                <HelpCircle className="mr-1 h-4 w-4" />
                Ask a Question
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Right sidebar with transcript */}
        <Card>
          <CardHeader>
            <CardTitle>Lesson Transcript</CardTitle>
            <CardDescription>Full text version of the lesson</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-[500px] overflow-y-auto rounded-md border p-4 bg-muted/50">
              <p className="text-sm">{currentLesson.transcript}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Lessons</CardTitle>
          <CardDescription>Browse other voice lessons</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {lessonData.map((lesson, index) => (
              <Card 
                key={lesson.id}
                className={`cursor-pointer transition-all hover:shadow-md ${currentLessonIndex === index ? 'border-inlustro-blue shadow-sm shadow-inlustro-blue/30' : ''}`}
                onClick={() => {
                  setCurrentLessonIndex(index);
                  setProgress(0);
                  setIsPlaying(false);
                  setIsAISpeaking(false);
                  setCurrentPointIndex(0);
                }}
              >
                <CardHeader className="pb-2">
                  <Badge className="w-fit mb-1">{lesson.subject}</Badge>
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{lesson.description}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    variant={currentLessonIndex === index ? "default" : "outline"} 
                    size="sm"
                    className="w-full"
                  >
                    {currentLessonIndex === index ? "Currently Selected" : "Select Lesson"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIVoiceTutor;
