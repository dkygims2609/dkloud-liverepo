
import React, { useState, useEffect } from 'react';
import { Cloud, Code, Music, Sparkles, Zap, Globe, Palette, Brain, Rocket, Wifi, Cpu, Database, Monitor, Smartphone } from 'lucide-react';

const floatingIcons = [
  { icon: Cloud, color: 'text-blue-500', size: 'h-8 w-8' },
  { icon: Music, color: 'text-pink-500', size: 'h-7 w-7' },
  { icon: Code, color: 'text-green-500', size: 'h-6 w-6' },
  { icon: Cpu, color: 'text-orange-500', size: 'h-7 w-7' },
  { icon: Database, color: 'text-indigo-500', size: 'h-6 w-6' },
  { icon: Monitor, color: 'text-teal-500', size: 'h-8 w-8' },
  { icon: Smartphone, color: 'text-purple-500', size: 'h-6 w-6' },
  { icon: Wifi, color: 'text-cyan-500', size: 'h-7 w-7' },
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
        filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))',
      }}
    >
      <Icon className={`${color} ${size} drop-shadow-sm`} />
    </div>
  );
};

interface FloatingIconsProps {
  showFloatingIcons: boolean;
}

const FloatingIcons = ({ showFloatingIcons }: FloatingIconsProps) => {
  if (!showFloatingIcons) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {floatingIcons.map((iconData, index) => (
        <FloatingIcon
          key={index}
          {...iconData}
          delay={index * 800 + Math.random() * 1000}
        />
      ))}
    </div>
  );
};

export default FloatingIcons;
