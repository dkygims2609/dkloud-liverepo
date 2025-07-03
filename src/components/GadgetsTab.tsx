
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, ExternalLink, Star, DollarSign } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface SmartGadget {
  Name: string;
  Category: string;
  Description: string;
  Price: string;
  Rating: string;
  "Where to Buy": string;
  Features: string;
  Image?: string;
}

const GadgetsTab = () => {
  const [gadgets, setGadgets] = useState<SmartGadget[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchGadgets();
  }, []);

  const fetchGadgets = async () => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwr6H1XNOUxlTTJJ6qE21hasJtAfTsl_ZJRYeurCGYNEpmwRVn-ZD4PECMAv4kzzw1T/exec');
      const data = await response.json();
      setGadgets(data);
    } catch (error) {
      console.error('Error fetching smart gadgets:', error);
      toast({
        title: "Error",
        description: "Failed to fetch smart gadgets data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredGadgets = gadgets.filter(gadget => {
    const matchesSearch = gadget.Name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         gadget.Description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || gadget.Category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = [...new Set(gadgets.map(gadget => gadget.Category).filter(Boolean))];

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
          placeholder="Search smart gadgets..."
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
        {filteredGadgets.map((gadget, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2 flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-primary" />
                    {gadget.Name}
                  </CardTitle>
                  <CardDescription>{gadget.Description}</CardDescription>
                </div>
                {gadget.Rating && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{gadget.Rating}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {gadget.Category && (
                  <Badge variant="secondary">{gadget.Category}</Badge>
                )}
                {gadget.Price && (
                  <Badge variant="outline">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {gadget.Price}
                  </Badge>
                )}
              </div>
              
              {gadget.Features && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">Key Features:</h4>
                  <p className="text-sm text-muted-foreground">{gadget.Features}</p>
                </div>
              )}
              
              {gadget["Where to Buy"] && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  asChild
                >
                  <a 
                    href={gadget["Where to Buy"]} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Buy Now
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGadgets.length === 0 && (
        <div className="text-center py-20">
          <Smartphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No smart gadgets found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default GadgetsTab;
