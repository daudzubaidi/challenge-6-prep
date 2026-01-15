import { useState } from 'react';
import { useSearchMovies, getImageUrl } from '../../../hooks/useMovies';
import { Header, Footer, Container } from '../../layout';
import { MovieCardSkeletonGrid, Toast, SearchMagnifyingGlassIcon } from '../../common';
import { Heart, Play, Star } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import type { Movie } from '../../../types/movie';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { data: searchResults, isLoading } = useSearchMovies(query);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [toastVisible, setToastVisible] = useState(false);

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

    // Show toast only when adding to favorites
    if (!isAlreadyFavorite) {
      setToastVisible(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark">
      <Header />
      <Toast
        message="Success Add to Favorites"
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />

      <main className="flex-1 pt-[90px]">
        {!query ? (
          <div style={{ position: 'fixed', width: '300px', left: 'calc(50% - 150px)', top: '306px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '200px' }}>
              <SearchMagnifyingGlassIcon />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '200px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 600, lineHeight: '30px', color: '#FFFFFF', textAlign: 'center', width: '200px' }}>
                  Start searching
                </h2>
                <p style={{ fontSize: '14px', fontWeight: 400, lineHeight: '28px', color: '#A4A7AE', textAlign: 'center', width: '200px' }}>
                  Enter a movie title to discover amazing films
                </p>
              </div>
            </div>
          </div>
        ) : isLoading ? (
          <Container>
            <MovieCardSkeletonGrid />
          </Container>
        ) : searchResults && searchResults.results.length > 0 ? (
          <Container>
            <div className="flex flex-col gap-0 py-12">
              {/* Search Results List */}
              {searchResults.results.map((movie, index) => (
                <div key={movie.id}>
                  {/* Search Result Item */}
                  <div className="flex items-start justify-between gap-6 py-12">
                    {/* Left: Poster + Info */}
                    <div className="flex gap-6 flex-1">
                      {/* Poster */}
                      <div className="h-[270px] w-[182px] rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={getImageUrl(movie.poster_path)}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex flex-col gap-6 flex-1">
                        {/* Title + Rating */}
                        <div className="flex flex-col gap-3">
                          <h2 className="text-display-xs font-bold text-neutral-25 leading-[36px]">
                            {movie.title}
                          </h2>

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
        ) : (
          <div style={{ position: 'fixed', width: '300px', left: 'calc(50% - 150px)', top: '356px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '200px' }}>
              <SearchMagnifyingGlassIcon />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '200px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 600, lineHeight: '30px', color: '#FFFFFF', textAlign: 'center', width: '200px' }}>
                  Data Not Found
                </h2>
                <p style={{ fontSize: '14px', fontWeight: 400, lineHeight: '28px', color: '#A4A7AE', textAlign: 'center', width: '200px' }}>
                  Try other keywords
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
