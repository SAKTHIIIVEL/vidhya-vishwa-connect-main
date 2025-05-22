
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Users, Search, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for teachers
const teachersMockData = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@inlustro.edu',
    avatar: null,
    subject: 'Mathematics',
    qualifications: 'Ph.D. in Mathematics',
    joinDate: '2021-05-15',
    classes: ['10A', '11B', '12A'],
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    email: 'michael.chen@inlustro.edu',
    avatar: null,
    subject: 'Physics',
    qualifications: 'M.Sc. in Physics',
    joinDate: '2020-08-10',
    classes: ['9A', '10B', '12C'],
  },
  {
    id: 3,
    name: 'Mrs. Emily Rodriguez',
    email: 'emily.rodriguez@inlustro.edu',
    avatar: null,
    subject: 'English Literature',
    qualifications: 'M.A. in English Literature',
    joinDate: '2022-01-20',
    classes: ['9C', '10A', '11A'],
  },
  {
    id: 4,
    name: 'Dr. Robert Williams',
    email: 'robert.williams@inlustro.edu',
    avatar: null,
    subject: 'Chemistry',
    qualifications: 'Ph.D. in Chemistry',
    joinDate: '2019-11-05',
    classes: ['10C', '11C', '12B'],
  },
  {
    id: 5,
    name: 'Ms. Jennifer Lee',
    email: 'jennifer.lee@inlustro.edu',
    avatar: null,
    subject: 'History',
    qualifications: 'B.Ed. in History',
    joinDate: '2023-03-15',
    classes: ['9B', '10B', '11B'],
  },
];

const Teachers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<null | any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    qualifications: '',
  });
  
  const filteredTeachers = teachersMockData.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddTeacher = () => {
    // In a real app, this would send data to a backend
    toast({
      title: "Teacher Added",
      description: `${formData.name} has been added to the system.`,
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      qualifications: '',
    });
  };
  
  const handleViewTeacherProfile = (teacher: any) => {
    setSelectedTeacher(teacher);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Teachers</h1>
        <p className="text-muted-foreground">Manage teacher accounts and profiles.</p>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teachers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
              <DialogDescription>
                Enter the details of the new teacher. They will receive an email to set up their account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Dr. Jane Smith"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jane.smith@inlustro.edu"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => handleSelectChange('subject', value)}
                >
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Geography">Geography</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="qualifications">Qualifications</Label>
                <Input
                  id="qualifications"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleInputChange}
                  placeholder="Ph.D. in Mathematics"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddTeacher}>Add Teacher</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeachers.map(teacher => (
          <Card key={teacher.id} className="hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-12 w-12">
                <AvatarImage src={teacher.avatar || ''} />
                <AvatarFallback>
                  {teacher.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{teacher.name}</CardTitle>
                <CardDescription>{teacher.subject}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{teacher.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Classes</p>
                <p className="text-sm text-muted-foreground">{teacher.classes.join(', ')}</p>
              </div>
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleViewTeacherProfile(teacher)}
                >
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {selectedTeacher && (
        <Dialog open={!!selectedTeacher} onOpenChange={() => setSelectedTeacher(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Teacher Profile</DialogTitle>
              <DialogDescription>
                Detailed information about {selectedTeacher.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <Avatar className="h-20 w-20">
                <AvatarImage src={selectedTeacher.avatar || ''} />
                <AvatarFallback className="text-lg">
                  {selectedTeacher.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2 text-center sm:text-left flex-1">
                <h2 className="text-xl font-bold">{selectedTeacher.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedTeacher.subject} Teacher</p>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <h3 className="text-sm font-medium">Contact Information</h3>
                <p className="text-sm">{selectedTeacher.email}</p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-sm font-medium">Qualifications</h3>
                <p className="text-sm">{selectedTeacher.qualifications}</p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-sm font-medium">Joined</h3>
                <p className="text-sm">{formatDate(selectedTeacher.joinDate)}</p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-sm font-medium">Classes</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTeacher.classes.map((className: string) => (
                    <span 
                      key={className}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                    >
                      {className}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between flex-row">
              <Button variant="outline">Reset Password</Button>
              <Button>View Classes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Teachers;
