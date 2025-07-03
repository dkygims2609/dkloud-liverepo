
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tv, Star, Calendar, Globe } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface TVSeries {
  id: string;
  title: string;
  genre: string;
  platform: string;
  language: string;
  award: string;
  year: string;
  rating: string;
  description: string;
  seasons: string;
}

const TVSeriesTab = () => {
  const [series, setSeries] = useState<TVSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    try {
      const response = await fetch('https://api.sheetbest.com/sheets/a9b35d33-f03a-463d-8df6-8ae470fdcda7');
      const data = await response.json();
      setSeries(data);
    } catch (error) {
      console.error('Error fetching TV series:', error);
      toast({
        title: "Error",
        description: "Failed to fetch TV series data",
        variant: "destructive",
      });
      // Fallback data
      setSeries([
        {
          id: '1',
          title: 'Breaking Bad',
          genre: 'Crime Drama',
          platform: 'Netflix',
          language: 'English',
          award: 'Emmy Winner',
          year: '2008-2013',
          rating: '9.5',
          description: 'A high school chemistry teacher turned methamphetamine manufacturer.',
          seasons: '5'
        },
        {
          id: '2',
          title: 'Stranger Things',
          genre: 'Sci-Fi Horror',
          platform: 'Netflix',
          language: 'English',
          award: 'SAG Award',
          year: '2016-2022',
          rating: '8.7',
          description: 'A group of kids uncover supernatural mysteries in their small town.',
          seasons: '4'
        },
        {
          id: '3',
          title: 'Money Heist',
          genre: 'Thriller',
          platform: 'Netflix',
          language: 'Spanish',
          award: 'International Emmy',
          year: '2017-2021',
          rating: '8.3',
          description: 'A criminal mastermind plans the perfect heist at the Royal Mint of Spain.',
          seasons: '5'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredSeries = series.filter(show => {
    const matchesSearch = show.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         show.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = genreFilter === 'all' || show.genre === genreFilter;
    const matchesPlatform = platformFilter === 'all' || show.platform === platformFilter;
    const matchesLanguage = languageFilter === 'all' || show.language === languageFilter;
    
    return matchesSearch && matchesGenre && matchesPlatform && matchesLanguage;
  });

  const uniqueGenres = [...new Set(series.map(show => show.genre).filter(Boolean))];
  const uniquePlatforms = [...new Set(series.map(show => show.platform).filter(Boolean))];
  const uniqueLanguages = [...new Set(series.map(show => show.language).filter(Boolean))];

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
          placeholder="Search TV series..."
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
        {filteredSeries.map((show) => (
          <Card key={show.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2 flex items-center gap-2">
                    <Tv className="h-5 w-5 text-primary" />
                    {show.title}
                  </CardTitle>
                  <CardDescription>{show.description}</CardDescription>
                </div>
                {show.rating && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{show.rating}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {show.genre && (
                  <Badge variant="secondary">{show.genre}</Badge>
                )}
                {show.platform && (
                  <Badge variant="outline">{show.platform}</Badge>
                )}
                {show.language && (
                  <Badge variant="outline">
                    <Globe className="h-3 w-3 mr-1" />
                    {show.language}
                  </Badge>
                )}
                {show.seasons && (
                  <Badge variant="outline">
                    {show.seasons} Season{show.seasons !== '1' ? 's' : ''}
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                {show.year && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {show.year}
                  </div>
                )}
                {show.award && (
                  <Badge variant="outline" className="text-xs">
                    {show.award}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSeries.length === 0 && (
        <div className="text-center py-20">
          <Tv className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No TV series found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default TVSeriesTab;
