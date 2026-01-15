import { Star } from 'lucide-react';
import { getImageUrl } from '../../hooks/useMovies';
import type { Movie } from '../../types/movie';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
  onFavoriteToggle?: (movie: Movie) => void;
  isFavorite?: boolean;
}

export const MovieCard = ({ movie }: MovieCardProps) => {

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative flex flex-col gap-3 bg-base-black transition-transform duration-300 hover:scale-105"
    >
      {/* Movie Poster Image */}
      <div className="h-[321px] w-[216px] rounded-[12px] overflow-hidden">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Movie Info */}
      <div className="flex flex-col gap-[2px]">
        <h3 className="text-text-lg font-semibold text-neutral-25 line-clamp-2">
          {movie.title}
        </h3>

        {/* Rating with Star */}
        <div className="flex items-center gap-[4px]">
          <Star className="h-[16.667px] w-[16.667px] text-yellow-500 fill-yellow-500 flex-shrink-0" />
          <p className="text-text-md font-regular text-neutral-400">
            {movie.vote_average.toFixed(1)}/10
          </p>
        </div>
      </div>
    </Link>
  );
};
