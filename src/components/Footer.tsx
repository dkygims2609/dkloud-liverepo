
import React from 'react';
import { Github, Globe, Mail, Phone, MapPin, Heart, Code, Cloud } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const Footer = () => {
  const handleQuickLinkClick = (tabValue: string) => {
    // Trigger tab change by dispatching a custom event
    const tabsElement = document.querySelector('[role="tablist"]');
    const targetTab = document.querySelector(`[value="${tabValue}"]`) as HTMLButtonElement;
    
    if (targetTab) {
      targetTab.click();
      // Scroll to main content
      const element = document.getElementById('main-content');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-t border-border mt-16 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/422cbbb0-c4bc-4187-9a72-3357810c13df.png" 
                alt="dKloud Tech Logo" 
                className="h-12 w-12 rounded-full border-2 border-purple-200 dark:border-purple-700"
              />
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  dKloud.in
                </h3>
                <p className="text-sm text-muted-foreground">by dKloud Tech</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Decoding Knowledge - Your Library Of Unique Discoveries. 
              A passionate creative techy's knowledge space.
            </p>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-sm text-muted-foreground">Made with passion for tech community</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleQuickLinkClick('movies')}
                  className="text-gray-600 hover:text-purple-600 transition-colors text-left"
                >
                  Movies & TV
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLinkClick('youtube')}
                  className="text-gray-600 hover:text-purple-600 transition-colors text-left"
                >
                  YouTube Picks
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLinkClick('ai')}
                  className="text-gray-600 hover:text-purple-600 transition-colors text-left"
                >
                  AI Tools
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLinkClick('tech')}
                  className="text-gray-600 hover:text-purple-600 transition-colors text-left"
                >
                  Tech Corner
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLinkClick('gadgets')}
                  className="text-gray-600 hover:text-purple-600 transition-colors text-left"
                >
                  SmartTech
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLinkClick('news')}
                  className="text-gray-600 hover:text-purple-600 transition-colors text-left"
                >
                  Tech News
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLinkClick('services')}
                  className="text-gray-600 hover:text-purple-600 transition-colors text-left"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLinkClick('portfolio')}
                  className="text-gray-600 hover:text-purple-600 transition-colors text-left"
                >
                  Portfolio
                </button>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Tech Stack</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-gray-600">React + TypeScript</span>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600">Google Apps Script</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-gray-600">GitHub Pages</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">Tailwind CSS</Badge>
              <Badge variant="secondary" className="text-xs">Shadcn/ui</Badge>
              <Badge variant="secondary" className="text-xs">Vite</Badge>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Connect</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600" />
                <a href="https://dkloud.in" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                  dKloud.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-red-600" />
                <a href="mailto:dileepkryadav09@gmail.com" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                  dileepkryadav09@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-600" />
                <a href="https://wa.me/91817596960" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4 text-gray-800" />
                <a href="https://instagram.com/batbotdk09" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                  Instagram
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-700" />
                <a href="https://www.linkedin.com/in/dileep-yadav-63500158" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center md:items-start gap-2 text-sm text-muted-foreground">
              <span>© 2024 dKloud Tech. All rights reserved.</span>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <span>
                  🧠 Built with ❤️ using{' '}
                  <a 
                    href="https://lovable.dev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Lovable AI
                  </a>
                </span>
                <span>
                  🚀 Developed & Managed by{' '}
                  <a 
                    href="https://dkloud.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    dKloud Tech
                  </a>
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-xs">
                🚀 Hosted on GitHub Pages
              </Badge>
              <Badge variant="outline" className="text-xs">
                ⚡ Powered by Google Sheets
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
