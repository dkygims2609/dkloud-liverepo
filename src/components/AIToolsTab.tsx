
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Bot, ExternalLink, Sparkles } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  pricing: string;
}

const AIToolsTab = () => {
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxpIEMPY1Ji3tft5mYLNaObg9csvvzCdoWuAcOpz-KQlMWWmytkzShEgZBJNQ3r3yl7/exec');
      const data = await response.json();
      setTools(data);
    } catch (error) {
      console.error('Error fetching AI tools:', error);
      toast({
        title: "Error",
        description: "Failed to fetch AI tools data",
        variant: "destructive",
      });
      // Fallback data
      setTools([
        {
          id: '1',
          name: 'ChatGPT',
          description: 'Conversational AI assistant for various tasks including writing, coding, and analysis.',
          category: 'Conversational AI',
          url: 'https://chat.openai.com',
          pricing: 'Free/Premium'
        },
        {
          id: '2',
          name: 'Midjourney',
          description: 'AI-powered image generation tool for creating stunning artwork and designs.',
          category: 'Image Generation',
          url: 'https://midjourney.com',
          pricing: 'Subscription'
        },
        {
          id: '3',
          name: 'GitHub Copilot',
          description: 'AI pair programmer that helps you write code faster and with less work.',
          category: 'Code Assistant',
          url: 'https://github.com/features/copilot',
          pricing: 'Subscription'
        },
        {
          id: '4',
          name: 'Notion AI',
          description: 'Writing assistant integrated into Notion for brainstorming and content creation.',
          category: 'Writing Assistant',
          url: 'https://notion.so/ai',
          pricing: 'Free/Premium'
        },
        {
          id: '5',
          name: 'Runway ML',
          description: 'AI-powered video editing and generation tools for content creators.',
          category: 'Video Generation',
          url: 'https://runwayml.com',
          pricing: 'Free/Premium'
        },
        {
          id: '6',
          name: 'Jasper',
          description: 'AI content platform for teams to create brand-aligned content at scale.',
          category: 'Content Creation',
          url: 'https://jasper.ai',
          pricing: 'Subscription'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tool.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || tool.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = [...new Set(tools.map(tool => tool.category).filter(Boolean))];

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
          placeholder="Search AI tools..."
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
        {filteredTools.map((tool) => (
          <Card key={tool.id} className="hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <Sparkles className="h-4 w-4 text-yellow-500" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg mb-2 flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                {tool.name}
              </CardTitle>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="secondary">{tool.category}</Badge>
                {tool.pricing && (
                  <Badge variant="outline">{tool.pricing}</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {tool.description}
              </CardDescription>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                asChild
              >
                <a 
                  href={tool.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit Tool
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-20">
          <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No AI tools found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AIToolsTab;
