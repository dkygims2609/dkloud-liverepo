
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
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, movies.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, movies.length - 2)) % Math.max(1, movies.length - 2));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, [movies.length]);

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

      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out gap-6"
          style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
        >
          {movies.map((movie, index) => (
            <div key={index} className="min-w-[300px] flex-shrink-0">
              <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 flex items-center gap-2">
                        <Film className="h-5 w-5 text-primary" />
                        {movie.Name}
                      </CardTitle>
                      <CardDescription className="text-sm">{movie["Why to Watch"]}</CardDescription>
                    </div>
                    {movie.DKcloudRating && (
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{movie.DKcloudRating}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {movie.Genre && (
                      <Badge variant="secondary">{movie.Genre}</Badge>
                    )}
                    {movie.Platform && (
                      <Badge variant="outline">{movie.Platform}</Badge>
                    )}
                    {movie.Language && (
                      <Badge variant="outline">
                        <Globe className="h-3 w-3 mr-1" />
                        {movie.Language}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    {movie.Year && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesTab;
