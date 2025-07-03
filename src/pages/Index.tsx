
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cloud, Code, Music, Sparkles, Zap, Globe, Github, Palette, Brain, Rocket, Star, Heart, ArrowDown, Search, Users, Award, Lightbulb, Target } from 'lucide-react';
import MoviesTab from '@/components/MoviesTab';
import YouTubeChannelsTab from '@/components/YouTubeChannelsTab';
import AIToolsTab from '@/components/AIToolsTab';
import TechCornerTab from '@/components/TechCornerTab';
import GadgetsTab from '@/components/GadgetsTab';
import TechNewsTab from '@/components/TechNewsTab';
import PortfolioPage from '@/components/PortfolioPage';
import HowItWorksSection from '@/components/HowItWorksSection';
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
      const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?0123456789';
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
      }, 1500);
    }, 12000);

    return () => clearInterval(shuffleInterval);
  }, [text]);

  return (
    <span 
      className={`${className} ${isShuffling ? 'text-green-400' : ''} transition-colors duration-300 inline-block`}
      style={{ 
        minWidth: isShuffling ? `${text.length * 0.6}em` : 'auto',
        fontFamily: 'monospace'
      }}
    >
      {displayText}
    </span>
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

  const getTabColor = (tabValue: string) => {
    const colors = {
      movies: 'data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-800 dark:data-[state=active]:text-purple-200',
      youtube: 'data-[state=active]:bg-red-100 dark:data-[state=active]:bg-red-900/30 data-[state=active]:text-red-800 dark:data-[state=active]:text-red-200',
      ai: 'data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-900/30 data-[state=active]:text-green-800 dark:data-[state=active]:text-green-200',
      tech: 'data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-800 dark:data-[state=active]:text-blue-200',
      gadgets: 'data-[state=active]:bg-indigo-100 dark:data-[state=active]:bg-indigo-900/30 data-[state=active]:text-indigo-800 dark:data-[state=active]:text-indigo-200',
      news: 'data-[state=active]:bg-pink-100 dark:data-[state=active]:bg-pink-900/30 data-[state=active]:text-pink-800 dark:data-[state=active]:text-pink-200',
      portfolio: 'data-[state=active]:bg-teal-100 dark:data-[state=active]:bg-teal-900/30 data-[state=active]:text-teal-800 dark:data-[state=active]:text-teal-200'
    };
    return colors[tabValue] || '';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-foreground page-transition">
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Enhanced Running Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-3 overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-sm font-medium">
            🚀 This website is built with lots of effort, time, and passion — almost no cost! 
            💻 Open Source • 🌟 Community Driven • 🎨 Creative Tech Space • 🤖 AI Powered • 
            ☁️ Cloud Native • 📚 Knowledge Hub • 🎵 Music & Tech • 🔧 Developer Tools • 
            Join our community of tech enthusiasts and creators!
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
      <header className="w-full py-4 px-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              dK
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-gray-800 dark:text-white">dKloud Tech</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Knowledge Hub</div>
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <button onClick={() => handleTabClick('movies')} className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Movies</button>
            <button onClick={() => handleTabClick('youtube')} className="text-sm font-medium hover:text-red-600 dark:hover:text-red-400 transition-colors">YouTube</button>
            <button onClick={() => handleTabClick('ai')} className="text-sm font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors">AI Tools</button>
            <button onClick={() => handleTabClick('tech')} className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tech</button>
            <button onClick={() => handleTabClick('gadgets')} className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Gadgets</button>
            <button onClick={() => handleTabClick('news')} className="text-sm font-medium hover:text-pink-600 dark:hover:text-pink-400 transition-colors">News</button>
            <button onClick={() => handleTabClick('portfolio')} className="text-sm font-medium hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Portfolio</button>
          </nav>

          {/* Search */}
          <div className="flex items-center gap-2">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-32 sm:w-48"
                  autoFocus
                />
                <Button type="submit" size="sm" variant="ghost">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <Button onClick={() => setSearchOpen(true)} size="sm" variant="ghost" className="hover:bg-purple-100 dark:hover:bg-purple-900/30">
                <Search className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Redesigned Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="text-center max-w-6xl mx-auto">
            {/* Animated Title */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 animate-slide-in-right">
                <ShuffleText 
                  text="Decoding Knowledge" 
                  className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent"
                />
              </h1>
              
              {/* Enhanced Subtitle */}
              <p className="text-xl md:text-2xl font-light tracking-wide mb-4 animate-fade-in">
                <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent font-semibold">
                  Library Of Unique Discoveries
                </span>
              </p>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Powered by dKloud Tech
              </p>
            </div>

            {/* Seamless Highlights Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="group cursor-pointer">
                <div className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 hover:scale-105">
                  <Cloud className="h-8 w-8 md:h-10 md:w-10 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-gray-800 dark:text-white text-sm md:text-base">Cloud Computing</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Scalable Solutions</p>
                </div>
              </div>
              <div className="group cursor-pointer">
                <div className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 hover:scale-105">
                  <Music className="h-8 w-8 md:h-10 md:w-10 text-pink-500 mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-gray-800 dark:text-white text-sm md:text-base">Music Composer</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Creative Melodies</p>
                </div>
              </div>
              <div className="group cursor-pointer">
                <div className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 hover:scale-105">
                  <Palette className="h-8 w-8 md:h-10 md:w-10 text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-gray-800 dark:text-white text-sm md:text-base">Content Creator</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Digital Stories</p>
                </div>
              </div>
              <div className="group cursor-pointer">
                <div className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 hover:scale-105">
                  <Rocket className="h-8 w-8 md:h-10 md:w-10 text-red-500 mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-gray-800 dark:text-white text-sm md:text-base">Creative Techy</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Innovation Drive</p>
                </div>
              </div>
            </div>

            {/* Enhanced Description */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 animate-fade-in" style={{ animationDelay: '0.4s' }}>
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

            {/* Enhanced Feature Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center justify-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-gray-200/50 dark:border-gray-700/50 hover-scale transition-all duration-200">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Curated Content</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-gray-200/50 dark:border-gray-700/50 hover-scale transition-all duration-200">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Community Driven</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-gray-200/50 dark:border-gray-700/50 hover-scale transition-all duration-200">
                <Github className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Open Source</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-gray-200/50 dark:border-gray-700/50 hover-scale transition-all duration-200">
                <Brain className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Powered</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Button 
                onClick={scrollToContent}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl text-base font-semibold flex items-center gap-3 hover:scale-105"
              >
                Dive into dKloud Tech Universe
                <ArrowDown className="h-5 w-5 animate-bounce" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content Tabs */}
      <div id="main-content" className="container mx-auto px-4 py-12 bg-white dark:bg-gray-900">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-8 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl p-1">
            <TabsTrigger value="movies" className={`text-xs sm:text-sm tab-trigger rounded-lg font-medium transition-all duration-200 ${getTabColor('movies')}`}>
              🎬 Movies & TV
            </TabsTrigger>
            <TabsTrigger value="youtube" className={`text-xs sm:text-sm tab-trigger rounded-lg font-medium transition-all duration-200 ${getTabColor('youtube')}`}>
              📺 YouTube Picks
            </TabsTrigger>
            <TabsTrigger value="ai" className={`text-xs sm:text-sm tab-trigger rounded-lg font-medium transition-all duration-200 ${getTabColor('ai')}`}>
              🤖 AI Tools
            </TabsTrigger>
            <TabsTrigger value="tech" className={`text-xs sm:text-sm tab-trigger rounded-lg font-medium transition-all duration-200 ${getTabColor('tech')}`}>
              🔧 Tech Corner
            </TabsTrigger>
            <TabsTrigger value="gadgets" className={`text-xs sm:text-sm tab-trigger rounded-lg font-medium transition-all duration-200 ${getTabColor('gadgets')}`}>
              📱 SmartTech
            </TabsTrigger>
            <TabsTrigger value="news" className={`text-xs sm:text-sm tab-trigger rounded-lg font-medium transition-all duration-200 ${getTabColor('news')}`}>
              📰 Tech News
            </TabsTrigger>
            <TabsTrigger value="portfolio" className={`text-xs sm:text-sm tab-trigger rounded-lg font-medium transition-all duration-200 ${getTabColor('portfolio')}`}>
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
