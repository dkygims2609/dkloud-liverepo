
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, X } from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm dKloud AI Assistant. I can help you navigate this website and answer questions about our content, features, and dKloud Tech. What would you like to know?"
    }
  ]);

  const predefinedResponses = {
    'about': "dKloud.in is a knowledge platform by dKloud Tech, curating movies, TV series, YouTube channels, AI tools, tech resources, and creative content. We're passionate about blending creativity, technology, and learning.",
    'features': "Our website includes: 🎬 Movies & TV Series collections, 📺 YouTube Picks, 🤖 AI Tools, 🔧 Tech Corner, 📱 SmartTech Gadgets, ✍️ Poetry & Shayari, and 👤 Founder's Portfolio.",
    'founder': "The founder is Dileep Yadav, a passionate creative tech enthusiast. You can find his complete portfolio, original compositions, and poetry in the Portfolio section.",
    'contact': "You can reach us via WhatsApp: +91-8175996960, LinkedIn: dileep-yadav-63500158, Instagram: @batbotdk09, or Email: dileepkryadav09@gmail.com",
    'tech': "We use React, TypeScript, Tailwind CSS, and are hosted on GitHub Pages. Our data comes from Google Sheets APIs for dynamic content management.",
    'navigation': "Use the main tabs: Movies & TV, YouTube Picks, AI Tools, Tech Corner, SmartTech, and Portfolio. Each section has search and filter options.",
    'default': "I can help you with information about dKloud.in features, navigation, founder details, contact information, or general questions about our platform. What specific topic interests you?"
  };

  const handleSend = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message
    };

    const lowerMessage = message.toLowerCase();
    let response = predefinedResponses.default;

    Object.keys(predefinedResponses).forEach(key => {
      if (lowerMessage.includes(key)) {
        response = predefinedResponses[key];
      }
    });

    const botMessage = {
      id: messages.length + 2,
      type: 'bot',
      content: response
    };

    setMessages([...messages, userMessage, botMessage]);
    setMessage('');
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
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
        size="icon"
      >
        <Bot className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-80 h-96 shadow-2xl bg-gradient-to-br from-background to-purple-50/20 dark:to-purple-900/10 border-purple-200/50 dark:border-purple-800/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-600" />
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
          Ask me anything about dKloud.in!
        </CardDescription>
        <Badge variant="secondary" className="w-fit bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          Free AI Assistant
        </Badge>
      </CardHeader>
      
      <CardContent className="flex flex-col h-full pb-4">
        <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.type === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-foreground'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about dKloud.in..."
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
