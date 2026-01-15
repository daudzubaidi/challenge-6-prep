import { useState, useEffect } from 'react';
import { useSearchMovies, getImageUrl } from '../../../hooks/useMovies';
import { Header, Footer, Container } from '../../layout';
import { Toast, FilmClapperIcon } from '../../common';
import { ArrowLeft, Search, X, Heart, Play, Star } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import type { Movie } from '../../../types/movie';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(query);
  const { data: searchResults, isLoading } = useSearchMovies(query);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleFavoriteToggle = (movie: Movie) => {
    const isAlreadyFavorite = favorites.includes(movie.id);
    setFavorites((prev) =>
      isAlreadyFavorite
        ? prev.filter((id) => id !== movie.id)
        : [...prev, movie.id]
    );
    localStorage.setItem('favorites', JSON.stringify(
      isAlreadyFavorite
        ? favorites.filter((id) => id !== movie.id)
        : [...favorites, movie.id]
    ));

    if (!isAlreadyFavorite) {
      setToastVisible(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue.trim() });
    }
  };

  const handleClearSearch = () => {
    setInputValue('');
    setSearchParams({});
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black md:bg-background-dark">
      <Toast
        message="Success Add to Favorites"
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />

      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Mobile Search Header */}
      <div className="md:hidden sticky top-0 z-50 bg-black px-4 py-4 flex items-center gap-3">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="text-white flex-shrink-0"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-neutral-500" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search Movie"
              className="w-full h-[44px] bg-[#1a1a1a] rounded-full pl-11 pr-10 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-700"
              autoFocus
            />
            {inputValue && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 text-neutral-500 hover:text-white"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Content */}
      <main className="flex-1 md:pt-[90px]">
        {!query ? (
          // Initial state - empty
          <div className="flex-1" />
        ) : isLoading ? (
          // Loading state
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : searchResults && searchResults.results.length > 0 ? (
          <>
            {/* Mobile Results */}
            <div className="md:hidden px-4 py-4 flex flex-col gap-4">
              {searchResults.results.map((movie) => (
                <div key={movie.id} className="flex flex-col gap-4">
                  {/* Movie Card - Horizontal Layout */}
                  <div className="flex gap-4">
                    {/* Poster */}
                    <Link to={`/movie/${movie.id}`} className="flex-shrink-0">
                      <div className="w-[100px] sm:w-[120px] aspect-[2/3] rounded-lg overflow-hidden">
                        <img
                          src={getImageUrl(movie.poster_path)}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                      <Link to={`/movie/${movie.id}`}>
                        <h2 className="text-lg sm:text-xl font-bold text-white leading-tight line-clamp-2">
                          {movie.title}
                        </h2>
                      </Link>

                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-white">
                          {movie.vote_average.toFixed(1)}/10
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2 sm:line-clamp-3">
                        {movie.overview}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 items-center">
                    {/* Watch Trailer Button */}
                    <Link to={`/movie/${movie.id}`} className="flex-1">
                      <button className="w-full bg-[#961200] text-white h-[44px] sm:h-[48px] rounded-full flex items-center justify-center gap-2 font-semibold text-sm sm:text-base hover:bg-[#a81500] transition-colors">
                        Watch Trailer
                        <Play className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" fill="currentColor" />
                      </button>
                    </Link>

                    {/* Favorite Button */}
                    <button
                      onClick={() => handleFavoriteToggle(movie)}
                      className={`flex-shrink-0 h-[44px] w-[44px] sm:h-[48px] sm:w-[48px] rounded-full flex items-center justify-center transition-colors ${
                        favorites.includes(movie.id)
                          ? 'bg-[#961200] text-white'
                          : 'backdrop-blur-[20px] bg-[rgba(10,13,18,0.6)] border border-[#181d27] text-white hover:bg-[rgba(10,13,18,0.7)]'
                      }`}
                      aria-label={favorites.includes(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart
                        className="h-5 w-5 sm:h-6 sm:w-6"
                        fill={favorites.includes(movie.id) ? 'currentColor' : 'none'}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Results */}
            <Container className="hidden md:block">
              <div className="flex flex-col gap-0 py-12">
                {searchResults.results.map((movie, index) => (
                  <div key={movie.id}>
                    {/* Search Result Item */}
                    <div className="flex items-start justify-between gap-6 py-12">
                      {/* Left: Poster + Info */}
                      <div className="flex gap-6 flex-1">
                        {/* Poster */}
                        <Link to={`/movie/${movie.id}`}>
                          <div className="h-[270px] w-[182px] rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={getImageUrl(movie.poster_path)}
                              alt={movie.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>

                        {/* Info */}
                        <div className="flex flex-col gap-6 flex-1">
                          {/* Title + Rating */}
                          <div className="flex flex-col gap-3">
                            <Link to={`/movie/${movie.id}`}>
                              <h2 className="text-display-xs font-bold text-neutral-25 leading-[36px] hover:text-neutral-400 transition-colors">
                                {movie.title}
                              </h2>
                            </Link>

                            {/* Rating */}
                            <div className="flex items-center gap-1">
                              <Star className="h-6 w-6 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                              <p className="text-text-lg font-medium text-neutral-25">
                                {movie.vote_average.toFixed(1)}/10
                              </p>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-text-md font-regular text-neutral-400 line-clamp-3">
                            {movie.overview}
                          </p>

                          {/* Watch Trailer Button */}
                          <Link to={`/movie/${movie.id}`}>
                            <button className="bg-[#961200] text-[#fdfdfd] h-[52px] w-[200px] rounded-full flex items-center justify-center gap-2 p-[8px] font-semibold text-text-md leading-[30px] hover:bg-[#a81500] transition-colors">
                              Watch Trailer
                              <Play className="h-6 w-6 flex-shrink-0" fill="currentColor" />
                            </button>
                          </Link>
                        </div>
                      </div>

                      {/* Right: Heart Button */}
                      <button
                        onClick={() => handleFavoriteToggle(movie)}
                        className="backdrop-blur-[20px] bg-[rgba(10,13,18,0.6)] border border-[#181d27] text-[#fdfdfd] h-[56px] w-[56px] rounded-full flex items-center justify-center flex-shrink-0 hover:bg-[rgba(10,13,18,0.7)] transition-colors"
                        aria-label={favorites.includes(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart
                          className="h-6 w-6"
                          fill={favorites.includes(movie.id) ? 'currentColor' : 'none'}
                        />
                      </button>
                    </div>

                    {/* Divider */}
                    {index < searchResults.results.length - 1 && (
                      <div className="border-t border-neutral-800" />
                    )}
                  </div>
                ))}
              </div>
            </Container>
          </>
        ) : (
          // Not Found state
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
            <div className="w-[200px] h-[200px]">
              <FilmClapperIcon />
            </div>
            <div className="flex flex-col items-center gap-2 mt-4">
              <h2 className="text-base font-semibold text-white text-center">
                Data Not Found
              </h2>
              <p className="text-sm text-neutral-500 text-center">
                Try other keywords
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Desktop Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};
