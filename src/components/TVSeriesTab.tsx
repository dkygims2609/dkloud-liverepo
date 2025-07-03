
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tv, Star, Calendar, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface TVSeries {
  Name: string;
  Genre: string;
  Platform: string;
  Language: string;
  Awards: string;
  Year: string;
  DKcloudRating: string;
  "Why to Watch": string;
  Director: string;
  Seasons?: string;
}

const TVSeriesTab = () => {
  const [series, setSeries] = useState<TVSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxr64a2W4VL2ymbigPXUB3EQmMULCmUhMuDDwvhGNaG4lSwgqAQitXO_hTY2lhh3n1f/exec');
      const data = await response.json();
      setSeries(data);
    } catch (error) {
      console.error('Error fetching TV series:', error);
      toast({
        title: "Error",
        description: "Failed to fetch TV series data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, series.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, series.length - 2)) % Math.max(1, series.length - 2));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, [series.length]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">📺 Featured TV Series</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={prevSlide}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextSlide}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out gap-6"
          style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
        >
          {series.map((show, index) => (
            <div key={index} className="min-w-[300px] flex-shrink-0">
              <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 flex items-center gap-2">
                        <Tv className="h-5 w-5 text-primary" />
                        {show.Name}
                      </CardTitle>
                      <CardDescription className="text-sm">{show["Why to Watch"]}</CardDescription>
                    </div>
                    {show.DKcloudRating && (
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{show.DKcloudRating}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {show.Genre && (
                      <Badge variant="secondary">{show.Genre}</Badge>
                    )}
                    {show.Platform && (
                      <Badge variant="outline">{show.Platform}</Badge>
                    )}
                    {show.Language && (
                      <Badge variant="outline">
                        <Globe className="h-3 w-3 mr-1" />
                        {show.Language}
                      </Badge>
                    )}
                    {show.Seasons && (
                      <Badge variant="outline">
                        {show.Seasons} Season{show.Seasons !== '1' ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    {show.Year && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {show.Year}
                      </div>
                    )}
                    {show.Awards && (
                      <Badge variant="outline" className="text-xs">
                        {show.Awards}
                      </Badge>
                    )}
                  </div>
                  {show.Director && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Directed by {show.Director}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TVSeriesTab;
