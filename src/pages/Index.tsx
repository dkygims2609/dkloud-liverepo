import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Code, Music, Sparkles, Zap, Globe, Github, Palette, Brain, Rocket, Star, Heart } from 'lucide-react';
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
import DesignerProfile from '@/components/DesignerProfile';

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

  return (
    <div className="min-h-screen bg-background text-foreground page-transition">
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

      {/* Hero Section with Enhanced Animations */}
      <div className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-indigo-600/5 transition-all duration-500"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative hover-scale">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-lg opacity-20 animate-pulse"></div>
              <img 
                src="/lovable-uploads/422cbbb0-c4bc-4187-9a72-3357810c13df.png" 
                alt="dKloud Tech Logo" 
                className="relative h-24 w-24 mx-auto rounded-full border-4 border-white dark:border-gray-800 shadow-xl page-transition"
              />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
            Decoding Knowledge
          </h1>
          
          <p className="text-xl md:text-2xl font-medium mb-4 text-muted-foreground animate-tagline">
            Library Of Unique Discoveries
          </p>
          
          <div className="mb-8 animate-scale-in">
            <Badge variant="secondary" className="text-lg px-6 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 text-purple-800 dark:text-purple-200 hover-scale">
              dKloud.in by dKloud Tech
            </Badge>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground mb-12">
            <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <span className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                A passionate creative techy's knowledge space
              </span>
            </p>
            
            <p className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              We're on a mission to blend <span className="text-purple-600 font-semibold">creativity</span>, 
              <span className="text-blue-600 font-semibold"> cloud technology</span>, 
              <span className="text-indigo-600 font-semibold"> AI</span>, and 
              <span className="text-purple-600 font-semibold"> community-driven learning</span> into one cohesive platform.
            </p>
            
            <p className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              Whether you're a <span className="text-green-600 font-semibold">tech enthusiast</span>, 
              a <span className="text-pink-600 font-semibold">creative mind</span>, or 
              a <span className="text-orange-600 font-semibold">curious learner</span>, 
              you'll find something meaningful here.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-gray-200 hover-scale transition-all duration-200">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Curated Content</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-gray-200 hover-scale transition-all duration-200">
              <Heart className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-gray-700">Community Driven</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-gray-200 hover-scale transition-all duration-200">
              <Github className="h-5 w-5 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Open Source</span>
            </div>
          </div>
        </div>
      </div>

      {/* Designer Profile Section */}
      <DesignerProfile />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Main Content with Enhanced Tab Animations */}
      <div className="container mx-auto px-4 py-8 bg-background">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-8 bg-card/90 backdrop-blur-sm border border-border shadow-sm">
            <TabsTrigger value="movies" className="text-sm tab-trigger">Movies & TV</TabsTrigger>
            <TabsTrigger value="youtube" className="text-sm tab-trigger">YouTube Picks</TabsTrigger>
            <TabsTrigger value="ai" className="text-sm tab-trigger">AI Tools</TabsTrigger>
            <TabsTrigger value="tech" className="text-sm tab-trigger">Tech Corner</TabsTrigger>
            <TabsTrigger value="gadgets" className="text-sm tab-trigger">SmartTech</TabsTrigger>
            <TabsTrigger value="news" className="text-sm tab-trigger">Tech News</TabsTrigger>
            <TabsTrigger value="portfolio" className="text-sm tab-trigger">Portfolio</TabsTrigger>
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

      <Footer />
      <ContactFloatingButtons />
      <AIAssistant />
    </div>
  );
};

export default Index;
