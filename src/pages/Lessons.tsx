
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
import { CheckCircle, Clock, AlertCircle, Headphones, BookOpen, GraduationCap } from 'lucide-react';
import { subjects, lessons as allLessons, Lesson } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Lessons = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [lessons, setLessons] = useState(allLessons);

  const filteredLessons = lessons.filter(lesson => {
    const subjectMatch = selectedSubject === 'all' || lesson.subject === selectedSubject;
    const statusMatch = selectedStatus === 'all' || lesson.status === selectedStatus;
    return subjectMatch && statusMatch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-inlustro-yellow-dark" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-inlustro-yellow-light text-inlustro-yellow-dark';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubjectName = (id: string) => {
    const subject = subjects.find(subject => subject.id === id);
    return subject ? subject.name : id;
  };

  const getSubjectIcon = (id: string) => {
    const subjectName = getSubjectName(id).toLowerCase();
    if (subjectName.includes('math')) return <span className="text-blue-500">∑</span>;
    if (subjectName.includes('science')) return <span className="text-green-500">⚗️</span>;
    if (subjectName.includes('english')) return <span className="text-purple-500">📚</span>;
    if (subjectName.includes('history')) return <span className="text-amber-500">🏺</span>;
    return <BookOpen className="h-4 w-4" />;
  };

  const handleMarkComplete = () => {
    if (selectedLesson) {
      const updatedLessons = lessons.map(lesson =>
        lesson.id === selectedLesson.id ? { ...lesson, status: 'Completed' } : lesson
      );
      setLessons(updatedLessons as Lesson[]);
      setSelectedLesson(null);
      toast({
        title: "Lesson completed!",
        description: "Your progress has been updated.",
      });
    }
  };

  const openAITutor = (lesson: Lesson) => {
    // In a real app, this would navigate to the AI Tutor with the specific lesson ID
    navigate('/ai-tutor', { state: { lessonId: lesson.id } });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Lessons</h1>
        <p className="text-muted-foreground">Explore lessons across different subjects.</p>
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
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Not Started">Not Started</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredLessons.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLessons.map(lesson => (
            <Card key={lesson.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getSubjectIcon(lesson.subject)}
                    <CardDescription className="text-sm font-medium text-inlustro-blue">
                      {getSubjectName(lesson.subject)}
                    </CardDescription>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusClass(lesson.status)}`}>
                    {getStatusIcon(lesson.status)}
                    <span className="ml-1">{lesson.status}</span>
                  </span>
                </div>
                <CardTitle className="line-clamp-1 mt-1">{lesson.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-sm text-muted-foreground">{lesson.description || "Learn about this fascinating topic with our interactive lessons."}</p>
                
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {lesson.duration} minutes
                  </Badge>
                  {lesson.hasVoiceTutor && (
                    <Badge variant="outline" className="flex items-center gap-1 bg-inlustro-blue-light text-inlustro-blue-dark">
                      <Headphones className="h-3 w-3" />
                      AI Voice Tutor
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-2 pt-0">
                <Button 
                  variant="outline"
                  onClick={() => setSelectedLesson(lesson)}
                >
                  <BookOpen className="mr-1 h-4 w-4" />
                  View Lesson
                </Button>
                {lesson.hasVoiceTutor && (
                  <Button 
                    variant="default"
                    onClick={() => openAITutor(lesson)}
                    className="bg-gradient-to-r from-inlustro-blue to-inlustro-blue-dark"
                  >
                    <Headphones className="mr-1 h-4 w-4" />
                    AI Tutor
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-lg font-medium">No lessons found</h3>
          <p className="text-sm text-muted-foreground">Try changing your filters to find lessons.</p>
        </div>
      )}

      <Dialog open={!!selectedLesson} onOpenChange={() => setSelectedLesson(null)}>
        {selectedLesson && (
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getSubjectIcon(selectedLesson.subject)}
                {selectedLesson.title}
              </DialogTitle>
              <DialogDescription>
                {getSubjectName(selectedLesson.subject)} - {selectedLesson.duration} minutes
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4 space-y-4">
              {selectedLesson.hasVoiceTutor && (
                <Card className="bg-inlustro-blue-light/20 border-inlustro-blue">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-inlustro-blue" />
                      <span className="font-medium">This lesson has an interactive AI Voice Tutor</span>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedLesson(null);
                        openAITutor(selectedLesson);
                      }}
                    >
                      <Headphones className="mr-1 h-4 w-4" />
                      Start Voice Lesson
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              <div dangerouslySetInnerHTML={{ __html: selectedLesson.content }} />
            </div>
            
            <DialogFooter className="mt-6 flex items-center justify-between sm:justify-between">
              <Badge variant="outline" className={`flex items-center gap-1 ${getStatusClass(selectedLesson.status)}`}>
                {getStatusIcon(selectedLesson.status)}
                <span className="ml-1">{selectedLesson.status}</span>
              </Badge>
              
              {selectedLesson.status !== 'Completed' && (
                <Button onClick={handleMarkComplete}>Mark as Completed</Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Lessons;
