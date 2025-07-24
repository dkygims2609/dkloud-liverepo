
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MoviesTab from '@/components/MoviesTab';
import YouTubeChannelsTab from '@/components/YouTubeChannelsTab';
import AIToolsTab from '@/components/AIToolsTab';
import TechCornerTab from '@/components/TechCornerTab';
import GadgetsTab from '@/components/GadgetsTab';
import ServicesTab from '@/components/ServicesTab';
import PortfolioPage from '@/components/PortfolioPage';

interface TabsSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsSection = ({ activeTab, setActiveTab }: TabsSectionProps) => {
  const getTabColor = (tabValue: string) => {
    const colors = {
      movies: 'data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-800 dark:data-[state=active]:text-purple-200 data-[state=active]:shadow-lg data-[state=active]:shadow-purple-200/50 dark:data-[state=active]:shadow-purple-900/30',
      youtube: 'data-[state=active]:bg-red-100 dark:data-[state=active]:bg-red-900/30 data-[state=active]:text-red-800 dark:data-[state=active]:text-red-200 data-[state=active]:shadow-lg data-[state=active]:shadow-red-200/50 dark:data-[state=active]:shadow-red-900/30',
      ai: 'data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-900/30 data-[state=active]:text-green-800 dark:data-[state=active]:text-green-200 data-[state=active]:shadow-lg data-[state=active]:shadow-green-200/50 dark:data-[state=active]:shadow-green-900/30',
      tech: 'data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-800 dark:data-[state=active]:text-blue-200 data-[state=active]:shadow-lg data-[state=active]:shadow-blue-200/50 dark:data-[state=active]:shadow-blue-900/30',
      gadgets: 'data-[state=active]:bg-indigo-100 dark:data-[state=active]:bg-indigo-900/30 data-[state=active]:text-indigo-800 dark:data-[state=active]:text-indigo-200 data-[state=active]:shadow-lg data-[state=active]:shadow-indigo-200/50 dark:data-[state=active]:shadow-indigo-900/30',
      services: 'data-[state=active]:bg-amber-100 dark:data-[state=active]:bg-amber-900/30 data-[state=active]:text-amber-800 dark:data-[state=active]:text-amber-200 data-[state=active]:shadow-lg data-[state=active]:shadow-amber-200/50 dark:data-[state=active]:shadow-amber-900/30',
      portfolio: 'data-[state=active]:bg-teal-100 dark:data-[state=active]:bg-teal-900/30 data-[state=active]:text-teal-800 dark:data-[state=active]:text-teal-200 data-[state=active]:shadow-lg data-[state=active]:shadow-teal-200/50 dark:data-[state=active]:shadow-teal-900/30'
    };
    return colors[tabValue] || '';
  };

  return (
    <div id="main-content" className="container mx-auto px-4 py-12 bg-white dark:bg-gray-900">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 mb-8 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl p-1 transform hover:scale-[1.02] transition-all duration-200">
          <TabsTrigger value="movies" className={`text-xs sm:text-sm tab-trigger rounded-lg font-medium transition-all duration-300 hover:scale-105 ${getTabColor('movies')}`}>
            🎬 Movies & TV
          </TabsTrigger>
          <TabsTrigger value="youtube" className={`text-xs sm:text-sm tab-trigger rounded-lg font-medium transition-all duration-300 hover:scale-105 ${getTabColor('youtube')}`}>
            📺 YouTube Picks
          </TabsTrigger>
          <TabsTrigger value="ai" className={`text-xs sm:text-sm tab-trigger rounded-lg font-medium transition-all duration-300 hover:scale-105 ${getTabColor('ai')}`}>
            🤖 AI Tools
          </TabsTrigger>
          <TabsTrigger value="tech" className={`text-xs sm:text-sm tab-trigger rounded-lg font-medium transition-all duration-300 hover:scale-105 ${getTabColor('tech')}`}>
            🔧 Tech Corner
          </TabsTrigger>
          <TabsTrigger value="gadgets" className={`text-xs sm:text-sm tab-trigger rounded-lg font-medium transition-all duration-300 hover:scale-105 ${getTabColor('gadgets')}`}>
            📱 SmartTech
          </TabsTrigger>
          <TabsTrigger value="services" className={`text-xs sm:text-sm tab-trigger rounded-lg font-medium transition-all duration-300 hover:scale-105 ${getTabColor('services')}`}>
            🛠️ Services
          </TabsTrigger>
          <TabsTrigger value="portfolio" className={`text-xs sm:text-sm tab-trigger rounded-lg font-medium transition-all duration-300 hover:scale-105 ${getTabColor('portfolio')}`}>
            👤 Portfolio
          </TabsTrigger>
        </TabsList>

        <TabsContent value="movies" className="space-y-6">
          <MoviesTab />
        </TabsContent>

        <TabsContent value="youtube" className="space-y-6">
          <YouTubeChannelsTab />
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <AIToolsTab />
        </TabsContent>

        <TabsContent value="tech" className="space-y-6">
          <TechCornerTab />
        </TabsContent>

        <TabsContent value="gadgets" className="space-y-6">
          <GadgetsTab />
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <ServicesTab />
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <PortfolioPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsSection;
