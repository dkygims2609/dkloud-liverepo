
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wrench, ExternalLink, FileText, Download, Search, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface TechResource {
  Title: string;
  Description: string;
  Cheatsheetlink: string;
  Author?: string;
  Tags?: string;
  Category?: string;
  Type?: string;
}

const TechCornerTab = () => {
  const [resources, setResources] = useState<TechResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<TechResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerView = 6; // 2 rows x 3 columns

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://script.google.com/macros/s/AKfycbw6hSBYLo33ze3aqiTzBszbfiTFVh2nHsrsop58d0DFWGOOwaOZIepb6kUjmqKwKcVr/exec');
      const data = await response.json();
      console.log('Tech resources data:', data);
      
      if (Array.isArray(data)) {
        setResources(data);
        setFilteredResources(data);
      } else {
        console.error('Invalid tech resources data format:', data);
        setResources([]);
        setFilteredResources([]);
      }
    } catch (error) {
      console.error('Error fetching tech resources:', error);
      toast({
        title: "Error",
        description: "Failed to fetch tech resources data",
        variant: "destructive",
      });
      setResources([]);
      setFilteredResources([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = resources.filter(resource => {
      const matchesSearch = resource.Title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           resource.Description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.Tags?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || resource.Category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });

    setFilteredResources(filtered);
    setCurrentIndex(0); // Reset to first page when filters change
  }, [resources, searchTerm, categoryFilter]);

  const uniqueCategories = [...new Set(resources.map(resource => resource.Category).filter(Boolean))];

  // Manual slider controls
  const nextSlide = () => {
    if (currentIndex + itemsPerView < filteredResources.length) {
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

  const visibleResources = filteredResources.slice(currentIndex, currentIndex + itemsPerView);
  const canGoNext = currentIndex + itemsPerView < filteredResources.length;
  const canGoPrev = currentIndex > 0;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          🔧 Tech Corner
        </h2>
        <p className="text-lg text-muted-foreground">
          Technical resources and documentation
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-indigo-600" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tech resources..."
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
              <FileText className="h-4 w-4 text-indigo-600" />
              <span>Showing {Math.min(itemsPerView, filteredResources.length - currentIndex)} of {filteredResources.length} resources</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Slider Controls */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">🔧 Featured Resources</h3>
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

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleResources.map((resource, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-background to-indigo-50/20 dark:to-indigo-900/10 border-indigo-200/50 dark:border-indigo-800/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg mb-2 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-indigo-600" />
                <span className="line-clamp-1">{resource.Title}</span>
              </CardTitle>
              <div className="flex flex-wrap gap-2 mb-2">
                {resource.Category && (
                  <Badge variant="secondary" className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                    {resource.Category}
                  </Badge>
                )}
                {resource.Type && (
                  <Badge variant="outline" className="border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300">
                    {resource.Type}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {resource.Description && (
                <CardDescription className="mb-4 line-clamp-3">
                  {resource.Description}
                </CardDescription>
              )}
              
              {resource.Author && (
                <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  By {resource.Author}
                </div>
              )}
              
              {resource.Tags && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {resource.Tags.split(',').slice(0, 3).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {resource.Cheatsheetlink && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 hover:from-indigo-700 hover:to-purple-700"
                  asChild
                >
                  <a 
                    href={resource.Cheatsheetlink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    {resource.Cheatsheetlink.includes('docs.google.com') ? (
                      <Download className="h-4 w-4" />
                    ) : (
                      <ExternalLink className="h-4 w-4" />
                    )}
                    {resource.Cheatsheetlink.includes('docs.google.com') ? 'Download Document' : 'View Resource'}
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && !loading && (
        <div className="text-center py-20">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No tech resources found matching your criteria.</p>
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
        Showing {currentIndex + 1}-{Math.min(currentIndex + itemsPerView, filteredResources.length)} of {filteredResources.length} resources
      </div>
    </div>
  );
};

export default TechCornerTab;
