import type { Movie } from '../../../types/movie';
import { MovieCard } from '../../common';

interface MoviesGridProps {
  title: string;
  movies: Movie[];
  onFavoriteToggle?: (movie: Movie) => void;
  favorites?: number[];
}

export const MoviesGrid = ({
  title,
  movies,
  onFavoriteToggle,
  favorites = [],
}: MoviesGridProps) => {
  return (
    <section className="py-12">
      <h2 className="mb-8 text-3xl md:text-4xl font-bold text-white">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={favorites.includes(movie.id)}
          />
        ))}
      </div>
    </section>
  );
};
