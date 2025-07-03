
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Play, Calendar, Globe, Award, Search, Filter, Film, Tv, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerView = 6; // 2 rows x 3 columns

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
      const rating = item.DKcloudRating || item['Dkloud Rating'] || item.rating || '';
      const language = item.Language || item.language || '';
      const awards = item.Awards || item.awards || '';

      const matchesSearch = typeof name === 'string' && name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = genreFilter === 'all' || (typeof genre === 'string' && genre.toLowerCase().includes(genreFilter.toLowerCase()));
      const matchesPlatform = platformFilter === 'all' || (typeof platform === 'string' && platform.toLowerCase().includes(platformFilter.toLowerCase()));
      const matchesRating = ratingFilter === 'all' || rating.toString() === ratingFilter;
      const matchesLanguage = languageFilter === 'all' || (typeof language === 'string' && language.toLowerCase().includes(languageFilter.toLowerCase()));
      const matchesAwards = awardsFilter === 'all' || (typeof awards === 'string' && awards.toLowerCase().includes(awardsFilter.toLowerCase()));

      return matchesSearch && matchesGenre && matchesPlatform && matchesRating && matchesLanguage && matchesAwards;
    });

    setCurrentFiltered(filtered);
    setCurrentIndex(0);
  }, [movies, tvSeries, activeType, searchTerm, genreFilter, platformFilter, ratingFilter, languageFilter, awardsFilter]);

  // Extract unique values for filters
  const currentData = activeType === 'movies' ? movies : tvSeries;
  const genres = [...new Set(currentData.map(item => item.Genre).filter(Boolean))];
  const platforms = [...new Set(currentData.map(item => item.Platform).filter(Boolean))];
  const ratings = [...new Set(currentData.map(item => item.DKcloudRating || item['Dkloud Rating']).filter(Boolean))];
  const languages = [...new Set(currentData.map(item => item.Language).filter(Boolean))];
  const awards = [...new Set(currentData.map(item => item.Awards).filter(Boolean))];

  // Manual slider controls
  const nextSlide = () => {
    const currentData = activeType === 'movies' ? filteredMovies : filteredTvSeries;
    if (currentIndex + itemsPerView < currentData.length) {
      setCurrentIndex(currentIndex + itemsPerView);
    }
  };

  const prevSlide = () => {
    if (currentIndex - itemsPerView >= 0) {
      setCurrentIndex(currentIndex - itemsPerView);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const currentFilteredData = activeType === 'movies' ? filteredMovies : filteredTvSeries;
  const visibleItems = currentFilteredData.slice(currentIndex, currentIndex + itemsPerView);
  const canGoNext = currentIndex + itemsPerView < currentFilteredData.length;
  const canGoPrev = currentIndex > 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Movies & TV Series
        </h2>
        <p className="text-muted-foreground">Curated collection of entertainment content</p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
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
                {genres.map(genre => (
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
                {platforms.map(platform => (
                  <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger>
                <SelectValue placeholder="DKcloud Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                {ratings.map(rating => (
                  <SelectItem key={rating} value={rating.toString()}>{rating} Stars</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {languages.map(language => (
                  <SelectItem key={language} value={language}>{language}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={awardsFilter} onValueChange={setAwardsFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Awards" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {awards.map(award => (
                  <SelectItem key={award} value={award}>{award}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Type Switcher */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700 shadow-sm">
          <button
            onClick={() => setActiveType('movies')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeType === 'movies' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-600 dark:text-gray-300 hover:text-purple-600'
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
                : 'text-gray-600 dark:text-gray-300 hover:text-purple-600'
            }`}
          >
            <Tv className="h-4 w-4" />
            TV Series ({tvSeries.length})
          </button>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {activeType === 'movies' ? 'Featured Movies' : 'Featured TV Series'}
        </h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={prevSlide} 
            disabled={!canGoPrev}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={nextSlide} 
            disabled={!canGoNext}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content Grid - 2 rows x 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {visibleItems.map((item, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                {activeType === 'movies' ? <Film className="h-4 w-4" /> : <Tv className="h-4 w-4" />}
                {item.Name || item.name || 'Untitled'}
              </CardTitle>
              <CardDescription className="line-clamp-3">
                {item['Why to Watch'] || item.Description || item.description || 'No description available'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {item.Genre && (
                  <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                    {item.Genre}
                  </Badge>
                )}
                {item.Platform && (
                  <Badge variant="outline" className="border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300">
                    <Globe className="h-3 w-3 mr-1" />
                    {item.Platform}
                  </Badge>
                )}
                {item.Language && (
                  <Badge variant="outline" className="border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300">
                    {item.Language}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                {(item.DKcloudRating || item['Dkloud Rating']) && (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{item.DKcloudRating || item['Dkloud Rating']}/5</span>
                  </div>
                )}
                {item.Awards && (
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-xs text-muted-foreground">{item.Awards}</span>
                  </div>
                )}
              </div>

              {item['IMDb Link'] && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
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

      {/* Pagination Info */}
      <div className="text-center text-sm text-muted-foreground">
        Showing {currentIndex + 1}-{Math.min(currentIndex + itemsPerView, currentData.length)} of {currentData.length} items
      </div>
    </div>
  );
};

export default MoviesTab;
