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
    <section className="flex flex-col gap-[40px]">
      <h2 className="text-display-lg font-bold text-neutral-25 leading-[48px] tracking-[-0.72px]">{title}</h2>

      {/* Grid with 5 columns */}
      <div className="grid grid-cols-5 gap-[20px]">
        {/* Movie Cards */}
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={favorites.includes(movie.id)}
          />
        ))}
      </div>

      {/* Load More Button - Centered below grid */}
      <div className="flex justify-center">
        <button className="backdrop-blur-[20px] bg-[rgba(10,13,18,0.6)] border border-[#181d27] text-neutral-25 h-[52px] px-8 rounded-full font-semibold text-text-md leading-[30px] hover:bg-[rgba(10,13,18,0.7)] transition-colors">
          Load More
        </button>
      </div>
    </section>
  );
};
