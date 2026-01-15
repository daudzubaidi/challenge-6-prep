import { useEffect, useState } from 'react';
import { Header, Footer, Container } from '../../layout';
import { EmptyState, MovieCardSkeletonGrid } from '../../common';
import { Heart, Play, Star } from 'lucide-react';
import { getImageUrl } from '../../../hooks/useMovies';
import { Link } from 'react-router-dom';
import type { Movie } from '../../../types/movie';
import { api } from '../../../lib/api';

export const FavoritesPage = () => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      if (favoriteIds.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        const moviePromises = favoriteIds.map((id) =>
          api.get<Movie>(`/movie/${id}`, {
            params: { api_key: import.meta.env.VITE_API_KEY },
          })
        );

        const responses = await Promise.all(moviePromises);
        const fetchedMovies = responses.map((res) => res.data);
        setMovies(fetchedMovies);
      } catch (error) {
        console.error('Failed to fetch favorite movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, [favoriteIds]);

  const handleFavoriteToggle = (movie: Movie) => {
    const newFavorites = favoriteIds.filter((id) => id !== movie.id);
    setFavoriteIds(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setMovies((prev) => prev.filter((m) => m.id !== movie.id));
  };

  if (isLoading && favoriteIds.length > 0) {
    return (
      <div className="min-h-screen bg-background-dark">
        <Header />
        <Container>
          <div className="py-20">
            <MovieCardSkeletonGrid />
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark">
      <Header />

      <main>
        <Container>
          <div className="flex flex-col gap-12">
            <h1 className="text-display-lg font-bold text-neutral-25 leading-[48px] tracking-[-0.72px]">Favorites</h1>

            {movies.length === 0 ? (
              <EmptyState
                icon="❤️"
                title="No favorites yet"
                description="Start adding movies to your favorites list to see them here"
                actionLabel="Explore Movies"
                onAction={() => (window.location.href = '/')}
              />
            ) : (
              <div className="flex flex-col gap-0">
                {movies.map((movie, index) => (
                  <div key={movie.id}>
                    {/* Favorite Item */}
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
                        aria-label="Remove from favorites"
                      >
                        <Heart className="h-6 w-6 fill-current" />
                      </button>
                    </div>

                    {/* Divider */}
                    {index < movies.length - 1 && (
                      <div className="border-t border-neutral-800" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
};
