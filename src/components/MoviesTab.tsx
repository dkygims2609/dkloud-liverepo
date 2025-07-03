
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Film, Star, Calendar, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface Movie {
  Name: string;
  Genre: string;
  Platform: string;
  Language: string;
  Awards: string;
  Year: string;
  DKcloudRating: string;
  "Why to Watch": string;
  Director: string;
}

const MoviesTab = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 6; // 3 columns x 2 rows

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzO53FfgLV-2Kq5pP0fYF7yjFw1CQlZkZoc5TEIn3rDcPSxv8MB8koOasYlf6BuXXCQ/exec');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
      toast({
        title: "Error",
        description: "Failed to fetch movies data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView) % Math.max(itemsPerView, movies.length));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - itemsPerView + movies.length) % Math.max(itemsPerView, movies.length));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000); // Auto-slide every 8 seconds
    return () => clearInterval(interval);
  }, [movies.length]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const visibleMovies = movies.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">🎬 Featured Movies</h2>
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
        {visibleMovies.map((movie, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300 h-full">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base mb-1 flex items-center gap-2">
                    <Film className="h-4 w-4 text-primary" />
                    <span className="line-clamp-1">{movie.Name}</span>
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-2">{movie["Why to Watch"]}</CardDescription>
                </div>
                {movie.DKcloudRating && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-xs font-medium">{movie.DKcloudRating}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1 mb-3">
                {movie.Genre && (
                  <Badge variant="secondary" className="text-xs">{movie.Genre}</Badge>
                )}
                {movie.Platform && (
                  <Badge variant="outline" className="text-xs">{movie.Platform}</Badge>
                )}
                {movie.Language && (
                  <Badge variant="outline" className="text-xs">
                    <Globe className="h-2 w-2 mr-1" />
                    {movie.Language}
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                {movie.Year && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {movie.Year}
                  </div>
                )}
                {movie.Awards && (
                  <Badge variant="outline" className="text-xs">
                    {movie.Awards}
                  </Badge>
                )}
              </div>
              {movie.Director && (
                <p className="text-xs text-muted-foreground mt-2">
                  Directed by {movie.Director}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MoviesTab;
