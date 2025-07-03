
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import RunningBanner from '@/components/RunningBanner';
import FloatingIcons from '@/components/FloatingIcons';
import HeroSection from '@/components/HeroSection';
import TabsSection from '@/components/TabsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import AIAssistant from '@/components/AIAssistant';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';

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

      {/* Enhanced Running Banner */}
      <RunningBanner />

      {/* Enhanced Floating Icons */}
      <FloatingIcons showFloatingIcons={showFloatingIcons} />

      {/* Header with Navigation */}
      <Header
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        handleTabClick={handleTabClick}
      />

      {/* Hero Section */}
      <HeroSection scrollToContent={scrollToContent} />

      {/* Enhanced Main Content Tabs */}
      <TabsSection activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* How It Works Section */}
      <HowItWorksSection />

      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Index;
