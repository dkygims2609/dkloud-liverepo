
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, Laptop, Watch, Headphones, Camera, Gamepad2, Search, Filter, ExternalLink, Star, TrendingUp, Zap } from 'lucide-react';

interface SmartTechItem {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
  features: string[];
  image: string;
  link: string;
  trending: boolean;
}

const GadgetsTab = () => {
  const [gadgets, setGadgets] = useState<SmartTechItem[]>([]);
  const [filteredGadgets, setFilteredGadgets] = useState<SmartTechItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  useEffect(() => {
    fetchSmartTechData();
  }, []);

  const fetchSmartTechData = async () => {
    try {
      setLoading(true);
      
      // Simulated smart tech data - in real implementation, this would come from APIs
      const smartTechData: SmartTechItem[] = [
        {
          id: '1',
          name: 'iPhone 15 Pro Max',
          description: 'Latest flagship smartphone with A17 Pro chip, titanium design, and advanced camera system.',
          category: 'Smartphone',
          brand: 'Apple',
          price: 1199,
          rating: 4.8,
          features: ['A17 Pro Chip', 'Titanium Build', 'ProRAW Camera', '5G Support'],
          image: 'https://via.placeholder.com/300x200?text=iPhone+15+Pro',
          link: 'https://apple.com',
          trending: true
        },
        {
          id: '2',
          name: 'MacBook Pro M3',
          description: 'Revolutionary laptop with M3 chip, delivering unprecedented performance and battery life.',
          category: 'Laptop',
          brand: 'Apple',
          price: 1999,
          rating: 4.9,
          features: ['M3 Chip', '22-hour battery', 'Liquid Retina Display', 'Studio-quality mics'],
          image: 'https://via.placeholder.com/300x200?text=MacBook+Pro+M3',
          link: 'https://apple.com',
          trending: true
        },
        {
          id: '3',
          name: 'Samsung Galaxy Watch 6',
          description: 'Advanced smartwatch with comprehensive health monitoring and seamless connectivity.',
          category: 'Wearable',
          brand: 'Samsung',
          price: 329,
          rating: 4.6,
          features: ['Health Monitoring', 'GPS Tracking', 'Water Resistant', 'Long Battery Life'],
          image: 'https://via.placeholder.com/300x200?text=Galaxy+Watch+6',
          link: 'https://samsung.com',
          trending: false
        },
        {
          id: '4',
          name: 'Sony WH-1000XM5',
          description: 'Industry-leading noise-canceling headphones with exceptional sound quality.',
          category: 'Audio',
          brand: 'Sony',
          price: 399,
          rating: 4.7,
          features: ['Active Noise Canceling', '30-hour battery', 'Touch Controls', 'Quick Charge'],
          image: 'https://via.placeholder.com/300x200?text=Sony+WH-1000XM5',
          link: 'https://sony.com',
          trending: true
        },
        {
          id: '5',
          name: 'Canon EOS R6 Mark II',
          description: 'Professional mirrorless camera with advanced autofocus and 4K video capabilities.',
          category: 'Camera',
          brand: 'Canon',
          price: 2499,
          rating: 4.8,
          features: ['24.2MP Sensor', '4K Video', 'In-body Stabilization', 'Dual Pixel AF'],
          image: 'https://via.placeholder.com/300x200?text=Canon+EOS+R6',
          link: 'https://canon.com',
          trending: false
        },
        {
          id: '6',
          name: 'PlayStation 5',
          description: 'Next-generation gaming console with lightning-fast loading and immersive gameplay.',
          category: 'Gaming',
          brand: 'Sony',
          price: 499,
          rating: 4.9,
          features: ['Custom SSD', 'Ray Tracing', 'DualSense Controller', '4K Gaming'],
          image: 'https://via.placeholder.com/300x200?text=PlayStation+5',
          link: 'https://playstation.com',
          trending: true
        },
        {
          id: '7',
          name: 'Tesla Model S Plaid',
          description: 'Revolutionary electric vehicle with tri-motor setup and autopilot capabilities.',
          category: 'Electric Vehicle',
          brand: 'Tesla',
          price: 89990,
          rating: 4.7,
          features: ['Tri-Motor', 'Autopilot', '1020 HP', '396 mi Range'],
          image: 'https://via.placeholder.com/300x200?text=Tesla+Model+S',
          link: 'https://tesla.com',
          trending: true
        },
        {
          id: '8',
          name: 'iPad Pro M2',
          description: 'Professional tablet with M2 chip, perfect for creative work and productivity.',
          category: 'Tablet',
          brand: 'Apple',
          price: 1099,
          rating: 4.8,
          features: ['M2 Chip', 'Liquid Retina Display', 'Apple Pencil Support', 'Face ID'],
          image: 'https://via.placeholder.com/300x200?text=iPad+Pro+M2',
          link: 'https://apple.com',
          trending: false
        }
      ];

      setGadgets(smartTechData);
      setFilteredGadgets(smartTechData);
    } catch (error) {
      console.error('Error fetching smart tech data:', error);
      setGadgets([]);
      setFilteredGadgets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = gadgets.filter(gadget => {
      const matchesSearch = (
        gadget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gadget.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gadget.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      
      const matchesCategory = categoryFilter === 'all' || gadget.category.toLowerCase() === categoryFilter.toLowerCase();
      const matchesBrand = brandFilter === 'all' || gadget.brand.toLowerCase() === brandFilter.toLowerCase();
      
      let matchesPrice = true;
      if (priceFilter !== 'all') {
        switch (priceFilter) {
          case 'under-500':
            matchesPrice = gadget.price < 500;
            break;
          case '500-1000':
            matchesPrice = gadget.price >= 500 && gadget.price < 1000;
            break;
          case '1000-2000':
            matchesPrice = gadget.price >= 1000 && gadget.price < 2000;
            break;
          case 'over-2000':
            matchesPrice = gadget.price >= 2000;
            break;
        }
      }

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    setFilteredGadgets(filtered);
  }, [gadgets, searchTerm, categoryFilter, brandFilter, priceFilter]);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'smartphone': return <Smartphone className="h-4 w-4" />;
      case 'laptop': return <Laptop className="h-4 w-4" />;
      case 'wearable': return <Watch className="h-4 w-4" />;
      case 'audio': return <Headphones className="h-4 w-4" />;
      case 'camera': return <Camera className="h-4 w-4" />;
      case 'gaming': return <Gamepad2 className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Extract unique categories and brands for filters
  const categories = [...new Set(gadgets.map(gadget => gadget.category))];
  const brands = [...new Set(gadgets.map(gadget => gadget.brand))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          SmartTech Gadgets
        </h2>
        <p className="text-muted-foreground">Discover the latest and greatest in smart technology</p>
      </div>

      {/* Trending Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Trending Now
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gadgets.filter(gadget => gadget.trending).slice(0, 3).map((gadget) => (
            <div key={gadget.id} className="flex items-center gap-3 bg-white/70 rounded-lg p-3">
              {getCategoryIcon(gadget.category)}
              <div>
                <h4 className="font-semibold text-sm">{gadget.name}</h4>
                <p className="text-xs text-gray-600">{formatPrice(gadget.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white shadow-sm border border-gray-200">
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
              placeholder="Search gadgets by name, features, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
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

            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand.toLowerCase()}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-500">Under $500</SelectItem>
                <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                <SelectItem value="over-2000">Over $2,000</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-blue-600" />
              <span>Showing {filteredGadgets.length} of {gadgets.length} items</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gadgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGadgets.map((gadget) => (
          <Card key={gadget.id} className="bg-white shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(gadget.category)}
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {gadget.category}
                  </Badge>
                </div>
                {gadget.trending && (
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg text-gray-900">
                {gadget.name}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {gadget.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">{gadget.rating}/5</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-blue-600">{formatPrice(gadget.price)}</span>
                  <p className="text-xs text-gray-500">{gadget.brand}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {gadget.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs border-gray-300">
                    {feature}
                  </Badge>
                ))}
                {gadget.features.length > 3 && (
                  <Badge variant="outline" className="text-xs border-gray-300">
                    +{gadget.features.length - 3} more
                  </Badge>
                )}
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                asChild
              >
                <a href={gadget.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Learn More
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGadgets.length === 0 && !loading && (
        <div className="text-center py-12">
          <Zap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-muted-foreground">No smart tech gadgets found matching your criteria.</p>
          {searchTerm || categoryFilter !== 'all' || brandFilter !== 'all' || priceFilter !== 'all' ? (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
                setBrandFilter('all');
                setPriceFilter('all');
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

export default GadgetsTab;
