
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, Laptop, Watch, Headphones, Camera, Gamepad2, Search, Filter, ExternalLink, Star, TrendingUp, Zap, IndianRupee } from 'lucide-react';

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
  availability: string;
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
      
      // Indian market focused smart tech data with INR pricing
      const smartTechData: SmartTechItem[] = [
        {
          id: '1',
          name: 'iPhone 15 Pro Max',
          description: 'Latest flagship smartphone with A17 Pro chip, titanium design, and advanced camera system. Available in India at authorized Apple stores.',
          category: 'Smartphone',
          brand: 'Apple',
          price: 159900,
          rating: 4.8,
          features: ['A17 Pro Chip', 'Titanium Build', 'ProRAW Camera', '5G Support', '256GB Storage'],
          image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=200&fit=crop',
          link: 'https://www.amazon.in/Apple-iPhone-15-Pro-Max/dp/B0CHX3TK9K',
          trending: true,
          availability: 'In Stock'
        },
        {
          id: '2',
          name: 'OnePlus 12',
          description: 'Flagship killer with Snapdragon 8 Gen 3, Hasselblad cameras, and 100W SUPERVOOC charging. Excellent performance for Indian users.',
          category: 'Smartphone',
          brand: 'OnePlus',
          price: 64999,
          rating: 4.7,
          features: ['Snapdragon 8 Gen 3', '100W Fast Charging', 'Hasselblad Camera', '5G Ready', '256GB Storage'],
          image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop',
          link: 'https://www.amazon.in/OnePlus-12-5G-Smartphone/dp/B0CQX2QC3K',
          trending: true,
          availability: 'In Stock'
        },
        {
          id: '3',
          name: 'MacBook Air M3',
          description: 'Revolutionary laptop with M3 chip, delivering unprecedented performance and 18-hour battery life. Perfect for professionals in India.',
          category: 'Laptop',
          brand: 'Apple',
          price: 114900,
          rating: 4.9,
          features: ['M3 Chip', '18-hour battery', 'Liquid Retina Display', 'Silent Operation', '256GB SSD'],
          image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=200&fit=crop',
          link: 'https://www.amazon.in/Apple-MacBook-Air-13-inch-M3/dp/B0CX23GFYJ',
          trending: true,
          availability: 'In Stock'
        },
        {
          id: '4',
          name: 'ASUS ROG Strix G15',
          description: 'Gaming powerhouse with RTX 4060, AMD Ryzen 7, and 144Hz display. Built for Indian gaming enthusiasts.',
          category: 'Laptop',
          brand: 'ASUS',
          price: 89990,
          rating: 4.6,
          features: ['RTX 4060', 'AMD Ryzen 7', '144Hz Display', 'RGB Keyboard', '16GB RAM'],
          image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=200&fit=crop',
          link: 'https://www.amazon.in/ASUS-ROG-Strix-G15-Gaming/dp/B0C74DXQS6',
          trending: false,
          availability: 'In Stock'
        },
        {
          id: '5',
          name: 'Samsung Galaxy Watch 6',
          description: 'Advanced smartwatch with comprehensive health monitoring, GPS tracking, and water resistance. Popular among Indian fitness enthusiasts.',
          category: 'Wearable',
          brand: 'Samsung',
          price: 30999,
          rating: 4.6,
          features: ['Health Monitoring', 'GPS Tracking', 'Water Resistant', 'Long Battery Life', 'Sleep Tracking'],
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop',
          link: 'https://www.amazon.in/Samsung-Galaxy-Watch6-Bluetooth/dp/B0C94Q5LBP',
          trending: false,
          availability: 'In Stock'
        },
        {
          id: '6',
          name: 'Sony WH-1000XM5',
          description: 'Industry-leading noise-canceling headphones with 30-hour battery life. Premium audio experience for Indian audiophiles.',
          category: 'Audio',
          brand: 'Sony',
          price: 29990,
          rating: 4.7,
          features: ['Active Noise Canceling', '30-hour battery', 'Touch Controls', 'Quick Charge', 'LDAC Support'],
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
          link: 'https://www.amazon.in/Sony-WH-1000XM5-Cancelling-Headphones/dp/B09XB7HJZX',
          trending: true,
          availability: 'In Stock'
        },
        {
          id: '7',
          name: 'Nothing Phone (2a)',
          description: 'Unique transparent design smartphone with Glyph Interface and great specs at an affordable price. Made for Indian market.',
          category: 'Smartphone',
          brand: 'Nothing',
          price: 23999,
          rating: 4.5,
          features: ['Dimensity 7200 Pro', 'Glyph Interface', '50MP Camera', 'Fast Charging', '128GB Storage'],
          image: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=300&h=200&fit=crop',
          link: 'https://www.amazon.in/Nothing-Phone-2a-Smartphone/dp/B0CYK5QHPV',
          trending: true,
          availability: 'In Stock'
        },
        {
          id: '8',
          name: 'iPad Air M2',
          description: 'Professional tablet with M2 chip, perfect for creative work and productivity. Supports Apple Pencil and Face ID.',
          category: 'Tablet',
          brand: 'Apple',
          price: 59900,
          rating: 4.8,
          features: ['M2 Chip', 'Liquid Retina Display', 'Apple Pencil Support', 'Face ID', '128GB Storage'],
          image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300&h=200&fit=crop',
          link: 'https://www.amazon.in/Apple-iPad-Air-11-inch-M2/dp/B0D3J7FC1P',
          trending: false,
          availability: 'In Stock'
        },
        {
          id: '9',
          name: 'Xiaomi 14',
          description: 'Flagship smartphone with Snapdragon 8 Gen 3, Leica cameras, and premium build quality. Excellent value for Indian consumers.',
          category: 'Smartphone',
          brand: 'Xiaomi',
          price: 69999,
          rating: 4.6,
          features: ['Snapdragon 8 Gen 3', 'Leica Camera', '120Hz AMOLED', '90W Fast Charging', '256GB Storage'],
          image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=200&fit=crop',
          link: 'https://www.amazon.in/Xiaomi-14-Smartphone-Snapdragon/dp/B0CQX2QC3K',
          trending: false,
          availability: 'Limited Stock'
        },
        {
          id: '10',
          name: 'Dell XPS 13',
          description: 'Ultra-portable laptop with Intel 13th Gen processors and premium build quality. Perfect for professionals and students in India.',
          category: 'Laptop',
          brand: 'Dell',
          price: 99990,
          rating: 4.5,
          features: ['Intel 13th Gen', '13.4" InfinityEdge', '16GB RAM', '512GB SSD', 'Windows 11'],
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop',
          link: 'https://www.amazon.in/Dell-XPS-13-9315-Laptop/dp/B0BVJQ8KPQ',
          trending: false,
          availability: 'In Stock'
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
          case 'under-30000':
            matchesPrice = gadget.price < 30000;
            break;
          case '30000-60000':
            matchesPrice = gadget.price >= 30000 && gadget.price < 60000;
            break;
          case '60000-100000':
            matchesPrice = gadget.price >= 60000 && gadget.price < 100000;
            break;
          case 'over-100000':
            matchesPrice = gadget.price >= 100000;
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
      case 'tablet': return <Laptop className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
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
          SmartTech India
        </h2>
        <p className="text-muted-foreground flex items-center justify-center gap-2">
          <IndianRupee className="h-4 w-4" />
          Discover the latest tech gadgets available in Indian market
        </p>
      </div>

      {/* Trending Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Trending in India
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gadgets.filter(gadget => gadget.trending).slice(0, 3).map((gadget) => (
            <div key={gadget.id} className="flex items-center gap-3 bg-white/70 dark:bg-gray-800/70 rounded-lg p-3">
              {getCategoryIcon(gadget.category)}
              <div>
                <h4 className="font-semibold text-sm">{gadget.name}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <IndianRupee className="h-3 w-3" />
                  {formatPrice(gadget.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
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
                <SelectValue placeholder="Price Range (INR)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-30000">Under ₹30,000</SelectItem>
                <SelectItem value="30000-60000">₹30,000 - ₹60,000</SelectItem>
                <SelectItem value="60000-100000">₹60,000 - ₹1,00,000</SelectItem>
                <SelectItem value="over-100000">Over ₹1,00,000</SelectItem>
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
          <Card key={gadget.id} className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(gadget.category)}
                  <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200">
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
              <CardTitle className="text-lg text-gray-900 dark:text-white">
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
                  <span className="text-2xl font-bold text-blue-600 flex items-center gap-1">
                    <IndianRupee className="h-5 w-5" />
                    {gadget.price.toLocaleString('en-IN')}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{gadget.brand}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Badge variant={gadget.availability === 'In Stock' ? 'default' : 'secondary'} className="text-xs">
                  {gadget.availability}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-1">
                {gadget.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs border-gray-300 dark:border-gray-600">
                    {feature}
                  </Badge>
                ))}
                {gadget.features.length > 3 && (
                  <Badge variant="outline" className="text-xs border-gray-300 dark:border-gray-600">
                    +{gadget.features.length - 3} more
                  </Badge>
                )}
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                asChild
              >
                <a href={gadget.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Amazon India
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
