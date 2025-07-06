import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageCircle, Palette, Music, Guitar, PenTool, GraduationCap, Code, Lightbulb } from 'lucide-react';

const ServicesTab = () => {
  const services = [
    {
      title: "Custom AI-Generated Logos & Designs",
      description: "A creative AI-powered logo design service tailored to your brand's identity. Personalized to fit the client's vision and brand story.",
      icon: <Palette className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Custom AI-Generated Songs for Occasions",
      description: "Custom songs for birthdays, weddings, anniversaries, and more. Provide your preferences and receive a unique, personalized song.",
      icon: <Music className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Music Composition & Songwriting",
      description: "Original music and lyrics for special events or projects. Wide variety of genres available to choose from.",
      icon: <Guitar className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Poetry & Shayari Writing",
      description: "Personalized poetry, shayari, and diary writing for gifts, events, or personal use. Deeply personalized based on emotions or occasions.",
      icon: <PenTool className="h-6 w-6" />,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Guitar Music Classes",
      description: "Personalized 1-on-1 guitar lessons with structure, feedback, and creative exploration for music enthusiasts.",
      icon: <GraduationCap className="h-6 w-6" />,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Website Development Services",
      description: "Personal blogs, portfolios, or business websites with sleek design and user-friendly functionality.",
      icon: <Code className="h-6 w-6" />,
      color: "from-teal-500 to-blue-500"
    },
    {
      title: "One-on-One Classes & Workshops",
      description: "Music composition, AI design, songwriting, and other creative areas. Personalized instruction to gain valuable skills.",
      icon: <Lightbulb className="h-6 w-6" />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Custom Digital Solutions",
      description: "Branding, graphic design, video editing, and more. Versatile digital solutions for all your creative needs.",
      icon: <Palette className="h-6 w-6" />,
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">🚀 What I Offer</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          From AI-powered designs to heartfelt music compositions, I offer a unique blend of traditional artistry and modern technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-l-4 border-l-transparent hover:border-l-primary">
            <CardHeader>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                {service.icon}
              </div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <div className="space-y-3 pt-4 border-t">
                <h4 className="font-semibold text-sm">Get in Touch:</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href="mailto:dileepkryadav09@gmail.com">
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://wa.me/91817596960" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
                <Button size="sm" className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700">
                  Start Your Project
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center bg-gradient-to-r from-primary/5 to-blue-500/5 p-8 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Let's bring your ideas to life</h3>
        <p className="text-lg text-muted-foreground mb-6">
          Whether it's music, design, or storytelling. I'm ready when you are.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600" asChild>
            <a href="mailto:dileepkryadav09@gmail.com">
              Start Your Project
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://wa.me/91817596960" target="_blank" rel="noopener noreferrer">
              Contact Me
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesTab;