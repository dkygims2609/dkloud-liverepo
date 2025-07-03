
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Youtube, ExternalLink, Users } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface YouTubeChannel {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string;
  subscribers: string;
  url: string;
}

const YouTubeChannelsTab = () => {
  const [channels, setChannels] = useState<YouTubeChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    try {
      const response = await fetch('https://api.sheetbest.com/sheets/c66a0da1-d347-44f8-adc7-dc02c8627799');
      const data = await response.json();
      setChannels(data);
    } catch (error) {
      console.error('Error fetching YouTube channels:', error);
      toast({
        title: "Error",
        description: "Failed to fetch YouTube channels data",
        variant: "destructive",
      });
      // Fallback data
      setChannels([
        {
          id: '1',
          name: 'TechCrunch',
          category: 'Technology',
          description: 'Latest technology news, reviews, and startup coverage.',
          logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=100&h=100',
          subscribers: '2.5M',
          url: 'https://youtube.com/@TechCrunch'
        },
        {
          id: '2',
          name: 'Marques Brownlee',
          category: 'Tech Reviews',
          description: 'Crisp tech reviews and insights on the latest gadgets.',
          logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=100&h=100',
          subscribers: '17.8M',
          url: 'https://youtube.com/@mkbhd'
        },
        {
          id: '3',
          name: 'Kurzgesagt',
          category: 'Science',
          description: 'Animated science and philosophy videos that make complex topics accessible.',
          logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100',
          subscribers: '20.1M',
          url: 'https://youtube.com/@kurzgesagt'
        },
        {
          id: '4',
          name: 'Fireship',
          category: 'Programming',
          description: 'High-intensity coding tutorials and developer news in under 10 minutes.',
          logo: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=100&h=100',
          subscribers: '2.8M',
          url: 'https://youtube.com/@Fireship'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         channel.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || channel.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = [...new Set(channels.map(channel => channel.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Search YouTube channels..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {uniqueCategories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChannels.map((channel) => (
          <Card key={channel.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <img 
                    src={channel.logo} 
                    alt={`${channel.name} logo`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=100&h=100";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1 flex items-center gap-2">
                    <Youtube className="h-5 w-5 text-red-500" />
                    {channel.name}
                  </CardTitle>
                  {channel.subscribers && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                      <Users className="h-4 w-4" />
                      {channel.subscribers} subscribers
                    </div>
                  )}
                  <Badge variant="secondary" className="text-xs">
                    {channel.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {channel.description}
              </CardDescription>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                asChild
              >
                <a 
                  href={channel.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit Channel
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredChannels.length === 0 && (
        <div className="text-center py-20">
          <Youtube className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No YouTube channels found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default YouTubeChannelsTab;
