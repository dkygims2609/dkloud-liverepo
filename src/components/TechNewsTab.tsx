
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, ExternalLink, Calendar, Clock } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: string;
  publishedAt: string;
  url: string;
  category: string;
}

const TechNewsTab = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      // Note: In a real implementation, you would use a proper news API with CORS support
      // For now, we'll use fallback data
      setNews([
        {
          id: '1',
          title: 'AI Breakthrough: New Language Model Achieves Human-Level Performance',
          description: 'Researchers announce a significant breakthrough in artificial intelligence with a new language model that demonstrates human-level performance across multiple cognitive tasks.',
          source: 'TechCrunch',
          publishedAt: '2024-01-15T10:30:00Z',
          url: 'https://techcrunch.com',
          category: 'Artificial Intelligence'
        },
        {
          id: '2',
          title: 'Cloud Computing Revolution: AWS Announces Quantum Computing Service',
          description: 'Amazon Web Services unveils a new quantum computing service that promises to make quantum computing accessible to businesses worldwide.',
          source: 'AWS News',
          publishedAt: '2024-01-14T15:45:00Z',
          url: 'https://aws.amazon.com',
          category: 'Cloud Computing'
        },
        {
          id: '3',
          title: 'SpaceX Successfully Launches Advanced Satellite Constellation',
          description: 'SpaceX completes another successful mission, deploying advanced satellites that will improve global internet connectivity and space exploration capabilities.',
          source: 'Space News',
          publishedAt: '2024-01-14T08:20:00Z',
          url: 'https://spacenews.com',
          category: 'Space Technology'
        },
        {
          id: '4',
          title: 'Cybersecurity Alert: New Vulnerability Discovered in Popular Framework',
          description: 'Security researchers discover a critical vulnerability in a widely-used web framework, prompting immediate security updates across the industry.',
          source: 'Security Weekly',
          publishedAt: '2024-01-13T12:15:00Z',
          url: 'https://securityweekly.com',
          category: 'Cybersecurity'
        },
        {
          id: '5',
          title: 'Green Tech Innovation: Solar Panel Efficiency Reaches New Heights',
          description: 'Scientists develop revolutionary solar panel technology that achieves unprecedented efficiency rates, marking a major step forward in renewable energy.',
          source: 'Green Tech Media',
          publishedAt: '2024-01-13T09:00:00Z',
          url: 'https://greentechmedia.com',
          category: 'Green Technology'
        },
        {
          id: '6',
          title: 'DevOps Transformation: Kubernetes Adoption Surges in Enterprise',
          description: 'New survey reveals that Kubernetes adoption in enterprise environments has increased by 300% over the past year, reshaping DevOps practices.',
          source: 'DevOps Digest',
          publishedAt: '2024-01-12T16:30:00Z',
          url: 'https://devopsdigest.com',
          category: 'DevOps'
        },
        {
          id: '7',
          title: 'Blockchain Breakthrough: Ethereum 2.0 Upgrade Shows Promising Results',
          description: 'The Ethereum 2.0 upgrade demonstrates significant improvements in transaction speed and energy efficiency, potentially revolutionizing blockchain technology.',
          source: 'Blockchain News',
          publishedAt: '2024-01-12T11:45:00Z',
          url: 'https://blockchainnews.com',
          category: 'Blockchain'
        },
        {
          id: '8',
          title: 'AI in Healthcare: Machine Learning Model Predicts Disease Outbreaks',
          description: 'Healthcare researchers develop an AI system that can predict disease outbreaks with 95% accuracy, potentially saving millions of lives.',
          source: 'Healthcare IT News',
          publishedAt: '2024-01-11T14:20:00Z',
          url: 'https://healthcareitnews.com',
          category: 'Healthcare Tech'
        },
        {
          id: '9',
          title: 'Quantum Computing Milestone: IBM Achieves Quantum Supremacy',
          description: 'IBM announces a major breakthrough in quantum computing, achieving quantum supremacy with their latest quantum processor.',
          source: 'IBM Research',
          publishedAt: '2024-01-11T10:00:00Z',
          url: 'https://ibm.com',
          category: 'Quantum Computing'
        },
        {
          id: '10',
          title: 'Edge Computing Revolution: 5G Networks Enable Real-Time Processing',
          description: 'The rollout of 5G networks is enabling unprecedented edge computing capabilities, transforming how data is processed and analyzed in real-time.',
          source: '5G World',
          publishedAt: '2024-01-10T13:30:00Z',
          url: 'https://5gworld.com',
          category: 'Edge Computing'
        }
      ]);
    } catch (error) {
      console.error('Error fetching news:', error);
      toast({
        title: "Info",
        description: "Displaying sample tech news data",
        variant: "default",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Latest Tech News</h2>
        <p className="text-muted-foreground">Stay updated with the latest in technology, cloud, AI, and space</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((article) => (
          <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary">{article.category}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {getTimeAgo(article.publishedAt)}
                </div>
              </div>
              <CardTitle className="text-lg line-clamp-2">
                {article.title}
              </CardTitle>
              <CardDescription className="line-clamp-3">
                {article.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Newspaper className="h-4 w-4" />
                  <span>{article.source}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(article.publishedAt)}
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Read
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TechNewsTab;
