
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
  const itemsPerView = 6; // 3 columns x 2 rows

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxr64a2W4VL2ymbigPXUB3EQmMULCmUhMuDDwvhGNaG4lSwgqAQitXO_hTY2lhh3n1f/exec');
      const data = await response.json();
      console.log('TV series data:', data);
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
    setCurrentIndex((prev) => (prev + itemsPerView) % Math.max(itemsPerView, series.length));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - itemsPerView + series.length) % Math.max(itemsPerView, series.length));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [series.length]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const visibleSeries = series.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📺 Featured TV Series
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={prevSlide}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextSlide}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleSeries.map((show, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300 h-full bg-gradient-to-br from-background to-blue-50/20 dark:to-blue-900/10 border-blue-200/50 dark:border-blue-800/50">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-sm mb-1 flex items-center gap-2">
                    <Tv className="h-4 w-4 text-blue-600" />
                    <span className="line-clamp-1">{show.Name}</span>
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-2">{show["Why to Watch"]}</CardDescription>
                </div>
                {show.DKcloudRating && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-xs font-medium">{show.DKcloudRating}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1 mb-3">
                {show.Genre && (
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">{show.Genre}</Badge>
                )}
                {show.Platform && (
                  <Badge variant="outline" className="text-xs border-purple-300 text-purple-700 dark:border-purple-700 dark:text-purple-300">{show.Platform}</Badge>
                )}
                {show.Language && (
                  <Badge variant="outline" className="text-xs border-indigo-300 text-indigo-700 dark:border-indigo-700 dark:text-indigo-300">
                    <Globe className="h-2 w-2 mr-1" />
                    {show.Language}
                  </Badge>
                )}
                {show.Seasons && (
                  <Badge variant="outline" className="text-xs border-green-300 text-green-700 dark:border-green-700 dark:text-green-300">
                    {show.Seasons} Season{show.Seasons !== '1' ? 's' : ''}
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                {show.Year && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {show.Year}
                  </div>
                )}
                {show.Awards && (
                  <Badge variant="outline" className="text-xs border-yellow-300 text-yellow-700 dark:border-yellow-700 dark:text-yellow-300">
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
        ))}
      </div>
    </div>
  );
};

export default TVSeriesTab;
