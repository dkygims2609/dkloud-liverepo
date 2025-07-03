
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Code, Zap, Users, ArrowRight, Globe, Smartphone, MousePointer, Server, Monitor, Github } from 'lucide-react';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: <MousePointer className="h-8 w-8 text-blue-500" />,
      title: "User Clicks Tab",
      description: "You click on any content section like Movies, AI Tools, etc.",
      detail: "Simple, intuitive navigation",
      position: { x: 5, y: 30 }
    },
    {
      icon: <Globe className="h-8 w-8 text-green-500" />,
      title: "Frontend Request",
      description: "React + TypeScript sends HTTP request",
      detail: "Modern web technology",
      position: { x: 25, y: 50 }
    },
    {
      icon: <Server className="h-8 w-8 text-purple-500" />,
      title: "API Gateway",
      description: "Request routes to Google Apps Script APIs",
      detail: "Serverless architecture",
      position: { x: 45, y: 30 }
    },
    {
      icon: <Database className="h-8 w-8 text-orange-500" />,
      title: "Google Sheets",
      description: "Data retrieved from spreadsheet backend",
      detail: "No-code content management",
      position: { x: 65, y: 50 }
    },
    {
      icon: <Code className="h-8 w-8 text-red-500" />,
      title: "Data Processing",
      description: "JSON formatted and optimized",
      detail: "Tailwind CSS styling applied",
      position: { x: 85, y: 30 }
    },
    {
      icon: <Monitor className="h-8 w-8 text-yellow-500" />,
      title: "Render Result",
      description: "Beautiful UI displayed instantly",
      detail: "Responsive & fast",
      position: { x: 95, y: 50 }
    }
  ];

  // Auto-animate through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">🔧 How dKloud.in Works</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Powered by React + TypeScript + Tailwind CSS with Google Sheets backend
        </p>
      </div>

      {/* Animated Flow Diagram */}
      <div className="relative bg-gradient-to-r from-primary/5 to-blue-600/5 border border-primary/20 rounded-lg p-8 min-h-[500px]">
        <h3 className="text-xl font-bold mb-6 text-center">🎯 Live Data Flow Animation</h3>
        
        {/* Animated Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Connecting Lines with Glow */}
          {steps.slice(0, -1).map((step, index) => {
            const nextStep = steps[index + 1];
            return (
              <line
                key={index}
                x1={`${step.position.x}%`}
                y1={`${step.position.y}%`}
                x2={`${nextStep.position.x}%`}
                y2={`${nextStep.position.y}%`}
                stroke="url(#pathGradient)"
                strokeWidth="4"
                strokeDasharray="8,4"
                filter="url(#glow)"
                className={`transition-all duration-1000 ${
                  index <= activeStep ? 'opacity-100 animate-pulse' : 'opacity-30'
                }`}
              />
            );
          })}
          
          {/* Animated Data Pulse */}
          <circle
            cx={`${steps[activeStep]?.position.x}%`}
            cy={`${steps[activeStep]?.position.y}%`}
            r="12"
            fill="#3b82f6"
            filter="url(#glow)"
            className="animate-ping"
          />
          <circle
            cx={`${steps[activeStep]?.position.x}%`}
            cy={`${steps[activeStep]?.position.y}%`}
            r="8"
            fill="#60a5fa"
            className="animate-pulse"
          />
        </svg>

        {/* Step Icons */}
        {steps.map((step, index) => (
          <div
            key={index}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
              index === activeStep ? 'scale-125 z-10' : 'scale-100 z-0'
            }`}
            style={{
              left: `${step.position.x}%`,
              top: `${step.position.y}%`,
            }}
          >
            <div className={`p-4 rounded-full bg-background border-2 shadow-lg transition-all duration-500 ${
              index === activeStep 
                ? 'border-primary bg-primary/10 shadow-primary/20 shadow-2xl' 
                : 'border-muted hover:border-primary/50'
            }`}>
              {step.icon}
            </div>
            <div className="mt-3 text-center max-w-[140px]">
              <h4 className="text-sm font-semibold">{step.title}</h4>
              <Badge variant="secondary" className="text-xs mt-1">
                {step.detail}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Tech Stack */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-500/10">
                <Code className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Frontend Stack</CardTitle>
                <CardDescription>Modern React Architecture</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">React 18</span>
                <Badge variant="secondary">Latest</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">TypeScript</span>
                <Badge variant="secondary">Type Safe</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Tailwind CSS</span>
                <Badge variant="secondary">Responsive</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Shadcn/ui</span>
                <Badge variant="secondary">Components</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <Database className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Backend APIs</CardTitle>
                <CardDescription>Google Cloud Platform</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Google Sheets</span>
                <Badge variant="secondary">Database</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Apps Script</span>
                <Badge variant="secondary">Serverless</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">REST APIs</span>
                <Badge variant="secondary">RESTful</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">SheetBest</span>
                <Badge variant="secondary">Integration</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-500/10">
                <Github className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Deployment</CardTitle>
                <CardDescription>GitHub Pages Hosting</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">GitHub Pages</span>
                <Badge variant="secondary">Static Host</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">GitHub Actions</span>
                <Badge variant="secondary">CI/CD</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Custom Domain</span>
                <Badge variant="secondary">dKloud.in</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">SSL Certificate</span>
                <Badge variant="secondary">Secure</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* The Magic Section */}
      <div className="bg-gradient-to-r from-primary/5 to-blue-600/5 border border-primary/20 rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4 text-center">✨ The Magic Behind dKloud.in</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-primary">🎯 For Content Managers</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Update content by editing Google Sheets</li>
              <li>• No coding knowledge required</li>
              <li>• Real-time updates to website</li>
              <li>• Collaborate with team members easily</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-primary">⚡ For Developers</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Modern React + TypeScript codebase</li>
              <li>• Component-based architecture</li>
              <li>• Responsive Tailwind CSS design</li>
              <li>• GitHub integration for version control</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-6">
          <Badge className="bg-gradient-to-r from-primary to-blue-600 text-white text-lg px-4 py-2">
            🚀 Hosted on GitHub Pages - Fast, Reliable, Scalable
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
