
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wrench, ExternalLink, FileText, Download } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface TechResource {
  Title: string;
  Category: string;
  Type: string;
  Link: string;
  Description?: string;
}

const TechCornerTab = () => {
  const [resources, setResources] = useState<TechResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbw6hSBYLo33ze3aqiTzBszbfiTFVh2nHsrsop58d0DFWGOOwaOZIepb6kUjmqKwKcVr/exec');
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error('Error fetching tech resources:', error);
      toast({
        title: "Error",
        description: "Failed to fetch tech resources data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.Title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.Description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || resource.Category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = [...new Set(resources.map(resource => resource.Category).filter(Boolean))];

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
          placeholder="Search tech resources..."
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
        {filteredResources.map((resource, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg mb-2 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                {resource.Title}
              </CardTitle>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="secondary">{resource.Category}</Badge>
                {resource.Type && (
                  <Badge variant="outline">{resource.Type}</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {resource.Description && (
                <CardDescription className="mb-4">
                  {resource.Description}
                </CardDescription>
              )}
              {resource.Link && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  asChild
                >
                  <a 
                    href={resource.Link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    {resource.Type === 'PDF' || resource.Type === 'DOCX' ? (
                      <Download className="h-4 w-4" />
                    ) : (
                      <ExternalLink className="h-4 w-4" />
                    )}
                    {resource.Type === 'PDF' || resource.Type === 'DOCX' ? 'Download' : 'View Resource'}
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-20">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No tech resources found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default TechCornerTab;
