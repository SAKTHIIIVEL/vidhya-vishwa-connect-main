import React from 'react';
import Header from './Header';
import AppSidebar from './Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen w-full bg-background">
        <Header />
        <div className="flex pt-16 min-h-[calc(100vh-4rem)]">
          <AppSidebar />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto transition-all duration-300 bg-[#c6d4f9]">
            <div className="mx-auto w-full max-w-7xl">
              <Outlet /> {/* This replaces children */}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
