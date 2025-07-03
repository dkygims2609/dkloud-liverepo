
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Smartphone, Star, ExternalLink } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface Gadget {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  rating: string;
  image: string;
  features: string[];
  buyLink: string;
}

const GadgetsTab = () => {
  const [gadgets, setGadgets] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchGadgets();
  }, []);

  const fetchGadgets = async () => {
    try {
      // In a real implementation, this would fetch from SheetBest API
      // For now, we'll use fallback data
      setGadgets([
        {
          id: '1',
          title: 'MacBook Pro M3',
          description: 'Apple\'s latest MacBook Pro with M3 chip offers unprecedented performance for creative professionals.',
          category: 'Laptops',
          price: '$1,999',
          rating: '4.8',
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&h=300',
          features: ['M3 Chip', '16GB RAM', '512GB SSD', 'Retina Display'],
          buyLink: 'https://apple.com'
        },
        {
          id: '2',
          title: 'iPhone 15 Pro',
          description: 'The most advanced iPhone ever with titanium design and A17 Pro chip.',
          category: 'Smartphones',
          price: '$999',
          rating: '4.7',
          image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&h=300',
          features: ['A17 Pro Chip', '128GB Storage', 'ProRAW Camera', 'Titanium Build'],
          buyLink: 'https://apple.com'
        },
        {
          id: '3',
          title: 'Sony WH-1000XM5',
          description: 'Industry-leading noise canceling headphones with exceptional sound quality.',
          category: 'Audio',
          price: '$399',
          rating: '4.6',
          image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=400&h=300',
          features: ['Noise Canceling', '30h Battery', 'Quick Charge', 'Multipoint Connection'],
          buyLink: 'https://sony.com'
        },
        {
          id: '4',
          title: 'Samsung Galaxy Watch 6',
          description: 'Advanced smartwatch with comprehensive health tracking and sleek design.',
          category: 'Wearables',
          price: '$329',
          rating: '4.5',
          image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=400&h=300',
          features: ['Health Monitoring', 'GPS', 'Water Resistant', 'Sleep Tracking'],
          buyLink: 'https://samsung.com'
        },
        {
          id: '5',
          title: 'iPad Pro 12.9" M2',
          description: 'The ultimate iPad experience with M2 chip and Liquid Retina XDR display.',
          category: 'Tablets',
          price: '$1,099',
          rating: '4.8',
          image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&h=300',
          features: ['M2 Chip', 'Liquid Retina XDR', 'Apple Pencil Support', '5G Capable'],
          buyLink: 'https://apple.com'
        },
        {
          id: '6',
          title: 'Tesla Model S Plaid',
          description: 'The quickest accelerating production car ever made with cutting-edge technology.',
          category: 'Electric Vehicles',
          price: '$129,990',
          rating: '4.9',
          image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=400&h=300',
          features: ['0-60 in 1.99s', '405 mile range', 'Autopilot', 'Over-the-air updates'],
          buyLink: 'https://tesla.com'
        }
      ]);
    } catch (error) {
      console.error('Error fetching gadgets:', error);
      toast({
        title: "Info",
        description: "Displaying sample gadgets data",
        variant: "default",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredGadgets = gadgets.filter(gadget => {
    const matchesSearch = gadget.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         gadget.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || gadget.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = [...new Set(gadgets.map(gadget => gadget.category).filter(Boolean))];

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
          placeholder="Search gadgets..."
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
        {filteredGadgets.map((gadget) => (
          <Card key={gadget.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img 
                src={gadget.image} 
                alt={gadget.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=300";
                }}
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2 flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-primary" />
                    {gadget.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {gadget.description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium">{gadget.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{gadget.category}</Badge>
                  <span className="text-lg font-bold text-primary">{gadget.price}</span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {gadget.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  asChild
                >
                  <a 
                    href={gadget.buyLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Product
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGadgets.length === 0 && (
        <div className="text-center py-20">
          <Smartphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No gadgets found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default GadgetsTab;
