
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Youtube, ExternalLink, Users } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface YouTubeChannel {
  "Channel Name": string;
  Category: string;
  Description: string;
  "Channel URL": string;
  "Subscriber Count"?: string;
  Language?: string;
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
    } finally {
      setLoading(false);
    }
  };

  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel["Channel Name"]?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         channel.Description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || channel.Category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = [...new Set(channels.map(channel => channel.Category).filter(Boolean))];

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
        <h2 className="text-3xl font-bold mb-4">📺 YouTube Channel Picks</h2>
        <p className="text-lg text-muted-foreground">
          Curated collection of amazing YouTube channels
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Search channels..."
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
        {filteredChannels.map((channel, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg mb-2 flex items-center gap-2">
                <Youtube className="h-5 w-5 text-red-600" />
                {channel["Channel Name"]}
              </CardTitle>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="secondary">{channel.Category}</Badge>
                {channel.Language && (
                  <Badge variant="outline">{channel.Language}</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {channel.Description}
              </CardDescription>
              
              {channel["Subscriber Count"] && (
                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {channel["Subscriber Count"]} subscribers
                </div>
              )}
              
              {channel["Channel URL"] && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  asChild
                >
                  <a 
                    href={channel["Channel URL"]} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Visit Channel
                  </a>
                </Button>
              )}
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
