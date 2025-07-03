
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, Code, Server, Monitor, MousePointer, Globe, Github, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showTechStack, setShowTechStack] = useState(false);

  const steps = [
    {
      icon: <MousePointer className="h-6 w-6 text-blue-500" />,
      title: "User Clicks",
      description: "Click any content tab",
      position: { x: 5, y: 40 }
    },
    {
      icon: <Globe className="h-6 w-6 text-green-500" />,
      title: "Frontend Request",
      description: "React sends HTTP request",
      position: { x: 25, y: 60 }
    },
    {
      icon: <Server className="h-6 w-6 text-purple-500" />,
      title: "API Gateway",
      description: "Routes to Google Apps Script",
      position: { x: 45, y: 40 }
    },
    {
      icon: <Database className="h-6 w-6 text-orange-500" />,
      title: "Google Sheets",
      description: "Data retrieved from sheets",
      position: { x: 65, y: 60 }
    },
    {
      icon: <Code className="h-6 w-6 text-red-500" />,
      title: "Process Data",
      description: "JSON formatted & styled",
      position: { x: 85, y: 40 }
    },
    {
      icon: <Monitor className="h-6 w-6 text-indigo-500" />,
      title: "Render UI",
      description: "Beautiful interface displayed",
      position: { x: 95, y: 60 }
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
    <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            How dKloud.in Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the magic of modern web architecture with live data flows
          </p>
        </div>

        {/* Animated Flow Diagram */}
        <div className="relative bg-white/80 backdrop-blur-sm border border-purple-200 rounded-2xl p-8 min-h-[400px] overflow-hidden">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
            ✨ Live Data Flow Animation
          </h3>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-200/30 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-indigo-200/30 rounded-full blur-md animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          {/* Animated Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
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
                  strokeDasharray="6,3"
                  filter="url(#glow)"
                  className={`transition-all duration-1000 ${
                    index <= activeStep ? 'opacity-100' : 'opacity-30'
                  }`}
                />
              );
            })}
            
            {/* Animated Data Pulse */}
            <circle
              cx={`${steps[activeStep]?.position.x}%`}
              cy={`${steps[activeStep]?.position.y}%`}
              r="8"
              fill="#3b82f6"
              filter="url(#glow)"
              className="animate-ping"
            />
            <circle
              cx={`${steps[activeStep]?.position.x}%`}
              cy={`${steps[activeStep]?.position.y}%`}
              r="5"
              fill="#60a5fa"
            />
          </svg>

          {/* Step Icons */}
          {steps.map((step, index) => (
            <div
              key={index}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                index === activeStep ? 'scale-110 z-10' : 'scale-100 z-0'
              }`}
              style={{
                left: `${step.position.x}%`,
                top: `${step.position.y}%`,
              }}
            >
              <div className={`p-3 rounded-full bg-white border-2 shadow-lg transition-all duration-500 ${
                index === activeStep 
                  ? 'border-purple-500 bg-purple-50 shadow-purple-200 shadow-xl' 
                  : 'border-gray-200 hover:border-purple-300'
              }`}>
                {step.icon}
              </div>
              <div className="mt-2 text-center max-w-[120px]">
                <h4 className="text-xs font-semibold text-gray-800">{step.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Toggle */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowTechStack(!showTechStack)}
            className="flex items-center gap-2 mx-auto"
          >
            {showTechStack ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showTechStack ? 'Hide' : 'Show'} Tech Stack Details
            {showTechStack ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {/* Collapsible Tech Stack */}
        {showTechStack && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
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
        )}
      </div>
    </section>
  );
};

export default HowItWorksSection;
