
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Code, Music, Sparkles, Zap, Globe, Github, Palette, Brain, Rocket, Star, Heart, ArrowDown } from 'lucide-react';
import MoviesTab from '@/components/MoviesTab';
import YouTubeChannelsTab from '@/components/YouTubeChannelsTab';
import AIToolsTab from '@/components/AIToolsTab';
import TechCornerTab from '@/components/TechCornerTab';
import GadgetsTab from '@/components/GadgetsTab';
import TechNewsTab from '@/components/TechNewsTab';
import PortfolioPage from '@/components/PortfolioPage';
import HowItWorksSection from '@/components/HowItWorksSection';
import ContactFloatingButtons from '@/components/ContactFloatingButtons';
import AIAssistant from '@/components/AIAssistant';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';

const floatingIcons = [
  { icon: Cloud, color: 'text-blue-500', size: 'h-8 w-8' },
  { icon: Code, color: 'text-green-500', size: 'h-6 w-6' },
  { icon: Music, color: 'text-pink-500', size: 'h-7 w-7' },
  { icon: Sparkles, color: 'text-yellow-500', size: 'h-5 w-5' },
  { icon: Zap, color: 'text-purple-500', size: 'h-6 w-6' },
  { icon: Globe, color: 'text-indigo-500', size: 'h-7 w-7' },
  { icon: Palette, color: 'text-orange-500', size: 'h-6 w-6' },
  { icon: Brain, color: 'text-teal-500', size: 'h-8 w-8' },
  { icon: Rocket, color: 'text-red-500', size: 'h-7 w-7' },
];

const FloatingIcon = ({ icon: Icon, color, size, delay }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setPosition({
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 100),
      });
      
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 4000);

      return () => clearTimeout(hideTimer);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed pointer-events-none z-20 floating-icon transition-all duration-500 ${
        isVisible ? 'opacity-60' : 'opacity-0'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        animationDelay: `${delay}ms`,
      }}
    >
      <Icon className={`${color} ${size} drop-shadow-sm`} />
    </div>
  );
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("movies");
  const [showFloatingIcons, setShowFloatingIcons] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowFloatingIcons(scrollPosition < windowHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    const element = document.getElementById('main-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-foreground page-transition">
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Enhanced Floating Icons */}
      {showFloatingIcons && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {floatingIcons.map((iconData, index) => (
            <FloatingIcon
              key={index}
              {...iconData}
              delay={index * 800 + Math.random() * 1000}
            />
          ))}
        </div>
      )}

      {/* Header with Logo */}
      <header className="w-full py-4 px-4 flex justify-center bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/422cbbb0-c4bc-4187-9a72-3357810c13df.png" 
            alt="dKloud Tech Logo" 
            className="h-12 w-12 rounded-full border-2 border-gray-200 dark:border-gray-700 shadow-sm"
          />
          <div className="text-2xl font-bold text-gray-800 dark:text-white">dKloud Tech</div>
        </div>
      </header>

      {/* Redesigned Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center max-w-5xl mx-auto">
            {/* Animated Title */}
            <div className="mb-8 overflow-hidden">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight leading-tight mb-6 animate-slide-in-right" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Decoding Knowledge
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300 tracking-wide mb-4 animate-fade-in">
                Library Of Unique Discoveries
              </p>
              
              {/* Powered by */}
              <p className="text-base text-gray-500 dark:text-gray-400 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Powered by dKloud Tech
              </p>
            </div>

            {/* Enhanced Description */}
            <div className="max-w-4xl mx-auto space-y-8 text-lg text-gray-600 dark:text-gray-300 mb-16">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <p className="text-xl font-semibold text-gray-800 dark:text-white mb-6 leading-relaxed">
                  A passionate creative techy's knowledge space
                </p>
                
                <p className="leading-relaxed mb-6">
                  We're on a <span className="text-purple-600 dark:text-purple-400 font-semibold">mission</span> to blend 
                  <span className="text-blue-600 dark:text-blue-400 font-semibold"> creativity</span>, 
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold"> cloud technology</span>, 
                  <span className="text-purple-600 dark:text-purple-400 font-semibold"> AI</span>, and 
                  <span className="text-green-600 dark:text-green-400 font-semibold"> community-driven learning</span> into one cohesive platform.
                </p>
                
                <p className="leading-relaxed">
                  Whether you're a <span className="text-green-600 dark:text-green-400 font-semibold">tech enthusiast</span>, 
                  a <span className="text-pink-600 dark:text-pink-400 font-semibold">creative mind</span>, or 
                  a <span className="text-orange-600 dark:text-orange-400 font-semibold">curious learner</span>, 
                  you'll find something meaningful here.
                </p>
              </div>
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm border border-gray-200 dark:border-gray-700 hover-scale transition-all duration-200">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Curated Content</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm border border-gray-200 dark:border-gray-700 hover-scale transition-all duration-200">
                <Heart className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Community Driven</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm border border-gray-200 dark:border-gray-700 hover-scale transition-all duration-200">
                <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Open Source</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Button 
                onClick={scrollToContent}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold flex items-center gap-3"
              >
                Dive in dKloud Tech Universe
                <ArrowDown className="h-5 w-5 animate-bounce" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div id="main-content" className="container mx-auto px-4 py-12 bg-white dark:bg-gray-900">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-8 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg">
            <TabsTrigger value="movies" className="text-sm tab-trigger rounded-md">Movies & TV</TabsTrigger>
            <TabsTrigger value="youtube" className="text-sm tab-trigger rounded-md">YouTube Picks</TabsTrigger>
            <TabsTrigger value="ai" className="text-sm tab-trigger rounded-md">AI Tools</TabsTrigger>
            <TabsTrigger value="tech" className="text-sm tab-trigger rounded-md">Tech Corner</TabsTrigger>
            <TabsTrigger value="gadgets" className="text-sm tab-trigger rounded-md">SmartTech</TabsTrigger>
            <TabsTrigger value="news" className="text-sm tab-trigger rounded-md">Tech News</TabsTrigger>
            <TabsTrigger value="portfolio" className="text-sm tab-trigger rounded-md">Portfolio</TabsTrigger>
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

          <TabsContent value="news" className="space-y-6">
            <TechNewsTab />
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <PortfolioPage />
          </TabsContent>
        </Tabs>
      </div>

      {/* How It Works Section */}
      <HowItWorksSection />

      <Footer />
      <ContactFloatingButtons />
      <AIAssistant />
    </div>
  );
};

export default Index;
