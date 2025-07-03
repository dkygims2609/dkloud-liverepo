
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Music, Heart, User, Briefcase, Award } from 'lucide-react';

interface PortfolioPageProps {
  onBack: () => void;
}

interface Shayari {
  id: string;
  title: string;
  content: string;
  category: string;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ onBack }) => {
  const [shayariData, setShayariData] = useState<Shayari[]>([]);
  const [loading, setLoading] = useState(true);

  const youtubeCompositions = [
    {
      title: 'Pahla Pyar',
      embedUrl: 'https://www.youtube.com/embed/XLgJ4EYof3M'
    },
    {
      title: 'Raghuwar Ram Aa Gaye',
      embedUrl: 'https://www.youtube.com/embed/153sNf2Z3Qc'
    },
    {
      title: 'Pyar Nahi Hai Khel Dear',
      embedUrl: 'https://www.youtube.com/embed/rgFtlUeXRqI'
    },
    {
      title: 'Koi Pukare Shankar',
      embedUrl: 'https://www.youtube.com/embed/5jXH_7V3IUU'
    },
    {
      title: 'Jaatikaar',
      embedUrl: 'https://www.youtube.com/embed/NEjGJ8A2wMI'
    }
  ];

  useEffect(() => {
    fetchShayari();
  }, []);

  const fetchShayari = async () => {
    try {
      // In a real implementation, this would fetch from SheetBest API
      // For now, we'll use sample data
      setShayariData([
        {
          id: '1',
          title: 'Dil Ki Baat',
          content: `जो कहा था कभी तूने मुझसे\nवो बात अभी भी याद है\nतेरी आँखों में छुपी वो खुशी\nमेरे दिल में आज भी बसी है\n\nवक्त के साथ सब कुछ बदल गया\nपर तेरी यादें वही हैं\nजिंदगी के इस सफर में\nसिर्फ तेरे ख्वाब साथ हैं`,
          category: 'Love'
        },
        {
          id: '2',
          title: 'Zindagi Ka Safar',
          content: `जिंदगी का यह सफर कितना अजीब है\nकभी खुशी, कभी गम का मेला है\nहर मोड़ पर एक नई कहानी\nहर कदम पर नया किस्सा है\n\nसपने देखे थे जो कभी\nआज वो हकीकत बन गए\nजो खो गया था रास्ते में\nवो आज मिल गया है`,
          category: 'Life'
        },
        {
          id: '3',
          title: 'Maa Ka Pyar',
          content: `माँ का प्यार कितना अनमोल है\nजो मिलता है बिना माँगे\nहर दुख में वो साथ खड़ी रहती\nबिना किसी शर्त के\n\nउसकी आँखों में छुपी दुआएं\nहमेशा हमारे साथ रहती हैं\nमाँ के प्यार की छाया में\nहम सुरक्षित महसूस करते हैं`,
          category: 'Family'
        }
      ]);
    } catch (error) {
      console.error('Error fetching shayari:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-xl font-bold">My Portfolio</h1>
          <div></div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* About Section */}
        <section className="text-center space-y-6">
          <div className="w-32 h-32 rounded-full overflow-hidden mx-auto ring-4 ring-primary/20">
            <img 
              src="/dkphoto.jpeg" 
              alt="Dileep Yadav" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=400";
              }}
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">Dileep Yadav</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A passionate, self-taught professional combining technology, creativity, and community upliftment. 
              I believe in making knowledge accessible and building bridges between tech and people—one tool, 
              one story at a time.
            </p>
          </div>
          <div className="flex justify-center flex-wrap gap-4">
            <Badge variant="secondary" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Founder & Creator
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Tech Enthusiast
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Content Creator
            </Badge>
          </div>
        </section>

        {/* YouTube Compositions Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <Music className="h-8 w-8 text-primary" />
              🎼 YouTube Compositions
            </h2>
            <p className="text-muted-foreground">Original music compositions and covers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {youtubeCompositions.map((composition, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{composition.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={composition.embedUrl}
                      title={composition.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Shayari & Poetry Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <Heart className="h-8 w-8 text-red-500" />
              ✍️ Shayari & Poetry
            </h2>
            <p className="text-muted-foreground">Heartfelt verses and poetic expressions</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {shayariData.map((shayari) => (
                <Card key={shayari.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold">
                        {shayari.title}
                      </CardTitle>
                      <Badge variant="outline">{shayari.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-line text-muted-foreground leading-relaxed font-medium italic">
                        {shayari.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Skills & Expertise Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Skills & Expertise</h2>
            <p className="text-muted-foreground">Areas of specialization and interest</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Briefcase className="h-6 w-6 text-primary" />
                  Technology
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline">Cloud Computing</Badge>
                  <Badge variant="outline">DevOps</Badge>
                  <Badge variant="outline">Automation</Badge>
                  <Badge variant="outline">AI/ML</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Music className="h-6 w-6 text-primary" />
                  Creative Arts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline">Music Composition</Badge>
                  <Badge variant="outline">Poetry Writing</Badge>
                  <Badge variant="outline">Content Creation</Badge>
                  <Badge variant="outline">Storytelling</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Heart className="h-6 w-6 text-primary" />
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline">Knowledge Sharing</Badge>
                  <Badge variant="outline">Mentoring</Badge>
                  <Badge variant="outline">Community Building</Badge>
                  <Badge variant="outline">Social Impact</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PortfolioPage;
