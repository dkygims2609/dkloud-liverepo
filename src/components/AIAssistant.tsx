
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, X, Sparkles } from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm dKloud AI Assistant. I can help you navigate this website, find content, answer questions about our features, and assist with technical queries. What would you like to explore today?"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const predefinedResponses = {
    'about': "dKloud.in is a comprehensive knowledge platform by dKloud Tech. We curate movies, TV series, YouTube channels, AI tools, tech resources, and creative content. Our mission is to blend creativity, cloud technology, AI, and community-driven learning into one cohesive platform.",
    'features': "Our website includes: 🎬 Movies & TV Series collections with detailed reviews, 📺 Curated YouTube channel recommendations, 🤖 Comprehensive AI Tools directory, 🔧 Tech Corner with development resources, 📱 SmartTech Gadgets reviews, 📰 Latest Tech News, and 👤 Founder's Portfolio with original compositions and poetry.",
    'founder': "The founder is Dileep Yadav, a passionate creative tech enthusiast who combines technical expertise with creative expression. You can explore his complete portfolio, original musical compositions, poetry, and professional journey in the Portfolio section.",
    'contact': "You can reach us through multiple channels: WhatsApp: +91-8175996960, LinkedIn: dileep-yadav-63500158, Instagram: @batbotdk09, or Email: dileepkryadav09@gmail.com. All contact options are available in the Portfolio section.",
    'tech': "Our tech stack includes React with TypeScript for the frontend, Tailwind CSS for styling, Shadcn/ui for components, and we're hosted on GitHub Pages. Our dynamic content is powered by Google Sheets APIs for seamless content management.",
    'navigation': "Use the main navigation tabs: Movies & TV for entertainment content, YouTube Picks for channel recommendations, AI Tools for productivity resources, Tech Corner for development tools, SmartTech for gadget reviews, Tech News for latest updates, and Portfolio for founder information. Each section includes search and filtering capabilities.",
    'ai tools': "Our AI Tools section features a comprehensive directory of AI applications including productivity tools, creative assistants, development aids, and more. Each tool includes detailed information about purpose, pricing, and direct links.",
    'movies': "Our Movies & TV section offers curated collections of must-watch content across various genres, complete with ratings, descriptions, and viewing recommendations.",
    'youtube': "YouTube Picks features hand-selected channels across technology, creativity, education, and entertainment, helping you discover quality content creators.",
    'search': "You can search content using the search button in the header. The search functionality works across all sections to help you find specific movies, tools, channels, or topics.",
    'mobile': "The website is fully optimized for mobile devices with responsive design, touch-friendly navigation, and adaptive layouts that work seamlessly across all screen sizes.",
    'default': "I can help you with information about dKloud.in features, navigation, founder details, contact information, technical questions, or content recommendations. What specific topic interests you? You can ask about our AI tools, movie recommendations, YouTube channels, tech resources, or anything else!"
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000));

    const lowerMessage = message.toLowerCase();
    let response = predefinedResponses.default;

    // Enhanced matching logic
    Object.keys(predefinedResponses).forEach(key => {
      if (lowerMessage.includes(key)) {
        response = predefinedResponses[key];
      }
    });

    // Special responses for common queries
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = "Hello! Welcome to dKloud.in! I'm here to help you explore our platform. Whether you're looking for movie recommendations, AI tools, tech resources, or want to learn about our founder, I'm ready to assist!";
    } else if (lowerMessage.includes('help')) {
      response = "I'm here to help! You can ask me about: 🎬 Movie and TV recommendations, 🤖 AI tools and their features, 📺 YouTube channel suggestions, 🔧 Tech resources and tutorials, 📱 Smart gadgets, 👤 Founder information, or 🌐 How to navigate the website. What interests you most?";
    } else if (lowerMessage.includes('thank')) {
      response = "You're very welcome! I'm glad I could help. Feel free to ask me anything else about dKloud.in or if you need assistance exploring our content. Happy browsing! 😊";
    }

    const botMessage = {
      id: messages.length + 2,
      type: 'bot',
      content: response
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        size="icon"
      >
        <Bot className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-80 md:w-96 h-96 shadow-2xl bg-gradient-to-br from-background to-purple-50/20 dark:to-purple-900/10 border-purple-200/50 dark:border-purple-800/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bot className="h-5 w-5 text-purple-600" />
              <Sparkles className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <CardTitle className="text-lg">dKloud AI Assistant</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Your smart guide to dKloud.in
        </CardDescription>
        <Badge variant="secondary" className="w-fit bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          🤖 AI Powered • Always Active
        </Badge>
      </CardHeader>
      
      <CardContent className="flex flex-col h-full pb-4">
        <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2 scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                  msg.type === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-foreground border border-gray-200 dark:border-gray-700'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 text-foreground p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about dKloud.in..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button
            onClick={handleSend}
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            disabled={isTyping || !message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
