
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Code, Zap, Users } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Code className="h-8 w-8 text-blue-500" />,
      title: "Built with React + TailwindCSS",
      description: "Modern frontend framework with responsive design and smooth animations",
      tech: ["React", "TypeScript", "Tailwind CSS"]
    },
    {
      icon: <Database className="h-8 w-8 text-green-500" />,
      title: "Content Powered via Google Sheets",
      description: "Dynamic content management using Google Sheets APIs for easy updates",
      tech: ["Google Sheets", "SheetBest API", "Google Apps Script"]
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Real-time Updates",
      description: "Content updates instantly by editing Google Sheets - no code changes needed",
      tech: ["REST APIs", "Real-time Sync", "Auto-refresh"]
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: "User-Friendly Management",
      description: "Non-technical users can easily manage content through familiar spreadsheet interface",
      tech: ["No-code", "Spreadsheet UI", "Simple Management"]
    }
  ];

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">🔧 How It Works</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A powerful combination of modern web technologies and simple content management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent"></div>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-muted">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {step.tech.map((tech, techIndex) => (
                  <Badge key={techIndex} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-primary/5 to-blue-600/5 border border-primary/20 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold mb-2">✨ The Best of Both Worlds</h3>
        <p className="text-muted-foreground">
          Cutting-edge web technology meets simple content management. 
          Developers get modern tools, content managers get spreadsheets. Everyone wins!
        </p>
      </div>
    </section>
  );
};

export default HowItWorksSection;
