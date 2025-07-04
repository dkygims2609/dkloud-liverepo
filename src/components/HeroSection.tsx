
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';
import ShuffleText from './ShuffleText';

interface HeroSectionProps {
  scrollToContent: () => void;
}

const HeroSection = ({ scrollToContent }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          <img 
            src="/lovable-uploads/47dfee5e-0dc4-495e-b003-53a83aca36ad.png" 
            alt="dKloud Logo" 
            className="h-20 w-auto animate-fade-in"
          />
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-slide-up">
              dKloud.in
            </h1>
            <div className="animate-tagline">
              <ShuffleText 
                text="Decoding Knowledge" 
                className="text-xl md:text-2xl text-muted-foreground font-medium" 
              />
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            A knowledge space built to inform, inspire, and empower through creativity, 
            cloud computing, automation, and continuous learning.
          </p>
        </div>

        {/* Enhanced Seamless Highlights Section - No Card Boundaries */}
        <div className="max-w-6xl mx-auto mt-16 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-scale-in">
            <div className="text-center space-y-4 p-6 rounded-lg bg-gradient-to-br from-blue-50/80 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/20 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <span className="text-white text-2xl">☁️</span>
              </div>
              <h3 className="font-bold text-lg text-blue-700 dark:text-blue-400">Cloud Computing</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Modern infrastructure solutions and cloud technologies</p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg bg-gradient-to-br from-purple-50/80 to-purple-100/50 dark:from-purple-900/30 dark:to-purple-800/20 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <span className="text-white text-2xl">🎵</span>
              </div>
              <h3 className="font-bold text-lg text-purple-700 dark:text-purple-400">Music Composer</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Original compositions, melodies, and creative music</p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg bg-gradient-to-br from-green-50/80 to-green-100/50 dark:from-green-900/30 dark:to-green-800/20 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <span className="text-white text-2xl">📝</span>
              </div>
              <h3 className="font-bold text-lg text-green-700 dark:text-green-400">Content Creator</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Educational content and creative storytelling</p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg bg-gradient-to-br from-orange-50/80 to-orange-100/50 dark:from-orange-900/30 dark:to-orange-800/20 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h3 className="font-bold text-lg text-orange-700 dark:text-orange-400">Creative Techy</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Innovation meets artistry in technology</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-fade-in">
          <Button 
            onClick={scrollToContent}
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:scale-105"
          >
            Explore Content
            <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
