
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

        {/* Highlights Section */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 hero-highlights animate-scale-in">
            <div className="bg-card/60 backdrop-blur-sm border rounded-lg p-4 hover-scale">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400">Movies & TV</h3>
              <p className="text-sm text-muted-foreground">Curated recommendations</p>
            </div>
            <div className="bg-card/60 backdrop-blur-sm border rounded-lg p-4 hover-scale">
              <h3 className="font-semibold text-purple-600 dark:text-purple-400">AI Tools</h3>
              <p className="text-sm text-muted-foreground">Latest innovations</p>
            </div>
            <div className="bg-card/60 backdrop-blur-sm border rounded-lg p-4 hover-scale">
              <h3 className="font-semibold text-green-600 dark:text-green-400">Tech Corner</h3>
              <p className="text-sm text-muted-foreground">Developer resources</p>
            </div>
            <div className="bg-card/60 backdrop-blur-sm border rounded-lg p-4 hover-scale">
              <h3 className="font-semibold text-orange-600 dark:text-orange-400">Creative Space</h3>
              <p className="text-sm text-muted-foreground">Music & Poetry</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-fade-in">
          <Button 
            onClick={scrollToContent}
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
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
