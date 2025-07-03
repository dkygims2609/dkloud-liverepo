import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Film, Star, Calendar, Globe, ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerView = 6; // 3 columns x 2 rows

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzO53FfgLV-2Kq5pP0fYF7yjFw1CQlZkZoc5TEIn3rDcPSxv8MB8koOasYlf6BuXXCQ/exec');
      const data = await response.json();
      console.log('Movies data:', data);
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

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.Name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = genreFilter === 'all' || movie.Genre === genreFilter;
    const matchesPlatform = platformFilter === 'all' || movie.Platform === platformFilter;
    const matchesRating = ratingFilter === 'all' || movie.DKcloudRating === ratingFilter;
    const matchesLanguage = languageFilter === 'all' || movie.Language === languageFilter;
    
    return matchesSearch && matchesGenre && matchesPlatform && matchesRating && matchesLanguage;
  });

  const uniqueGenres = [...new Set(movies.map(movie => movie.Genre).filter(Boolean))];
  const uniquePlatforms = [...new Set(movies.map(movie => movie.Platform).filter(Boolean))];
  const uniqueRatings = [...new Set(movies.map(movie => movie.DKcloudRating).filter(Boolean))];
  const uniqueLanguages = [...new Set(movies.map(movie => movie.Language).filter(Boolean))];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView) % Math.max(itemsPerView, filteredMovies.length));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - itemsPerView + filteredMovies.length) % Math.max(itemsPerView, filteredMovies.length));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [filteredMovies.length]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const visibleMovies = filteredMovies.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          🎬 Featured Movies
        </h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowFilters(!showFilters)}
            className="border-purple-300 text-purple-700 hover:bg-purple-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" onClick={prevSlide}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextSlide}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search movies by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {uniqueGenres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                {uniquePlatforms.map(platform => (
                  <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger>
                <SelectValue placeholder="DKloud Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                {uniqueRatings.map(rating => (
                  <SelectItem key={rating} value={rating}>{rating}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {uniqueLanguages.map(language => (
                  <SelectItem key={language} value={language}>{language}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleMovies.map((movie, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300 h-full bg-gradient-to-br from-background to-purple-50/20 dark:to-purple-900/10 border-purple-200/50 dark:border-purple-800/50">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-sm mb-1 flex items-center gap-2">
                    <Film className="h-4 w-4 text-purple-600" />
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
                  <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">{movie.Genre}</Badge>
                )}
                {movie.Platform && (
                  <Badge variant="outline" className="text-xs border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-300">{movie.Platform}</Badge>
                )}
                {movie.Language && (
                  <Badge variant="outline" className="text-xs border-indigo-300 text-indigo-700 dark:border-indigo-700 dark:text-indigo-300">
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
                  <Badge variant="outline" className="text-xs border-yellow-300 text-yellow-700 dark:border-yellow-700 dark:text-yellow-300">
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

      {filteredMovies.length === 0 && (
        <div className="text-center py-20">
          <Film className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No movies found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default MoviesTab;
