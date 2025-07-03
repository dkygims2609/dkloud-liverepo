import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Moon, Sun, Film, Tv, Youtube, Bot, Wrench, Smartphone, User, MessageCircle, Mail, Instagram, Linkedin, Music, Code, Cloud, Zap, Cpu, Wifi, Sparkles, Rocket, Globe, Heart } from 'lucide-react';
import { useTheme } from "@/hooks/use-theme";
import MoviesTab from '@/components/MoviesTab';
import TVSeriesTab from '@/components/TVSeriesTab';
import YouTubeChannelsTab from '@/components/YouTubeChannelsTab';
import AIToolsTab from '@/components/AIToolsTab';
import TechCornerTab from '@/components/TechCornerTab';
import GadgetsTab from '@/components/GadgetsTab';
import PortfolioPage from '@/components/PortfolioPage';
import HowItWorksSection from '@/components/HowItWorksSection';
import ContactFloatingButtons from '@/components/ContactFloatingButtons';
import AIAssistant from '@/components/AIAssistant';

const Index = () => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('movies-tv');
  const [moviesTVTab, setMoviesTVTab] = useState('movies');
  const [showFloatingIcons, setShowFloatingIcons] = useState(true);

  useEffect(() => {
    const tagline = document.querySelector('.animate-tagline');
    if (tagline) {
      tagline.classList.add('animate-fade-in');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowFloatingIcons(scrollPosition < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (activeTab === 'portfolio') {
    return <PortfolioPage onBack={() => setActiveTab('movies-tv')} />;
  }

  const FloatingIcon = ({ Icon, delay = 0, duration = 3 }: { Icon: any, delay?: number, duration?: number }) => (
    <div 
      className={`absolute animate-bounce opacity-0 text-primary transition-all duration-1000 ${
        showFloatingIcons ? 'animate-pulse opacity-20' : 'opacity-0'
      }`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        top: `${Math.random() * 70 + 15}%`,
        left: `${Math.random() * 80 + 10}%`,
        animationIterationCount: 'infinite',
      }}
    >
      <Icon className="h-8 w-8" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Enhanced Floating Background Animation Icons */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <FloatingIcon Icon={Music} delay={0} duration={4} />
        <FloatingIcon Icon={Code} delay={1} duration={3.5} />
        <FloatingIcon Icon={Cloud} delay={2} duration={4.5} />
        <FloatingIcon Icon={Zap} delay={0.5} duration={3} />
        <FloatingIcon Icon={Cpu} delay={1.5} duration={4} />
        <FloatingIcon Icon={Wifi} delay={2.5} duration={3.5} />
        <FloatingIcon Icon={Bot} delay={3} duration={4} />
        <FloatingIcon Icon={Sparkles} delay={0.8} duration={3.8} />
        <FloatingIcon Icon={Rocket} delay={1.8} duration={4.2} />
        <FloatingIcon Icon={Globe} delay={2.8} duration={3.2} />
        <FloatingIcon Icon={Heart} delay={3.5} duration={4.5} />
      </div>

      {/* Fixed Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/fa65252b-b20b-442e-a7ae-c427ae84b769.png" 
                alt="dKloud.in Logo" 
                className="w-8 h-8 rounded-md"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                dKloud.in
              </h1>
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 dark:from-purple-900 dark:to-blue-900 dark:text-purple-200">
              Decoding Knowledge
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="animate-tagline opacity-0 transition-all duration-1000 ease-out transform translate-y-8">
              <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Decoding Knowledge
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground mb-4">
                Library of Unique Discoveries
              </p>
              <p className="text-lg text-primary/80 mb-4">
                Powered by <span className="font-semibold text-purple-600">dKloud Tech</span>
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-8"></div>
            </div>
            
            {/* Enhanced Organization Vision */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-8 rounded-2xl border border-purple-200/50 dark:border-purple-800/50">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Our Vision
                </h3>
                <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  A passionate creative techy's knowledge space
                </Badge>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  We're on a mission to blend creativity, cloud technology, AI, and community-driven learning into one cohesive platform. Whether you're a tech enthusiast, a creative mind, or a curious learner, you'll find something meaningful here.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Badge variant="outline" className="border-purple-300 text-purple-700 dark:border-purple-700 dark:text-purple-300">
                    <Cloud className="h-3 w-3 mr-1" />
                    Cloud Technology
                  </Badge>
                  <Badge variant="outline" className="border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-300">
                    <Bot className="h-3 w-3 mr-1" />
                    AI Integration
                  </Badge>
                  <Badge variant="outline" className="border-indigo-300 text-indigo-700 dark:border-indigo-700 dark:text-indigo-300">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Creative Learning
                  </Badge>
                  <Badge variant="outline" className="border-green-300 text-green-700 dark:border-green-700 dark:text-green-300">
                    <Heart className="h-3 w-3 mr-1" />
                    Community Driven
                  </Badge>
                </div>
              </div>
            </div>

            {/* Founder Section */}
            <div className="flex flex-col items-center mb-12">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 ring-4 ring-purple-200/50 dark:ring-purple-800/50">
                <img 
                  src="/lovable-uploads/60f33ce6-efaa-4f60-a11c-09517021a6ff.png" 
                  alt="Dileep Yadav - Founder" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=400";
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dileep Yadav</h3>
              <p className="text-muted-foreground mb-2">Founder & Creator</p>
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 dark:from-purple-900 dark:to-blue-900 dark:text-purple-200">
                dKloud Tech
              </Badge>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-4 mb-12">
              <Button variant="outline" size="sm" asChild className="border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300">
                <a href="https://wa.me/918175996960" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild className="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300">
                <a href="https://www.linkedin.com/in/dileep-yadav-63500158" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild className="border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300">
                <a href="https://instagram.com/batbotdk09" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4 mr-2" />
                  Instagram
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300">
                <a href="mailto:dileepkryadav09@gmail.com">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <div className="container mx-auto px-4 pb-20 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
            <TabsTrigger value="movies-tv" className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
              <Film className="h-4 w-4 mr-1" />
              Movies & TV
            </TabsTrigger>
            <TabsTrigger value="youtube" className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Youtube className="h-4 w-4 mr-1" />
              YouTube Picks
            </TabsTrigger>
            <TabsTrigger value="ai-tools" className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Bot className="h-4 w-4 mr-1" />
              AI Tools
            </TabsTrigger>
            <TabsTrigger value="tech" className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Wrench className="h-4 w-4 mr-1" />
              Tech Corner
            </TabsTrigger>
            <TabsTrigger value="gadgets" className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
              <Smartphone className="h-4 w-4 mr-1" />
              SmartTech
            </TabsTrigger>
          </TabsList>

          <div className="mb-8 text-center">
            <Button
              variant={activeTab === 'portfolio' ? 'default' : 'outline'}
              onClick={() => setActiveTab('portfolio')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:from-purple-700 hover:to-blue-700"
            >
              <User className="h-4 w-4 mr-2" />
              Portfolio
            </Button>
          </div>

          <TabsContent value="movies-tv">
            <Tabs value={moviesTVTab} onValueChange={setMoviesTVTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                <TabsTrigger value="movies" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
                  <Film className="h-4 w-4 mr-2" />
                  Movies
                </TabsTrigger>
                <TabsTrigger value="tv" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                  <Tv className="h-4 w-4 mr-2" />
                  TV Series
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="movies">
                <MoviesTab />
              </TabsContent>
              
              <TabsContent value="tv">
                <TVSeriesTab />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="youtube">
            <YouTubeChannelsTab />
          </TabsContent>

          <TabsContent value="ai-tools">
            <AIToolsTab />
          </TabsContent>

          <TabsContent value="tech">
            <TechCornerTab />
          </TabsContent>

          <TabsContent value="gadgets">
            <GadgetsTab />
          </TabsContent>

          {/* Enhanced How It Works Section */}
          {activeTab === 'movies-tv' && (
            <div className="mt-16">
              <HowItWorksSection />
              
              {/* Enhanced Future Vision Section */}
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200/50 dark:border-purple-800/50 mt-12">
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    🧠 Future Vision
                  </CardTitle>
                  <CardDescription>What's coming next to dKloud.in</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>✅ Dynamic Movies, TV, YouTube integrated</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>✅ Poetry & Shayari collection added</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>✅ Free AI Assistant integrated</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>🌐 Enhanced mobile optimization</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>📦 Advanced filtering & search</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>🚀 Hosted on GitHub Pages</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span>🎨 React + TypeScript + Tailwind CSS</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </Tabs>
      </div>

      <ContactFloatingButtons />
      <AIAssistant />
    </div>
  );
};

export default Index;
