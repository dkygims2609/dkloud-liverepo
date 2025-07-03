
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Search, Filter, Code, Database, Cloud, Smartphone, Globe, Cpu, Shield, Zap } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface TechItem {
  id: string;
  title: string;
  category: string;
  description: string;
  link: string;
  tags: string[];
  difficulty: string;
  type: string;
}

const TechCornerTab = () => {
  const [techItems, setTechItems] = useState<TechItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const API_URL = 'https://script.google.com/macros/s/AKfycbw6hSBYLo33ze3aqiTzBszbfiTFVh2nHsrsop58d0DFWGOOwaOZIepb6kUjmqKwKcVr/exec';

  useEffect(() => {
    fetchTechItems();
  }, []);

  const fetchTechItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      
      if (data && Array.isArray(data)) {
        const formattedItems = data.map((item: any, index: number) => ({
          id: `tech-${index}`,
          title: item.Title || item.title || 'No Title',
          category: item.Category || item.category || 'General',
          description: item.Description || item.description || 'No description available',
          link: item.Link || item.link || '#',
          tags: typeof item.Tags === 'string' ? item.Tags.split(',').map((tag: string) => tag.trim()) : (item.tags || []),
          difficulty: item.Difficulty || item.difficulty || 'Beginner',
          type: item.Type || item.type || 'Article'
        }));
        
        setTechItems(formattedItems);
      }
    } catch (error) {
      console.error('Error fetching tech items:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryIcons: { [key: string]: any } = {
    'Web Development': Code,
    'Mobile Development': Smartphone,
    'Cloud Computing': Cloud,
    'Database': Database,
    'DevOps': Cpu,
    'Security': Shield,
    'AI/ML': Zap,
    'General': Globe,
    'default': Code
  };

  const categories = ['All', ...Array.from(new Set(techItems.map(item => item.category)))];
  const difficulties = ['All', ...Array.from(new Set(techItems.map(item => item.difficulty)))];

  const filteredItems = techItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || item.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Tech Corner
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore the latest in technology with curated resources, tutorials, and insights for developers and tech enthusiasts.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search tech resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Showing {filteredItems.length} of {techItems.length} resources
      </div>

      {/* Tech Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const IconComponent = categoryIcons[item.category] || categoryIcons.default;
          
          return (
            <Card key={item.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500 group">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-purple-600" />
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <Badge className={`text-xs ${getDifficultyColor(item.difficulty)}`}>
                    {item.difficulty}
                  </Badge>
                </div>
                
                <CardTitle className="text-lg font-semibold group-hover:text-purple-600 transition-colors line-clamp-2">
                  {item.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-sm line-clamp-3">
                  {item.description}
                </CardDescription>
                
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{item.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2">
                  <Badge variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="hover:bg-purple-50 hover:border-purple-300 transition-colors"
                  >
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      Explore
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredItems.length === 0 && !loading && (
        <div className="text-center py-12">
          <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
            No resources found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default TechCornerTab;
