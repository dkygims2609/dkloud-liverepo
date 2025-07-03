
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Music, FileText, Play, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PortfolioPageProps {
  onBack: () => void;
}

const PortfolioPage = ({ onBack }: PortfolioPageProps) => {
  const compositions = [
    {
      title: "Pahla Pyar",
      embedUrl: "https://www.youtube.com/embed/XLgJ4EYof3M",
      description: "A melodious composition about first love"
    },
    {
      title: "Raghuwar Ram Aa Gaye",
      embedUrl: "https://www.youtube.com/embed/153sNf2Z3Qc",
      description: "A devotional composition"
    },
    {
      title: "Pyar Nahi Hai Khel Dear",
      embedUrl: "https://www.youtube.com/embed/rgFtlUeXRqI",
      description: "A heartfelt song about love"
    },
    {
      title: "Koi Pukare Shankar",
      embedUrl: "https://www.youtube.com/embed/5jXH_7V3IUU",
      description: "A spiritual composition"
    },
    {
      title: "Jaatikaar",
      embedUrl: "https://www.youtube.com/embed/NEjGJ8A2wMI",
      description: "An original composition"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              My Portfolio
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🎼 My Portfolio</h1>
          <p className="text-lg text-muted-foreground">
            Explore my creative journey - music, poetry, and personal story
          </p>
        </div>

        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="about" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              About Founder
            </TabsTrigger>
            <TabsTrigger value="compositions" className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              Original Compositions
            </TabsTrigger>
            <TabsTrigger value="poetry" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Penned Down
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-8">
            <Card className="bg-gradient-to-r from-primary/5 to-blue-600/5 border-primary/20">
              <CardHeader className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-primary/20">
                  <img 
                    src="/lovable-uploads/60f33ce6-efaa-4f60-a11c-09517021a6ff.png" 
                    alt="Dileep Yadav - Founder" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=400";
                    }}
                  />
                </div>
                <CardTitle className="text-3xl">Dileep Yadav</CardTitle>
                <CardDescription className="text-lg">Founder & Creative Director</CardDescription>
                <Badge className="bg-primary/10 text-primary">Passionate Creative Techy</Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-lg leading-relaxed">
                    A passionate, self-taught professional combining technology, creativity, and 
                    community upliftment. I believe in making knowledge accessible and building 
                    bridges between tech and people—one tool, one story at a time.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-lg border-l-4 border-primary">
                  <blockquote className="text-lg italic text-center">
                    "My aim is to build bridges between tech and people — one tab, one tool, 
                    one song at a time."
                  </blockquote>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">💡 Expertise & Passion</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Self-Taught Tech Professional</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Music Composer</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Content Creator</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Creative Innovator</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">🎯 Core Values</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-primary">Accessibility</h4>
                        <p className="text-sm text-muted-foreground">Making knowledge more accessible to everyone</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-600">Engagement</h4>
                        <p className="text-sm text-muted-foreground">Creating engaging learning experiences</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-600">Creativity</h4>
                        <p className="text-sm text-muted-foreground">Bringing visibility to creative expressions</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-600">Connection</h4>
                        <p className="text-sm text-muted-foreground">Building bridges between technology and people</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compositions" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🎼 YouTube Compositions</h2>
              <p className="text-lg text-muted-foreground">
                Original musical compositions and covers
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {compositions.map((composition, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="h-5 w-5 text-primary" />
                      {composition.title}
                    </CardTitle>
                    <CardDescription>{composition.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        src={composition.embedUrl}
                        title={composition.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <a 
                          href={composition.embedUrl.replace('/embed/', '/watch?v=')} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Watch on YouTube
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="poetry" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">✍️ Penned Down</h2>
              <p className="text-lg text-muted-foreground">
                Poetry and Shayari - thoughts penned from the heart
              </p>
            </div>

            <Card className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 border-purple-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">🔄 Coming Soon</CardTitle>
                <CardDescription>
                  Poetry and Shayari section is currently being developed. 
                  This will feature dynamic content from Google Docs.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-r from-purple-100/50 to-pink-100/50 rounded-lg dark:from-purple-900/20 dark:to-pink-900/20">
                    <h3 className="font-semibold mb-2">What to Expect:</h3>
                    <ul className="text-left space-y-2 max-w-md mx-auto">
                      <li>• Original Hindi and English poetry</li>
                      <li>• Heartfelt Shayari collections</li>
                      <li>• Themed verses on love, life, and philosophy</li>
                      <li>• Regular updates with new compositions</li>
                    </ul>
                  </div>
                  <Badge variant="secondary">Status: In Development</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PortfolioPage;
