
import React from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { GenerationPanel } from '@/components/GenerationPanel';
import { ProgressBar } from '@/components/ProgressBar';
import { useHotkeys } from '@/hooks/useHotkeys';

const Index = () => {
  useHotkeys();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-900 text-white">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b border-gray-800 px-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">AI Image Generator</h1>
            </div>
          </header>
          <ProgressBar />
          <main className="flex-1 p-6">
            <GenerationPanel />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
