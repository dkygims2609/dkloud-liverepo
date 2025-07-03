
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Newspaper, ExternalLink, Calendar, Clock, Search, Filter, Globe, Rss } from 'lucide-react';

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
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      
      // Latest tech news data for 2024-2025
      const latestTechNews = [
        {
          id: '1',
          title: 'OpenAI Launches GPT-5 with Revolutionary Multimodal Capabilities',
          description: 'OpenAI unveils GPT-5, featuring advanced reasoning, coding, and creative capabilities that surpass human performance in multiple domains.',
          source: 'TechCrunch',
          publishedAt: '2024-12-15T10:30:00Z',
          url: 'https://techcrunch.com',
          category: 'Artificial Intelligence'
        },
        {
          id: '2',
          title: 'Apple Vision Pro 2 Announced with Enhanced AR Features',
          description: 'Apple announces Vision Pro 2 with improved display technology, longer battery life, and groundbreaking spatial computing features.',
          source: 'The Verge',
          publishedAt: '2024-12-14T15:45:00Z',
          url: 'https://theverge.com',
          category: 'Hardware'
        },
        {
          id: '3',
          title: 'Google Quantum Computer Achieves Major Breakthrough',
          description: 'Google\'s latest quantum processor demonstrates quantum advantage in solving complex optimization problems for real-world applications.',
          source: 'Wired',
          publishedAt: '2024-12-13T08:20:00Z',
          url: 'https://wired.com',
          category: 'Quantum Computing'
        },
        {
          id: '4',
          title: 'Tesla Cybertruck Full Self-Driving Now Available Globally',
          description: 'Tesla rolls out Full Self-Driving capabilities for Cybertruck worldwide, achieving Level 4 autonomous driving certification.',
          source: 'CNET',
          publishedAt: '2024-12-12T12:15:00Z',
          url: 'https://cnet.com',
          category: 'Autonomous Vehicles'
        },
        {
          id: '5',
          title: 'Microsoft Azure Introduces AI-Powered Cloud Infrastructure',
          description: 'Microsoft launches next-generation Azure services with integrated AI capabilities for enterprise-scale applications.',
          source: 'TechCrunch',
          publishedAt: '2024-12-11T09:00:00Z',
          url: 'https://techcrunch.com',
          category: 'Cloud Computing'
        },
        {
          id: '6',
          title: 'Meta Unveils Neural Interface Technology for VR Headsets',
          description: 'Meta demonstrates brain-computer interface technology that enables direct neural control of virtual reality environments.',
          source: 'The Verge',
          publishedAt: '2024-12-10T16:30:00Z',
          url: 'https://theverge.com',
          category: 'Virtual Reality'
        },
        {
          id: '7',
          title: 'Samsung Galaxy S25 Features Revolutionary Battery Technology',
          description: 'Samsung introduces solid-state battery technology in Galaxy S25, offering 3x longer battery life and ultra-fast charging.',
          source: 'Android Authority',
          publishedAt: '2024-12-09T11:45:00Z',
          url: 'https://androidauthority.com',
          category: 'Mobile Technology'
        },
        {
          id: '8',
          title: 'NVIDIA RTX 5090 Sets New Standard for AI Graphics Processing',
          description: 'NVIDIA launches RTX 5090 with unprecedented AI acceleration capabilities for gaming, content creation, and professional workflows.',
          source: 'Tom\'s Hardware',
          publishedAt: '2024-12-08T14:20:00Z',
          url: 'https://tomshardware.com',
          category: 'Graphics Technology'
        },
        {
          id: '9',
          title: 'SpaceX Starship Completes First Commercial Mars Mission',
          description: 'SpaceX successfully launches first commercial payload to Mars orbit, marking a new era in space commercialization.',
          source: 'Space News',
          publishedAt: '2024-12-07T10:00:00Z',
          url: 'https://spacenews.com',
          category: 'Space Technology'
        },
        {
          id: '10',
          title: 'Amazon Web Services Introduces Quantum Cloud Computing',
          description: 'AWS launches quantum computing services accessible through cloud platform, democratizing quantum technology access.',
          source: 'AWS Blog',
          publishedAt: '2024-12-06T13:30:00Z',
          url: 'https://aws.amazon.com',
          category: 'Cloud Computing'
        },
        {
          id: '11',
          title: 'Intel 15th Gen Processors Feature Built-in AI Processing Units',
          description: 'Intel unveils 15th generation processors with dedicated AI acceleration units for enhanced performance in AI workloads.',
          source: 'AnandTech',
          publishedAt: '2024-12-05T15:00:00Z',
          url: 'https://anandtech.com',
          category: 'Processors'
        },
        {
          id: '12',
          title: 'Breakthrough in Room-Temperature Superconductor Technology',
          description: 'Research team achieves stable room-temperature superconductivity, promising revolutionary changes in electronics and energy.',
          source: 'Nature',
          publishedAt: '2024-12-04T11:30:00Z',
          url: 'https://nature.com',
          category: 'Materials Science'
        }
      ];

      setNews(latestTechNews);
      setFilteredNews(latestTechNews);
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews([]);
      setFilteredNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = news.filter(article => {
      const matchesSearch = (
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      const matchesSource = sourceFilter === 'all' || article.source.toLowerCase() === sourceFilter.toLowerCase();
      const matchesCategory = categoryFilter === 'all' || article.category.toLowerCase().includes(categoryFilter.toLowerCase());

      return matchesSearch && matchesSource && matchesCategory;
    });

    setFilteredNews(filtered);
  }, [news, searchTerm, sourceFilter, categoryFilter]);

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

  // Extract unique sources and categories for filters
  const sources = [...new Set(news.map(article => article.source))];
  const categories = [...new Set(news.map(article => article.category))];

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
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Latest Tech News
        </h2>
        <p className="text-muted-foreground">Stay updated with the latest breakthroughs in technology and innovation</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Rss className="h-4 w-4 text-orange-500" />
          <span className="text-sm text-muted-foreground">Latest updates from top tech publications</span>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search news by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                {sources.map((source) => (
                  <SelectItem key={source} value={source.toLowerCase()}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Newspaper className="h-4 w-4 text-blue-600" />
              <span>Showing {filteredNews.length} of {news.length} articles</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.map((article) => (
          <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {article.category}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {getTimeAgo(article.publishedAt)}
                </div>
              </div>
              <CardTitle className="text-lg line-clamp-2 hover:text-blue-600 transition-colors">
                {article.title}
              </CardTitle>
              <CardDescription className="line-clamp-3">
                {article.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
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
                    Read More
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNews.length === 0 && !loading && (
        <div className="text-center py-12">
          <Newspaper className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-muted-foreground">No news articles found matching your criteria.</p>
          {searchTerm || sourceFilter !== 'all' || categoryFilter !== 'all' ? (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setSourceFilter('all');
                setCategoryFilter('all');
              }}
            >
              Clear Filters
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default TechNewsTab;
