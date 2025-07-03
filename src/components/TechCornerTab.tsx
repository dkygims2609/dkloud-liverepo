
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Search, Filter, Code, Database, Cloud, Smartphone, Globe, Cpu, Shield, Zap, FileText, User } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface TechItem {
  id: string;
  title: string;
  description: string;
  cheatsheetlink: string;
  author: string;
}

const TechCornerTab = () => {
  const [techItems, setTechItems] = useState<TechItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'https://script.google.com/macros/s/AKfycbw6hSBYLo33ze3aqiTzBszbfiTFVh2nHsrsop58d0DFWGOOwaOZIepb6kUjmqKwKcVr/exec';

  useEffect(() => {
    fetchTechItems();
  }, []);

  const fetchTechItems = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching from API:', API_URL);
      
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (data && Array.isArray(data)) {
        const formattedItems = data.map((item: any, index: number) => ({
          id: `tech-${index}`,
          title: item.Title || item.title || 'No Title',
          description: item.Description || item.description || 'No description available',
          cheatsheetlink: item.Cheatsheetlink || item.cheatsheetlink || item.link || '#',
          author: item.Author || item.author || 'Unknown Author'
        }));
        
        console.log('Formatted Items:', formattedItems);
        setTechItems(formattedItems);
      } else {
        throw new Error('Invalid data format received from API');
      }
    } catch (error) {
      console.error('Error fetching tech items:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = techItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading tech resources...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
            <ExternalLink className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Unable to Load Resources</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
            <Button onClick={fetchTechItems} variant="outline" size="sm">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Code className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tech Corner
          </h2>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Explore curated cheat sheets, tutorials, and technical resources for developers and tech enthusiasts. 
          From coding guides to cloud computing insights, discover knowledge that accelerates your tech journey.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            {techItems.length} Resources
          </span>
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
            Expert Authors
          </span>
          <span className="flex items-center gap-1">
            <ExternalLink className="h-4 w-4" />
            Direct Links
          </span>
        </div>
      </div>

      {/* Enhanced Search */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search cheat sheets, tutorials, and tech resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 py-3 text-base bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {searchTerm ? `Found ${filteredItems.length} of ${techItems.length} resources` : `Showing ${techItems.length} resources`}
        </div>
        {searchTerm && (
          <Button 
            onClick={() => setSearchTerm('')} 
            variant="outline" 
            size="sm"
            className="text-xs"
          >
            Clear Search
          </Button>
        )}
      </div>

      {/* Enhanced Tech Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500 hover:border-l-purple-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:scale-[1.02]">
            <CardHeader className="space-y-3 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700">
                    Cheat Sheet
                  </Badge>
                </div>
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" title="Available"></div>
              </div>
              
              <CardTitle className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                {item.title}
              </CardTitle>
              
              {item.author && (
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <User className="h-3 w-3" />
                  <span>by {item.author}</span>
                </div>
              )}
            </CardHeader>
            
            <CardContent className="space-y-4 pt-0">
              <CardDescription className="text-sm line-clamp-3 leading-relaxed text-gray-600 dark:text-gray-300">
                {item.description}
              </CardDescription>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Documentation</span>
                </div>
                
                <Button
                  variant="default"
                  size="sm"
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <a
                    href={item.cheatsheetlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <span>View Resource</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results State */}
      {filteredItems.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="h-20 w-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
            No resources found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">
            {searchTerm 
              ? `No resources match "${searchTerm}". Try different keywords or browse all resources.`
              : "No resources are currently available. Please check back later."
            }
          </p>
          {searchTerm && (
            <Button onClick={() => setSearchTerm('')} variant="outline">
              View All Resources
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TechCornerTab;
