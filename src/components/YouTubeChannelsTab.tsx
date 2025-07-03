
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Youtube, ExternalLink, Users, Search, Filter, Play } from 'lucide-react';

const YouTubeChannelsTab = () => {
  const [channels, setChannels] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.sheetbest.com/sheets/65f34b49-7b92-4a44-be4c-ba8d1bca6a48');
      const data = await response.json();
      console.log('YouTube channels data:', data);
      
      if (Array.isArray(data)) {
        setChannels(data);
        setFilteredChannels(data);
      } else {
        console.error('Invalid data format:', data);
        setChannels([]);
        setFilteredChannels([]);
      }
    } catch (error) {
      console.error('Error fetching YouTube channels:', error);
      setChannels([]);
      setFilteredChannels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = channels.filter(channel => {
      const name = channel.Name || channel.name || '';
      const category = channel.Category || channel.category || '';
      const description = channel.Description || channel.description || '';

      const matchesSearch = (
        (typeof name === 'string' && name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (typeof description === 'string' && description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      
      const matchesCategory = categoryFilter === 'all' || 
        (typeof category === 'string' && category.toLowerCase().includes(categoryFilter.toLowerCase()));

      return matchesSearch && matchesCategory;
    });

    setFilteredChannels(filtered);
  }, [channels, searchTerm, categoryFilter]);

  // Extract unique categories for filter
  const categories = [...new Set(channels.map(channel => channel.Category || channel.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
          YouTube Channel Picks
        </h2>
        <p className="text-muted-foreground">Curated collection of educational and entertaining YouTube channels</p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-red-600" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search channels by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Youtube className="h-4 w-4 text-red-600" />
              <span>Showing {filteredChannels.length} of {channels.length} channels</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChannels.map((channel, index) => (
          <Card key={index} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Youtube className="h-5 w-5 text-red-600" />
                  <Badge variant="secondary" className="bg-red-100 text-red-700">
                    {channel.Category || channel.category || 'General'}
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-lg text-gray-900">
                {channel.Name || channel.name || 'Untitled Channel'}
              </CardTitle>
              <CardDescription className="line-clamp-3">
                {channel.Description || channel.description || 'No description available'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {channel['YouTube Link'] && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-red-200 text-red-700 hover:bg-red-50"
                  asChild
                >
                  <a href={channel['YouTube Link']} target="_blank" rel="noopener noreferrer">
                    <Play className="h-4 w-4 mr-2" />
                    Visit Channel
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredChannels.length === 0 && !loading && (
        <div className="text-center py-12">
          <Youtube className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-muted-foreground">No YouTube channels found matching your criteria.</p>
          {searchTerm || categoryFilter !== 'all' ? (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
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

export default YouTubeChannelsTab;
