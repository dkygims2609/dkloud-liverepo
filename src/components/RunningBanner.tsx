
import React from 'react';

const RunningBanner = () => {
  return (
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
  );
};

export default RunningBanner;
