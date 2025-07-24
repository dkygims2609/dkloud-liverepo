
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
