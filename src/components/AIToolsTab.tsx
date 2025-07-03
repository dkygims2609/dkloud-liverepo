import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, ExternalLink, Star, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface AITool {
  Name: string;
  Description: string;
  Category: string;
  'Tools Link': string;
  Rating?: string;
  Tags?: string;
}

const AIToolsTab = () => {
  const [tools, setTools] = useState<AITool[]>([]);
  const [filteredTools, setFilteredTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerView = 3;

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzrOGVhNGJwqnIgSDzEV_3kJMT9sK8X6lGlAhFOTFNJMo_4qQAT3_3e7kMjPLc9-1vg/exec');
      const data = await response.json();
      console.log('AI tools data:', data);
      setTools(data);
      setFilteredTools(data);
    } catch (error) {
      console.error('Error fetching AI tools:', error);
      toast({
        title: "Error",
        description: "Failed to fetch AI tools data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Auto-slide functionality
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView) % Math.max(itemsPerView, filteredTools.length));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - itemsPerView + filteredTools.length) % Math.max(itemsPerView, filteredTools.length));
  };

  // Auto-slide timer
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [filteredTools]);

  const filtered = tools.filter(tool => {
    const matchesSearch = tool.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.Description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.Tags?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || tool.Category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    setFilteredTools(filtered);
  }, [tools, searchTerm, categoryFilter]);

  const uniqueCategories = [...new Set(tools.map(tool => tool.Category).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const visibleTools = filteredTools.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🤖 AI Tools Collection
        </h2>
        <p className="text-lg text-muted-foreground">
          Discover powerful AI tools to enhance your productivity
        </p>
      </div>

      {/* Slider Controls */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Featured AI Tools</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={prevSlide} className="h-8 w-8 p-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextSlide} className="h-8 w-8 p-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tools Slider */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleTools.map((tool, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-background to-blue-50/20 dark:to-blue-900/10 border-blue-200/50 dark:border-blue-800/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg mb-2 flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                <span className="line-clamp-1">{tool.Name}</span>
              </CardTitle>
              <div className="flex flex-wrap gap-2 mb-2">
                {tool.Category && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {tool.Category}
                  </Badge>
                )}
                {tool.Rating && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-xs font-medium">{tool.Rating}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {tool.Description && (
                <CardDescription className="mb-4 line-clamp-3">
                  {tool.Description}
                </CardDescription>
              )}
              
              {tool.Tags && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {tool.Tags.split(',').slice(0, 3).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs border-purple-300 text-purple-700 dark:border-purple-700 dark:text-purple-300">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {tool['Tools Link'] && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700"
                  asChild
                >
                  <a 
                    href={tool['Tools Link']} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Try Tool
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search AI tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
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
    </div>
  );
};

export default AIToolsTab;
