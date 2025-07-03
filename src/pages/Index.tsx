
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Cloud, Code, Music, Sparkles, Zap, Globe, Github, Palette, Brain, Rocket, Star, Heart, ArrowDown, Search, Menu } from 'lucide-react';
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

const ShuffleText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    const shuffleInterval = setInterval(() => {
      setIsShuffling(true);
      const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      let iteration = 0;
      
      const shuffleTimer = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        
        if (iteration >= text.length) {
          clearInterval(shuffleTimer);
          setIsShuffling(false);
        }
        
        iteration += 1 / 3;
      }, 30);

      setTimeout(() => {
        clearInterval(shuffleTimer);
        setDisplayText(text);
        setIsShuffling(false);
      }, 2000);
    }, 8000);

    return () => clearInterval(shuffleInterval);
  }, [text]);

  return (
    <div className="relative">
      <span 
        className={`${className} ${isShuffling ? 'text-green-400' : ''} transition-colors duration-300 inline-block`}
        style={{ 
          minWidth: isShuffling ? `${text.length * 0.6}em` : 'auto',
          textAlign: 'left'
        }}
      >
        {displayText}
      </span>
    </div>
  );
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("movies");
  const [showFloatingIcons, setShowFloatingIcons] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
    scrollToContent();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality here
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-foreground page-transition">
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Running Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-sm font-medium">
            🚀 This website is built with lots of effort, time, and passion — almost no cost! 
            Join our community of tech enthusiasts and creators. 
            Building the future, one line of code at a time. 
            💻 Open Source • 🌟 Community Driven • 🎨 Creative Tech Space
          </span>
        </div>
      </div>

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

      {/* Header with Navigation */}
      <header className="w-full py-4 px-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              dK
            </div>
            <div className="text-xl font-bold text-gray-800 dark:text-white">dKloud Tech</div>
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => handleTabClick('movies')} className="text-sm hover:text-purple-600 transition-colors">Movies</button>
            <button onClick={() => handleTabClick('youtube')} className="text-sm hover:text-purple-600 transition-colors">YouTube</button>
            <button onClick={() => handleTabClick('ai')} className="text-sm hover:text-purple-600 transition-colors">AI Tools</button>
            <button onClick={() => handleTabClick('tech')} className="text-sm hover:text-purple-600 transition-colors">Tech</button>
            <button onClick={() => handleTabClick('portfolio')} className="text-sm hover:text-purple-600 transition-colors">Portfolio</button>
          </nav>

          {/* Search */}
          <div className="flex items-center gap-2">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-48"
                  autoFocus
                />
                <Button type="submit" size="sm" variant="ghost">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <Button onClick={() => setSearchOpen(true)} size="sm" variant="ghost">
                <Search className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Redesigned Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="text-center max-w-5xl mx-auto">
            {/* Animated Title */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 animate-slide-in-right" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                <ShuffleText 
                  text="Decoding Knowledge" 
                  className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent"
                />
              </h1>
              
              {/* Subtitle with color */}
              <p className="text-lg md:text-xl font-light tracking-wide mb-4 animate-fade-in">
                <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent font-semibold">
                  Library Of Unique Discoveries
                </span>
              </p>
              
              {/* Powered by */}
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Powered by dKloud Tech
              </p>
            </div>

            {/* Highlights Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <Cloud className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Cloud Computing</p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <Music className="h-6 w-6 text-pink-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Music Composer</p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <Palette className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Content Creator</p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <Rocket className="h-6 w-6 text-red-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Creative Techy</p>
              </div>
            </div>

            {/* Enhanced Description */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <p className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-4 leading-relaxed">
                  At dKloud, we're crafting a universe where creativity meets the cloud, AI fuels curiosity, and learning becomes a shared adventure.
                </p>
                
                <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                  Whether you're a <span className="text-blue-600 dark:text-blue-400 font-semibold">tech explorer</span>, 
                  a <span className="text-purple-600 dark:text-purple-400 font-semibold">digital creator</span>, or 
                  a <span className="text-green-600 dark:text-green-400 font-semibold">seeker of knowledge</span> — 
                  this is your space to discover, build, and belong.
                </p>
              </div>
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-gray-200 dark:border-gray-700 hover-scale transition-all duration-200">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Curated Content</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-gray-200 dark:border-gray-700 hover-scale transition-all duration-200">
                <Heart className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Community Driven</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-gray-200 dark:border-gray-700 hover-scale transition-all duration-200">
                <Github className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Open Source</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Button 
                onClick={scrollToContent}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-base font-semibold flex items-center gap-3"
              >
                Dive in dKloud Tech Universe
                <ArrowDown className="h-4 w-4 animate-bounce" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div id="main-content" className="container mx-auto px-4 py-12 bg-white dark:bg-gray-900">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-8 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg">
            <TabsTrigger value="movies" className="text-sm tab-trigger rounded-md data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900/30">Movies & TV</TabsTrigger>
            <TabsTrigger value="youtube" className="text-sm tab-trigger rounded-md data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900/30">YouTube Picks</TabsTrigger>
            <TabsTrigger value="ai" className="text-sm tab-trigger rounded-md data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-900/30">AI Tools</TabsTrigger>
            <TabsTrigger value="tech" className="text-sm tab-trigger rounded-md data-[state=active]:bg-orange-100 dark:data-[state=active]:bg-orange-900/30">Tech Corner</TabsTrigger>
            <TabsTrigger value="gadgets" className="text-sm tab-trigger rounded-md data-[state=active]:bg-indigo-100 dark:data-[state=active]:bg-indigo-900/30">SmartTech</TabsTrigger>
            <TabsTrigger value="news" className="text-sm tab-trigger rounded-md data-[state=active]:bg-pink-100 dark:data-[state=active]:bg-pink-900/30">Tech News</TabsTrigger>
            <TabsTrigger value="portfolio" className="text-sm tab-trigger rounded-md data-[state=active]:bg-teal-100 dark:data-[state=active]:bg-teal-900/30">Portfolio</TabsTrigger>
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
      <AIAssistant />
    </div>
  );
};

export default Index;
