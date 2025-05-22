
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { currentUser, weeklyActivity } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { FileText, Users, ClipboardEdit } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {currentUser.name}!</h1>
        <p className="text-muted-foreground">
          {currentUser.role === 'admin' ? 'Manage your school and teachers.' : 'Prepare exams and view student submissions.'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/exam-preparation" className="block">
          <Card className="h-full hover:shadow-lg transition-all rounded-3xl shadow-inlustro border-0">
            <CardHeader className="pb-2 bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
              <div className="w-12 h-12 rounded-full bg-inlustro-purple/10 flex items-center justify-center mb-2">
                <FileText className="h-6 w-6 text-inlustro-purple" />
              </div>
              <CardTitle className="mt-2">Create Exam</CardTitle>
              <CardDescription>Create and manage exam papers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create custom exams with different difficulty levels and share with students.
              </p>
              <Button className="mt-4 w-full rounded-full bg-inlustro-purple hover:bg-inlustro-purple/90">Get Started</Button>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/teachers" className="block">
          <Card className="h-full hover:shadow-lg transition-all rounded-3xl shadow-inlustro border-0">
            <CardHeader className="pb-2 bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
              <div className="w-12 h-12 rounded-full bg-inlustro-purple/10 flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-inlustro-purple" />
              </div>
              <CardTitle className="mt-2">Manage Teachers</CardTitle>
              <CardDescription>View and manage teacher accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View teacher profiles, manage permissions, and assign classes.
              </p>
              <Button className="mt-4 w-full rounded-full bg-inlustro-purple hover:bg-inlustro-purple/90">View Teachers</Button>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/submissions" className="block">
          <Card className="h-full hover:shadow-lg transition-all rounded-3xl shadow-inlustro border-0">
            <CardHeader className="pb-2 bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
              <div className="w-12 h-12 rounded-full bg-inlustro-purple/10 flex items-center justify-center mb-2">
                <ClipboardEdit className="h-6 w-6 text-inlustro-purple" />
              </div>
              <CardTitle className="mt-2">View Submissions</CardTitle>
              <CardDescription>Track student submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View and grade student exam submissions and track progress.
              </p>
              <Button className="mt-4 w-full rounded-full bg-inlustro-purple hover:bg-inlustro-purple/90">Check Submissions</Button>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-full rounded-3xl shadow-inlustro border-0">
          <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your activities in the past week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 border-l-2 border-inlustro-purple pl-4 py-2">
              <p className="text-sm font-medium">Math Exam Created</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
            <div className="space-y-2 border-l-2 border-inlustro-purple pl-4 py-2">
              <p className="text-sm font-medium">Physics Exam Shared</p>
              <p className="text-xs text-muted-foreground">Yesterday</p>
            </div>
            <div className="space-y-2 border-l-2 border-inlustro-purple pl-4 py-2">
              <p className="text-sm font-medium">New Teacher Added</p>
              <p className="text-xs text-muted-foreground">2 days ago</p>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full rounded-3xl shadow-inlustro border-0">
          <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Minutes spent on platform this week</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} min`, 'Active Time']}
                  labelFormatter={(label) => `${label}`}
                />
                <Bar dataKey="minutes" fill="#5F65D9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
