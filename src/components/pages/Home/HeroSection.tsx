import { getImageUrl } from '../../../hooks/useMovies';
import type { Movie } from '../../../types/movie';
import { Link } from 'react-router-dom';
import { Button } from '../../common';

interface HeroSectionProps {
  movie: Movie;
}

export const HeroSection = ({ movie }: HeroSectionProps) => {
  return (
    <div className="relative h-screen w-full overflow-hidden rounded-lg md:rounded-2xl">
      {/* Background Image */}
      <img
        src={getImageUrl(movie.backdrop_path)}
        alt={movie.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative flex h-full flex-col items-start justify-center px-6 md:px-12 lg:px-20">
        <h1 className="max-w-2xl text-5xl md:text-6xl font-bold text-white mb-4">
          {movie.title}
        </h1>
        <p className="max-w-xl text-lg text-gray-300 mb-8 line-clamp-3">
          {movie.overview}
        </p>
        <div className="flex gap-4">
          <Link to={`/movie/${movie.id}`}>
            <Button>View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
