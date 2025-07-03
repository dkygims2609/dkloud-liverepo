
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Code, Zap, Users, ArrowRight, Globe, Smartphone } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: "User Clicks Tab",
      description: "You click on any content section like Movies, AI Tools, etc.",
      detail: "Simple, intuitive navigation"
    },
    {
      icon: <Code className="h-8 w-8 text-green-500" />,
      title: "HTML Request",
      description: "Browser sends request to page",
      detail: "Modern web technology at work"
    },
    {
      icon: <Database className="h-8 w-8 text-purple-500" />,
      title: "SheetBest API",
      description: "Calls Google Sheets API to fetch fresh data",
      detail: "Real-time content sync"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-orange-500" />,
      title: "Google Sheets",
      description: "Fetches data from spreadsheet",
      detail: "Easy content management"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Display Result",
      description: "Shows content on your screen instantly",
      detail: "Lightning-fast delivery"
    }
  ];

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">🔧 How dKloud.in Works</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Powered by Google Sheets and APIs for dynamic content management
        </p>
      </div>

      {/* Visual Flow Diagram */}
      <div className="relative">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col lg:flex-row items-center">
              <Card className="w-full max-w-xs hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-background to-muted/20">
                <CardHeader className="text-center pb-3">
                  <div className="mx-auto p-3 rounded-full bg-muted/50 w-fit">
                    {step.icon}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription className="text-sm">{step.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <Badge variant="secondary" className="text-xs">
                    {step.detail}
                  </Badge>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block mx-4">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              
              {index < steps.length - 1 && (
                <div className="lg:hidden my-2">
                  <div className="w-0.5 h-8 bg-muted-foreground/30 mx-auto"></div>
                </div>
              )}
            </div>
          ))}
        </div>
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
                <CardDescription>SheetBest API + Google Apps Script</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Google Sheets</Badge>
              <Badge variant="secondary">SheetBest API</Badge>
              <Badge variant="secondary">Apps Script</Badge>
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
