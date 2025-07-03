
import React from 'react';
import { Button } from "@/components/ui/button";
import { Cloud, Music, Palette, Rocket, Star, Users, Github, Brain, ArrowDown } from 'lucide-react';
import ShuffleText from './ShuffleText';

interface HeroSectionProps {
  scrollToContent: () => void;
}

const HeroSection = ({ scrollToContent }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center max-w-6xl mx-auto">
          {/* Animated Title */}
          <div className="mb-8">
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

          {/* Minimalistic Description */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <p className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-3 leading-relaxed">
                At dKloud, we're crafting a universe where creativity meets the cloud, AI fuels curiosity, and learning becomes a shared adventure.
              </p>
              
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                Whether you're a <span className="text-blue-600 dark:text-blue-400 font-semibold">tech explorer</span>, 
                a <span className="text-purple-600 dark:text-purple-400 font-semibold">digital creator</span>, or 
                a <span className="text-green-600 dark:text-green-400 font-semibold">seeker of knowledge</span> — 
                this is your space to discover, build, and belong.
              </p>
            </div>
          </div>

          {/* Seamless Highlights - Moved Below Description */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {/* Flowing Wave Design */}
            <div className="relative">
              <svg className="w-full h-32 mb-4" viewBox="0 0 1200 120" fill="none">
                <path d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 L1200,120 L0,120 Z" 
                      fill="url(#gradient)" className="opacity-80"/>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(147, 51, 234)" />
                    <stop offset="25%" stopColor="rgb(59, 130, 246)" />
                    <stop offset="50%" stopColor="rgb(16, 185, 129)" />
                    <stop offset="75%" stopColor="rgb(245, 101, 101)" />
                    <stop offset="100%" stopColor="rgb(251, 146, 60)" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Icons positioned on the wave */}
              <div className="absolute inset-0 flex items-center justify-between px-8 md:px-16">
                <div className="flex flex-col items-center text-center group cursor-pointer">
                  <Cloud className="h-10 w-10 text-blue-500 mb-2 group-hover:scale-110 transition-transform drop-shadow-lg" />
                  <p className="font-bold text-gray-800 dark:text-white text-sm">Cloud Computing</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Scalable Solutions</p>
                </div>
                
                <div className="flex flex-col items-center text-center group cursor-pointer">
                  <Music className="h-10 w-10 text-pink-500 mb-2 group-hover:scale-110 transition-transform drop-shadow-lg" />
                  <p className="font-bold text-gray-800 dark:text-white text-sm">Music Composer</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Creative Melodies</p>
                </div>
                
                <div className="flex flex-col items-center text-center group cursor-pointer">
                  <Palette className="h-10 w-10 text-purple-500 mb-2 group-hover:scale-110 transition-transform drop-shadow-lg" />
                  <p className="font-bold text-gray-800 dark:text-white text-sm">Content Creator</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Digital Stories</p>
                </div>
                
                <div className="flex flex-col items-center text-center group cursor-pointer">
                  <Rocket className="h-10 w-10 text-red-500 mb-2 group-hover:scale-110 transition-transform drop-shadow-lg" />
                  <p className="font-bold text-gray-800 dark:text-white text-sm">Creative Techy</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Innovation Drive</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Feature Grid Below Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.5s' }}>
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
          <div className="flex flex-col items-center gap-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
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
  );
};

export default HeroSection;
