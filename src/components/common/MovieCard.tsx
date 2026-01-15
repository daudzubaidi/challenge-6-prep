import { Star } from 'lucide-react';
import { getImageUrl } from '../../hooks/useMovies';
import type { Movie } from '../../types/movie';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative flex flex-col gap-2 sm:gap-3 bg-base-black text-neutral-25 transition-transform duration-300 hover:scale-105"
    >
      {/* Movie Poster Image - Responsive with aspect ratio */}
      <div className="w-full aspect-[2/3] rounded-lg sm:rounded-[12px] overflow-hidden">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Movie Info */}
      <div className="flex flex-col gap-[2px]">
        <h3 className="text-sm sm:text-text-lg font-semibold text-[#FDFDFD] line-clamp-2">
          {movie.title}
        </h3>

        {/* Rating with Star */}
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 sm:h-[16.667px] sm:w-[16.667px] text-yellow-500 fill-yellow-500 flex-shrink-0" />
          <p className="text-xs sm:text-text-md font-regular text-[#A4A7AE]">
            {movie.vote_average.toFixed(1)}/10
          </p>
        </div>
      </div>
    </Link>
  );
};
