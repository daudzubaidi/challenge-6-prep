import { useState } from 'react';
import { useSearchMovies, getImageUrl } from '../../../hooks/useMovies';
import { Header, Footer, Container } from '../../layout';
import { EmptyState, MovieCardSkeletonGrid } from '../../common';
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

  const handleFavoriteToggle = (movie: Movie) => {
    setFavorites((prev) =>
      prev.includes(movie.id)
        ? prev.filter((id) => id !== movie.id)
        : [...prev, movie.id]
    );
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  return (
    <div className="min-h-screen bg-background-dark">
      <Header />

      <main>
        <Container>
          {!query ? (
            <div className="flex flex-col gap-12 py-12">
              <EmptyState
                icon="🔍"
                title="Start searching"
                description="Enter a movie title to discover amazing films"
              />
            </div>
          ) : isLoading ? (
            <MovieCardSkeletonGrid />
          ) : searchResults && searchResults.results.length > 0 ? (
            <div className="flex flex-col gap-12 py-12">
              {/* Search Results List */}
              <div className="flex flex-col gap-0">
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
            </div>
          ) : (
            <div className="flex flex-col gap-12 py-12">
              <EmptyState
                icon="😔"
                title="Data Not Found"
                description="Try other keywords"
              />
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
};
