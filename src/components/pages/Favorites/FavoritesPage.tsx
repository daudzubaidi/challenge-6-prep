import { useEffect, useState } from 'react';
import { Header, Footer, Container } from '../../layout';
import { MovieCard, EmptyState, MovieCardSkeletonGrid } from '../../common';
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
      <div className="min-h-screen bg-black">
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
    <div className="min-h-screen bg-black">
      <Header />

      <main>
        <Container className="py-12">
          <h1 className="mb-8 text-4xl font-bold text-white">My Favorites</h1>

          {movies.length === 0 ? (
            <EmptyState
              icon="❤️"
              title="No favorites yet"
              description="Start adding movies to your favorites list to see them here"
              actionLabel="Explore Movies"
              onAction={() => (window.location.href = '/')}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavorite={true}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
};
