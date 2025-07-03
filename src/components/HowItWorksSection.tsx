
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Code, Zap, Users, ArrowRight, Globe, Smartphone, MousePointer, Server, Monitor } from 'lucide-react';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: <MousePointer className="h-8 w-8 text-blue-500" />,
      title: "User Clicks Tab",
      description: "You click on any content section like Movies, AI Tools, etc.",
      detail: "Simple, intuitive navigation",
      position: { x: 10, y: 20 }
    },
    {
      icon: <Globe className="h-8 w-8 text-green-500" />,
      title: "Browser Request",
      description: "Browser sends HTTP request to our server",
      detail: "Modern web technology at work",
      position: { x: 30, y: 40 }
    },
    {
      icon: <Server className="h-8 w-8 text-purple-500" />,
      title: "API Call",
      description: "Server calls Google Sheets API to fetch fresh data",
      detail: "Real-time content sync",
      position: { x: 50, y: 20 }
    },
    {
      icon: <Database className="h-8 w-8 text-orange-500" />,
      title: "Google Sheets",
      description: "Data is retrieved from our spreadsheet backend",
      detail: "Easy content management",
      position: { x: 70, y: 40 }
    },
    {
      icon: <Monitor className="h-8 w-8 text-yellow-500" />,
      title: "Display Result",
      description: "Content appears on your screen instantly",
      detail: "Lightning-fast delivery",
      position: { x: 90, y: 20 }
    }
  ];

  // Auto-animate through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">🔧 How dKloud.in Works</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Powered by Google Sheets and APIs for dynamic content management
        </p>
      </div>

      {/* Animated Flow Diagram */}
      <div className="relative bg-gradient-to-r from-primary/5 to-blue-600/5 border border-primary/20 rounded-lg p-8 min-h-[400px]">
        <h3 className="text-xl font-bold mb-6 text-center">🎯 Live Data Flow Animation</h3>
        
        {/* Animated Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          {/* Connecting Lines */}
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
                strokeWidth="3"
                strokeDasharray="5,5"
                className={`transition-opacity duration-500 ${
                  index <= activeStep ? 'opacity-100' : 'opacity-30'
                }`}
              />
            );
          })}
          
          {/* Animated Dot */}
          <circle
            cx={`${steps[activeStep]?.position.x}%`}
            cy={`${steps[activeStep]?.position.y}%`}
            r="8"
            fill="#3b82f6"
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
            <div className={`p-4 rounded-full bg-background border-2 shadow-lg ${
              index === activeStep ? 'border-primary bg-primary/10' : 'border-muted'
            }`}>
              {step.icon}
            </div>
            <div className="mt-2 text-center max-w-[120px]">
              <h4 className="text-sm font-semibold">{step.title}</h4>
              <Badge variant="secondary" className="text-xs mt-1">
                {step.detail}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((step, index) => (
          <Card 
            key={index} 
            className={`hover:shadow-lg transition-all duration-300 cursor-pointer ${
              index === activeStep ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
            onClick={() => setActiveStep(index)}
          >
            <CardHeader className="text-center pb-3">
              <div className="mx-auto p-3 rounded-full bg-muted/50 w-fit">
                {step.icon}
              </div>
              <CardTitle className="text-sm">{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <CardDescription className="text-xs mb-2">{step.description}</CardDescription>
              <Badge variant="outline" className="text-xs">
                {step.detail}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Technical Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Built with Modern Tech</CardTitle>
                <CardDescription>React + TypeScript + Tailwind CSS</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">React 18</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Tailwind CSS</Badge>
              <Badge variant="secondary">Responsive</Badge>
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
                <CardTitle className="text-lg">Google Sheets Backend</CardTitle>
                <CardDescription>Dynamic APIs + Google Apps Script</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Google Sheets</Badge>
              <Badge variant="secondary">Apps Script</Badge>
              <Badge variant="secondary">REST APIs</Badge>
              <Badge variant="secondary">Real-time</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Magic Behind the Scenes */}
      <div className="bg-gradient-to-r from-primary/5 to-blue-600/5 border border-primary/20 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-3 text-center">🎨 The Magic Behind the Scenes</h3>
        <p className="text-muted-foreground text-center leading-relaxed">
          Every click triggers a seamless API call to Google Sheets, ensuring all content stays fresh and 
          up-to-date without touching a single line of code. The animated workflow above represents data 
          flowing through the system in real-time!
        </p>
        <div className="flex justify-center mt-4">
          <Badge className="bg-gradient-to-r from-primary to-blue-600 text-white">
            No-Code Content Management
          </Badge>
        </div>
      </div>

      <div className="text-center">
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-lg border-l-4 border-primary">
          <h3 className="text-xl font-bold mb-2">✨ The Best of Both Worlds</h3>
          <p className="text-muted-foreground">
            Cutting-edge web technology meets simple content management. 
            Developers get modern tools, content managers get spreadsheets. Everyone wins!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
