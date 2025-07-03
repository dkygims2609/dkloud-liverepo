
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Film, Star, Calendar, Globe } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface Movie {
  id: string;
  title: string;
  genre: string;
  platform: string;
  language: string;
  award: string;
  year: string;
  rating: string;
  description: string;
}

const MoviesTab = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('https://api.sheetbest.com/sheets/7e4985fe-430a-47f0-b328-394bd58af9c7');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
      toast({
        title: "Error",
        description: "Failed to fetch movies data",
        variant: "destructive",
      });
      // Fallback data
      setMovies([
        {
          id: '1',
          title: 'The Matrix',
          genre: 'Sci-Fi',
          platform: 'Netflix',
          language: 'English',
          award: 'Academy Award',
          year: '1999',
          rating: '8.7',
          description: 'A computer hacker learns from mysterious rebels about the true nature of his reality.'
        },
        {
          id: '2',
          title: 'Inception',
          genre: 'Thriller',
          platform: 'Amazon Prime',
          language: 'English',
          award: 'Oscar Winner',
          year: '2010',
          rating: '8.8',
          description: 'A thief who enters the dreams of others to steal secrets from their subconscious.'
        },
        {
          id: '3',
          title: 'Parasite',
          genre: 'Drama',
          platform: 'Hulu',
          language: 'Korean',
          award: 'Best Picture',
          year: '2019',
          rating: '8.6',
          description: 'A poor family schemes to become employed by a wealthy family.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         movie.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = genreFilter === 'all' || movie.genre === genreFilter;
    const matchesPlatform = platformFilter === 'all' || movie.platform === platformFilter;
    const matchesLanguage = languageFilter === 'all' || movie.language === languageFilter;
    
    return matchesSearch && matchesGenre && matchesPlatform && matchesLanguage;
  });

  const uniqueGenres = [...new Set(movies.map(movie => movie.genre).filter(Boolean))];
  const uniquePlatforms = [...new Set(movies.map(movie => movie.platform).filter(Boolean))];
  const uniqueLanguages = [...new Set(movies.map(movie => movie.language).filter(Boolean))];

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
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select value={genreFilter} onValueChange={setGenreFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {uniqueGenres.map(genre => (
              <SelectItem key={genre} value={genre}>{genre}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={platformFilter} onValueChange={setPlatformFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            {uniquePlatforms.map(platform => (
              <SelectItem key={platform} value={platform}>{platform}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={languageFilter} onValueChange={setLanguageFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            {uniqueLanguages.map(language => (
              <SelectItem key={language} value={language}>{language}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.map((movie) => (
          <Card key={movie.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2 flex items-center gap-2">
                    <Film className="h-5 w-5 text-primary" />
                    {movie.title}
                  </CardTitle>
                  <CardDescription>{movie.description}</CardDescription>
                </div>
                {movie.rating && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{movie.rating}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genre && (
                  <Badge variant="secondary">{movie.genre}</Badge>
                )}
                {movie.platform && (
                  <Badge variant="outline">{movie.platform}</Badge>
                )}
                {movie.language && (
                  <Badge variant="outline">
                    <Globe className="h-3 w-3 mr-1" />
                    {movie.language}
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                {movie.year && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {movie.year}
                  </div>
                )}
                {movie.award && (
                  <Badge variant="outline" className="text-xs">
                    {movie.award}
                  </Badge>
                )}
              </div>
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
