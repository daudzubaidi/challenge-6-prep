import { useState } from 'react';
import { Heart } from 'lucide-react';
import { getImageUrl } from '../../hooks/useMovies';
import type { Movie } from '../../types/movie';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
  onFavoriteToggle?: (movie: Movie) => void;
  isFavorite?: boolean;
}

export const MovieCard = ({ movie, onFavoriteToggle, isFavorite = false }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [localFavorite, setLocalFavorite] = useState(isFavorite);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocalFavorite(!localFavorite);
    if (onFavoriteToggle) {
      onFavoriteToggle(movie);
    }
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative overflow-hidden rounded-lg bg-gray-900 transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={getImageUrl(movie.poster_path)}
        alt={movie.title}
        className="h-full w-full object-cover"
      />

      {/* Overlay on Hover */}
      {isHovered && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black bg-opacity-80 p-4">
          <h3 className="line-clamp-2 text-center text-lg font-semibold text-white">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-300">
            Rating: {movie.vote_average.toFixed(1)}/10
          </p>
          <button
            onClick={handleFavoriteClick}
            className="rounded-full bg-red-600 p-2 hover:bg-red-700 transition-colors"
            aria-label={localFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className="h-6 w-6 text-white"
              fill={localFavorite ? 'currentColor' : 'none'}
            />
          </button>
        </div>
      )}
    </Link>
  );
};
