
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Moon, Sun, Film, Tv, Youtube, Bot, Wrench, Newspaper, Smartphone, User, MessageCircle, Mail, Instagram, Linkedin, Music, Code, Cloud, Zap, Cpu, Wifi } from 'lucide-react';
import { useTheme } from "@/hooks/use-theme";
import MoviesTab from '@/components/MoviesTab';
import TVSeriesTab from '@/components/TVSeriesTab';
import YouTubeChannelsTab from '@/components/YouTubeChannelsTab';
import AIToolsTab from '@/components/AIToolsTab';
import TechCornerTab from '@/components/TechCornerTab';
import TechNewsTab from '@/components/TechNewsTab';
import GadgetsTab from '@/components/GadgetsTab';
import PortfolioPage from '@/components/PortfolioPage';
import HowItWorksSection from '@/components/HowItWorksSection';
import ContactFloatingButtons from '@/components/ContactFloatingButtons';

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
      className={`absolute animate-bounce opacity-20 text-primary transition-opacity duration-500 ${
        showFloatingIcons ? 'opacity-20' : 'opacity-0'
      }`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
      }}
    >
      <Icon className="h-6 w-6" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Floating Background Animation Icons */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <FloatingIcon Icon={Music} delay={0} />
        <FloatingIcon Icon={Code} delay={1} />
        <FloatingIcon Icon={Cloud} delay={2} />
        <FloatingIcon Icon={Zap} delay={0.5} />
        <FloatingIcon Icon={Cpu} delay={1.5} />
        <FloatingIcon Icon={Wifi} delay={2.5} />
        <FloatingIcon Icon={Bot} delay={3} />
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                dKloud.in
              </h1>
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Decoding Knowledge
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hidden sm:flex"
            >
              Home
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="animate-tagline opacity-0 transition-all duration-1000 ease-out transform translate-y-8">
              <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Decoding Knowledge
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground mb-4">
                Library of Unique Discoveries
              </p>
              <p className="text-lg text-primary/80 mb-8">
                Powered by <span className="font-semibold">dKloud Tech</span>
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto mb-8"></div>
            </div>
            
            <div className="max-w-2xl mx-auto mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                A knowledge space built to inform, inspire, and empower through creativity, 
                cloud, automation, and learning.
              </p>
            </div>

            {/* Founder Section */}
            <div className="flex flex-col items-center mb-12">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 ring-4 ring-primary/20">
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
              <p className="text-muted-foreground">Founder & Creator</p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-4 mb-12">
              <Button variant="outline" size="sm" asChild>
                <a href="https://wa.me/918175996960" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://www.linkedin.com/in/dileep-yadav-63500158" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://instagram.com/batbotdk09" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4 mr-2" />
                  Instagram
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
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
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            <TabsTrigger value="movies-tv" className="text-xs sm:text-sm">
              <Film className="h-4 w-4 mr-1" />
              Movies & TV
            </TabsTrigger>
            <TabsTrigger value="youtube" className="text-xs sm:text-sm">
              <Youtube className="h-4 w-4 mr-1" />
              YouTube Picks
            </TabsTrigger>
            <TabsTrigger value="ai-tools" className="text-xs sm:text-sm">
              <Bot className="h-4 w-4 mr-1" />
              AI Tools
            </TabsTrigger>
            <TabsTrigger value="tech" className="text-xs sm:text-sm">
              <Wrench className="h-4 w-4 mr-1" />
              Tech Corner
            </TabsTrigger>
            <TabsTrigger value="gadgets" className="text-xs sm:text-sm">
              <Smartphone className="h-4 w-4 mr-1" />
              SmartTech
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="text-xs sm:text-sm">
              <User className="h-4 w-4 mr-1" />
              Portfolio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="movies-tv">
            <Tabs value={moviesTVTab} onValueChange={setMoviesTVTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="movies">
                  <Film className="h-4 w-4 mr-2" />
                  Movies
                </TabsTrigger>
                <TabsTrigger value="tv">
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

          {/* How It Works Section - shown when scrolling */}
          {activeTab === 'movies-tv' && (
            <div className="mt-16">
              <HowItWorksSection />
              
              {/* Future Vision Section */}
              <Card className="bg-gradient-to-r from-primary/5 to-blue-600/5 border-primary/20 mt-12">
                <CardHeader>
                  <CardTitle className="text-2xl">🧠 Future Vision</CardTitle>
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
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>🌐 Global top YouTube picks (Hindi + English)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>📦 Launch AI Learning + Smart Gadgets</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>🔒 Admin dashboard (in future)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>🚀 Hosted on GitHub Pages</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </Tabs>
      </div>

      <ContactFloatingButtons />
    </div>
  );
};

export default Index;
