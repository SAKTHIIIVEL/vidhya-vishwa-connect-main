import React, { useState } from 'react';
import { Search, FileText, Download } from 'lucide-react';

// Mock data for submissions
const submissionsMockData = [
  {
    id: 's001',
    student: 'John Smith',
    class: '10A',
    exam: 'Mathematics Mid-Term',
    subject: 'Mathematics',
    score: 85,
    maxScore: 100,
    submitDate: '2025-04-10T14:30:00',
    status: 'graded',
  },
  {
    id: 's002',
    student: 'Emma Johnson',
    class: '10A',
    exam: 'Mathematics Mid-Term',
    subject: 'Mathematics',
    score: 92,
    maxScore: 100,
    submitDate: '2025-04-10T15:15:00',
    status: 'graded',
  },
  {
    id: 's003',
    student: 'Michael Brown',
    class: '10B',
    exam: 'Physics Quiz',
    subject: 'Physics',
    score: 78,
    maxScore: 100,
    submitDate: '2025-04-12T10:45:00',
    status: 'graded',
  },
  {
    id: 's004',
    student: 'Sophia Garcia',
    class: '10B',
    exam: 'Physics Quiz',
    subject: 'Physics',
    score: 88,
    maxScore: 100,
    submitDate: '2025-04-12T11:20:00',
    status: 'graded',
  },
  {
    id: 's005',
    student: 'William Davis',
    class: '11A',
    exam: 'Chemistry Test',
    subject: 'Chemistry',
    score: null,
    maxScore: 100,
    submitDate: '2025-04-14T09:10:00',
    status: 'pending',
  },
  {
    id: 's006',
    student: 'Olivia Martinez',
    class: '11A',
    exam: 'Chemistry Test',
    subject: 'Chemistry',
    score: null,
    maxScore: 100,
    submitDate: '2025-04-14T09:30:00',
    status: 'pending',
  },
];

// Get unique subject classes
const subjects = [...new Set(submissionsMockData.map(item => item.subject))];
const classes = [...new Set(submissionsMockData.map(item => item.class))];

const Submissions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [activeTab, setActiveTab] = useState('pending');
  
  const filteredSubmissions = submissionsMockData.filter(submission => {
    const matchesSearch = searchTerm === '' || 
      submission.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
      submission.exam.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = selectedSubject === 'all' || submission.subject === selectedSubject;
    const matchesClass = selectedClass === 'all' || submission.class === selectedClass;
    
    return matchesSearch && matchesSubject && matchesClass;
  });
  
  const pendingSubmissions = filteredSubmissions.filter(s => s.status === 'pending');
  const gradedSubmissions = filteredSubmissions.filter(s => s.status === 'graded');
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  const handleDownload = (submission) => {
    alert(`Downloading ${submission.student}'s submission for ${submission.exam}.`);
  };
  
  const handleGrade = (submission) => {
    alert(`Opening grading interface for ${submission.student}'s submission.`);
  };
  
  const currentSubmissions = activeTab === 'pending' ? pendingSubmissions : gradedSubmissions;
  
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Submissions</h1>
        <p className="text-gray-600">View and grade student exam submissions.</p>
      </div>
      
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search submissions..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full sm:w-auto">
          <select
            className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="all">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        
        <div className="w-full sm:w-auto">
          <select
            className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="all">All Classes</option>
            {classes.map(className => (
              <option key={className} value={className}>{className}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'pending'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('pending')}
          >
            <span>Pending</span>
            <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
              {pendingSubmissions.length}
            </span>
          </button>
          <button
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'graded'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('graded')}
          >
            <span>Graded</span>
            <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
              {gradedSubmissions.length}
            </span>
          </button>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {activeTab === 'pending' ? 'Pending Submissions' : 'Graded Submissions'}
            </h3>
            <p className="text-sm text-gray-600">
              {activeTab === 'pending' 
                ? 'Submissions that need to be graded.' 
                : 'Submissions that have been graded.'
              }
            </p>
          </div>
          
          <div className="px-6 py-4">
            {currentSubmissions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No {activeTab} submissions found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Student</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Class</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Exam</th>
                      {activeTab === 'graded' && (
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Score</th>
                      )}
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Submitted</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSubmissions.map((submission) => (
                      <tr key={submission.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{submission.student}</td>
                        <td className="py-3 px-4 text-gray-700">{submission.class}</td>
                        <td className="py-3 px-4 text-gray-700">{submission.exam}</td>
                        {activeTab === 'graded' && (
                          <td className="py-3 px-4">
                            <span className={submission.score >= 70 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                              {submission.score} / {submission.maxScore}
                            </span>
                          </td>
                        )}
                        <td className="py-3 px-4 text-gray-700">{formatDate(submission.submitDate)}</td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end gap-2">
                            <button
                              className="flex items-center space-x-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                              onClick={() => handleDownload(submission)}
                            >
                              <Download className="h-4 w-4" />
                              <span>Download</span>
                            </button>
                            {activeTab === 'pending' && (
                              <button
                                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                onClick={() => handleGrade(submission)}
                              >
                                Grade
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submissions;