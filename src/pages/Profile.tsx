import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { currentUser } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  // Use the user fields that actually exist in our data model
  const [user, setUser] = useState({
    ...currentUser,
    theme: currentUser.preferences.theme, // Map from preferences to top level for backward compatibility
    language: 'English', // Default value
  });
  
  const [activeTab, setActiveTab] = useState('profile');

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved."
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Password changed",
      description: "Your password has been successfully changed."
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={user.profilePicture || user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="w-full space-y-4">
              <Button className="w-full" variant="outline">Change Picture</Button>
              
              <div className="text-center mt-4">
                <h3 className="font-medium text-lg">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <div className="mt-2">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Last login:</span>
                  <span>{new Date(user.lastLogin).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences and security</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <Input id="name" value={user.name} onChange={e => setUser({...user, name: e.target.value})} />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <Input id="email" type="email" value={user.email} onChange={e => setUser({...user, email: e.target.value})} />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium">Role</label>
                    <Input id="role" value={user.role} disabled />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="class" className="text-sm font-medium">Class</label>
                    <Input id="class" value={user.class || ''} onChange={e => setUser({...user, class: e.target.value})} />
                  </div>
                </div>
                
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </TabsContent>
              
              <TabsContent value="preferences" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="theme" className="text-sm font-medium">Theme</label>
                    <select 
                      id="theme" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2" 
                      value={user.theme} 
                      onChange={e => setUser({...user, theme: e.target.value})}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="language" className="text-sm font-medium">Language</label>
                    <select 
                      id="language" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2" 
                      value={user.language} 
                      onChange={e => setUser({...user, language: e.target.value})}
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                    </select>
                  </div>
                  
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={user.preferences.notificationsEnabled} 
                        onChange={e => setUser({
                          ...user, 
                          preferences: {...user.preferences, notificationsEnabled: e.target.checked}
                        })} 
                        className="rounded border-gray-300" 
                      />
                      Enable Notifications
                    </label>
                  </div>
                </div>
                
                <Button onClick={handleSaveProfile}>Save Preferences</Button>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="current-password" className="text-sm font-medium">Current Password</label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="new-password" className="text-sm font-medium">New Password</label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                
                <Button onClick={handleChangePassword}>Change Password</Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>Link your accounts for seamless integration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </div>
                <div>
                  <h4 className="font-medium">Facebook</h4>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-500"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </div>
                <div>
                  <h4 className="font-medium">Twitter</h4>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Disconnect</Button>
            </div>
            
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </div>
                <div>
                  <h4 className="font-medium">YouTube</h4>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                </div>
                <div>
                  <h4 className="font-medium">GitHub</h4>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Disconnect</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
