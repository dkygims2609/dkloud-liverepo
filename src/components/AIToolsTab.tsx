
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, ExternalLink, Star, Search, Filter, ChevronLeft, ChevronRight, DollarSign, Tag } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface AITool {
  Toolname: string;
  Category: string;
  Purpose: string;
  Pricingmodel: string;
  'EstimatedCost (per month)': string;
  'Tools Link': string;
  [key: string]: any;
}

const AIToolsTab = () => {
  const [tools, setTools] = useState<AITool[]>([]);
  const [filteredTools, setFilteredTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerView = 6; // 2 rows x 3 columns

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://script.google.com/macros/s/AKfycbyQZiNTLogFsjujIKxhFs2pXoK_iaoLkFb4D3HJ_wQjQpD17RxsqHX0G1nuKbQN2x9u/exec');
      const data = await response.json();
      console.log('AI tools data:', data);
      
      if (Array.isArray(data) && data.length > 0) {
        setTools(data);
        setFilteredTools(data);
      } else {
        console.error('Invalid AI tools data format:', data);
        setTools([]);
        setFilteredTools([]);
      }
    } catch (error) {
      console.error('Error fetching AI tools:', error);
      toast({
        title: "Error",
        description: "Failed to fetch AI tools data",
        variant: "destructive",
      });
      setTools([]);
      setFilteredTools([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = tools.filter(tool => {
      const toolname = tool.Toolname || '';
      const purpose = tool.Purpose || '';
      const category = tool.Category || '';

      const matchesSearch = 
        toolname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || category.toLowerCase().includes(categoryFilter.toLowerCase());
      
      return matchesSearch && matchesCategory;
    });

    setFilteredTools(filtered);
    setCurrentIndex(0);
  }, [tools, searchTerm, categoryFilter]);

  const uniqueCategories = [...new Set(tools.map(tool => tool.Category).filter(Boolean))];

  const nextSlide = () => {
    if (currentIndex + itemsPerView < filteredTools.length) {
      setCurrentIndex(currentIndex + itemsPerView);
    }
  };

  const prevSlide = () => {
    if (currentIndex - itemsPerView >= 0) {
      setCurrentIndex(currentIndex - itemsPerView);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const visibleTools = filteredTools.slice(currentIndex, currentIndex + itemsPerView);
  const canGoNext = currentIndex + itemsPerView < filteredTools.length;
  const canGoPrev = currentIndex > 0;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI Tools Collection
        </h2>
        <p className="text-lg text-muted-foreground">
          Discover powerful AI tools to enhance your productivity
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
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
              placeholder="Search AI tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Brain className="h-4 w-4 text-blue-600" />
              <span>Showing {Math.min(itemsPerView, filteredTools.length - currentIndex)} of {filteredTools.length} tools</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Slider Controls */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Featured AI Tools</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={prevSlide} 
            disabled={!canGoPrev}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={nextSlide} 
            disabled={!canGoNext}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tools Grid - 2 rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleTools.map((tool, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-background to-blue-50/20 dark:to-blue-900/10 border-blue-200/50 dark:border-blue-800/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg mb-2 flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                <span className="line-clamp-1">{tool.Toolname || 'AI Tool'}</span>
              </CardTitle>
              <div className="flex flex-wrap gap-2 mb-2">
                {tool.Category && (
                  <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    <Tag className="h-3 w-3 mr-1" />
                    {tool.Category}
                  </Badge>
                )}
                {tool.Pricingmodel && (
                  <Badge variant="outline" className="text-green-600 dark:text-green-400 border-green-300 dark:border-green-700">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {tool.Pricingmodel}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {tool.Purpose && (
                <CardDescription className="mb-4 line-clamp-3">
                  <strong>Purpose:</strong> {tool.Purpose}
                </CardDescription>
              )}
              
              {tool['EstimatedCost (per month)'] && (
                <div className="mb-4 text-sm text-muted-foreground">
                  <strong>Monthly Cost:</strong> {tool['EstimatedCost (per month)']}
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

      {filteredTools.length === 0 && !loading && (
        <div className="text-center py-12">
          <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-muted-foreground">No AI tools found matching your criteria.</p>
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

      {/* Pagination Info */}
      <div className="text-center text-sm text-muted-foreground">
        Showing {currentIndex + 1}-{Math.min(currentIndex + itemsPerView, filteredTools.length)} of {filteredTools.length} tools
      </div>
    </div>
  );
};

export default AIToolsTab;
