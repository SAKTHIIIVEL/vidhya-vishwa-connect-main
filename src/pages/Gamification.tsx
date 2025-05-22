
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { currentUser, badges, leaderboard } from '@/data/mockData';

const Gamification = () => {
  const earnedBadges = badges.filter(badge => badge.earned);
  const lockedBadges = badges.filter(badge => !badge.earned);
  const nextLevelXp = 4000; // Sample XP needed for the next level
  const progressToNextLevel = (currentUser.xp / nextLevelXp) * 100;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Gamification</h1>
        <p className="text-muted-foreground">Track your achievements and compare with classmates.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Level Progress</CardTitle>
            <CardDescription>Keep learning to gain more XP and level up</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-inlustro-blue to-inlustro-blue-dark text-2xl font-bold text-white">
                  {currentUser.level}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Level {currentUser.level}</span>
                    <span className="text-sm text-muted-foreground">{currentUser.xp} / {nextLevelXp} XP</span>
                  </div>
                  <Progress value={progressToNextLevel} className="h-2 w-64 md:w-96" />
                  <p className="text-sm text-muted-foreground">
                    {Math.round(nextLevelXp - currentUser.xp)} XP needed for Level {currentUser.level + 1}
                  </p>
                </div>
              </div>
              
              <div className="max-w-md text-center text-sm text-muted-foreground">
                <p>
                  Complete lessons, take quizzes, and earn badges to gain XP and increase your level.
                  Higher levels unlock special features and recognition.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Class Leaderboard</CardTitle>
            <CardDescription>Top students in your class</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-auto">
            <div className="space-y-4">
              {leaderboard.map((entry, index) => {
                const isCurrentUser = entry.id === currentUser.id;
                return (
                  <div 
                    key={entry.id} 
                    className={`flex items-center justify-between rounded-lg p-3 ${
                      isCurrentUser ? 'bg-inlustro-blue/10 ring-1 ring-inlustro-blue' : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full ${
                        index === 0 ? 'bg-inlustro-yellow text-black' : 
                        index === 1 ? 'bg-gray-300 text-black' :
                        index === 2 ? 'bg-amber-700 text-white' : 'bg-muted text-foreground'
                      }`}>
                        {index + 1}
                      </span>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={entry.avatar} alt={entry.name} />
                        <AvatarFallback>{entry.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{entry.name} {isCurrentUser && '(You)'}</span>
                        <span className="text-xs text-muted-foreground">{entry.class}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-end">
                        <span className="font-medium">{entry.xp} XP</span>
                        <span className="text-xs text-muted-foreground">Level {entry.level}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Achievements you've earned</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="earned" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="earned">Earned ({earnedBadges.length})</TabsTrigger>
                <TabsTrigger value="locked">Locked ({lockedBadges.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="earned" className="mt-4">
                {earnedBadges.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {earnedBadges.map(badge => (
                      <div key={badge.id} className="flex flex-col items-center rounded-lg border p-4 text-center">
                        <div className="mb-2 h-16 w-16 rounded-full bg-gradient-to-br from-inlustro-blue to-inlustro-blue-dark flex items-center justify-center">
                          <img src={badge.imageUrl} alt={badge.title} className="h-10 w-10" />
                        </div>
                        <h4 className="font-medium">{badge.title}</h4>
                        <p className="mt-1 text-xs text-muted-foreground">{badge.description}</p>
                        {badge.earnedDate && (
                          <p className="mt-2 text-xs text-inlustro-blue">
                            Earned on {new Date(badge.earnedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-32 flex-col items-center justify-center text-center text-muted-foreground">
                    <p>You haven't earned any badges yet.</p>
                    <p className="text-sm">Complete activities to earn badges!</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="locked" className="mt-4">
                {lockedBadges.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {lockedBadges.map(badge => (
                      <div key={badge.id} className="flex flex-col items-center rounded-lg border p-4 text-center opacity-70 grayscale">
                        <div className="mb-2 h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                          <img src={badge.imageUrl} alt={badge.title} className="h-10 w-10" />
                        </div>
                        <h4 className="font-medium">{badge.title}</h4>
                        <p className="mt-1 text-xs text-muted-foreground">{badge.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-32 flex-col items-center justify-center text-center text-muted-foreground">
                    <p>You've earned all available badges!</p>
                    <p className="text-sm">Great job!</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="text-xl font-bold">How to Earn XP</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-muted p-4">
            <h4 className="mb-2 font-medium">Completing Lessons</h4>
            <p className="text-sm text-muted-foreground">Finish lessons to earn 50-100 XP depending on the lesson difficulty</p>
          </div>
          <div className="rounded-lg bg-muted p-4">
            <h4 className="mb-2 font-medium">Taking Quizzes</h4>
            <p className="text-sm text-muted-foreground">Complete quizzes to earn 100-200 XP based on your score</p>
          </div>
          <div className="rounded-lg bg-muted p-4">
            <h4 className="mb-2 font-medium">Daily Logins</h4>
            <p className="text-sm text-muted-foreground">Log in daily to earn 20 XP, with bonuses for consecutive days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamification;
