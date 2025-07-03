
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Play, Calendar, Globe, Award, Search, Filter, Film, Tv } from 'lucide-react';

const MoviesTab = () => {
  const [movies, setMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredTvSeries, setFilteredTvSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState('movies');
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [awardsFilter, setAwardsFilter] = useState('all');

  useEffect(() => {
    fetchMoviesAndTvSeries();
  }, []);

  const fetchMoviesAndTvSeries = async () => {
    try {
      setLoading(true);
      
      // Fetch Movies
      const moviesResponse = await fetch('https://script.google.com/macros/s/AKfycbzO53FfgLV-2Kq5pP0fYF7yjFw1CQlZkZoc5TEIn3rDcPSxv8MB8koOasYlf6BuXXCQ/exec');
      const moviesData = await moviesResponse.json();
      console.log('Movies data:', moviesData);
      
      // Fetch TV Series
      const tvResponse = await fetch('https://script.google.com/macros/s/AKfycbxr64a2W4VL2ymbigPXUB3EQmMULCmUhMuDDwvhGNaG4lSwgqAQitXO_hTY2lhh3n1f/exec');
      const tvData = await tvResponse.json();
      console.log('TV Series data:', tvData);
      
      if (Array.isArray(moviesData)) {
        setMovies(moviesData);
        setFilteredMovies(moviesData);
      } else {
        console.error('Invalid movies data format:', moviesData);
        setMovies([]);
        setFilteredMovies([]);
      }

      if (Array.isArray(tvData)) {
        setTvSeries(tvData);
        setFilteredTvSeries(tvData);
      } else {
        console.error('Invalid TV series data format:', tvData);
        setTvSeries([]);
        setFilteredTvSeries([]);
      }
    } catch (error) {
      console.error('Error fetching movies and TV series:', error);
      setMovies([]);
      setTvSeries([]);
      setFilteredMovies([]);
      setFilteredTvSeries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentData = activeType === 'movies' ? movies : tvSeries;
    const setCurrentFiltered = activeType === 'movies' ? setFilteredMovies : setFilteredTvSeries;

    let filtered = currentData.filter(item => {
      const name = item.Name || item.name || '';
      const genre = item.Genre || item.genre || '';
      const platform = item.Platform || item.platform || '';
      const rating = item['Dkloud Rating'] || item.rating || '';
      const language = item.Language || item.language || '';
      const awards = item.Awards || item.awards || '';

      const matchesSearch = typeof name === 'string' && name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = genreFilter === 'all' || (typeof genre === 'string' && genre.toLowerCase().includes(genreFilter.toLowerCase()));
      const matchesPlatform = platformFilter === 'all' || (typeof platform === 'string' && platform.toLowerCase().includes(platformFilter.toLowerCase()));
      const matchesRating = ratingFilter === 'all' || rating === ratingFilter;
      const matchesLanguage = languageFilter === 'all' || (typeof language === 'string' && language.toLowerCase().includes(languageFilter.toLowerCase()));
      const matchesAwards = awardsFilter === 'all' || (typeof awards === 'string' && awards.toLowerCase().includes(awardsFilter.toLowerCase()));

      return matchesSearch && matchesGenre && matchesPlatform && matchesRating && matchesLanguage && matchesAwards;
    });

    setCurrentFiltered(filtered);
  }, [movies, tvSeries, activeType, searchTerm, genreFilter, platformFilter, ratingFilter, languageFilter, awardsFilter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const currentData = activeType === 'movies' ? filteredMovies : filteredTvSeries;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Movies & TV Series
        </h2>
        <p className="text-muted-foreground">Curated collection of entertainment content</p>
      </div>

      {/* Type Switcher */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-white rounded-lg p-1 border border-gray-200">
          <button
            onClick={() => setActiveType('movies')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeType === 'movies' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <Film className="h-4 w-4" />
            Movies ({movies.length})
          </button>
          <button
            onClick={() => setActiveType('tv')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeType === 'tv' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <Tv className="h-4 w-4" />
            TV Series ({tvSeries.length})
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-purple-600" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="action">Action</SelectItem>
                <SelectItem value="drama">Drama</SelectItem>
                <SelectItem value="comedy">Comedy</SelectItem>
                <SelectItem value="thriller">Thriller</SelectItem>
              </SelectContent>
            </Select>

            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="netflix">Netflix</SelectItem>
                <SelectItem value="amazon">Amazon Prime</SelectItem>
                <SelectItem value="disney">Disney+</SelectItem>
                <SelectItem value="hbo">HBO Max</SelectItem>
              </SelectContent>
            </Select>

            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
              </SelectContent>
            </Select>

            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
              </SelectContent>
            </Select>

            <Select value={awardsFilter} onValueChange={setAwardsFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Awards" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="oscar">Oscar Winner</SelectItem>
                <SelectItem value="emmy">Emmy Winner</SelectItem>
                <SelectItem value="golden globe">Golden Globe</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentData.map((item, index) => (
          <Card key={index} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                {activeType === 'movies' ? <Film className="h-4 w-4" /> : <Tv className="h-4 w-4" />}
                {item.Name || item.name || 'Untitled'}
              </CardTitle>
              <CardDescription>
                {item.Description || item.description || 'No description available'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {item.Genre && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    {item.Genre}
                  </Badge>
                )}
                {item.Platform && (
                  <Badge variant="outline" className="border-blue-200 text-blue-700">
                    <Globe className="h-3 w-3 mr-1" />
                    {item.Platform}
                  </Badge>
                )}
                {item.Language && (
                  <Badge variant="outline" className="border-indigo-200 text-indigo-700">
                    {item.Language}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                {item['Dkloud Rating'] && (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{item['Dkloud Rating']}/5</span>
                  </div>
                )}
                {item.Awards && (
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-gold-500 mr-1" />
                    <span className="text-xs text-muted-foreground">{item.Awards}</span>
                  </div>
                )}
              </div>

              {item['IMDb Link'] && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                  asChild
                >
                  <a href={item['IMDb Link']} target="_blank" rel="noopener noreferrer">
                    <Play className="h-4 w-4 mr-2" />
                    View on IMDb
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {currentData.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No {activeType === 'movies' ? 'movies' : 'TV series'} found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default MoviesTab;
