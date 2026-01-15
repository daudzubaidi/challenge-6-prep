import { getImageUrl } from '../../../hooks/useMovies';
import type { Movie } from '../../../types/movie';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

interface HeroSectionProps {
  movie: Movie;
}

export const HeroSection = ({ movie }: HeroSectionProps) => {
  return (
    <div className="absolute h-[500px] sm:h-[600px] md:h-[700px] lg:h-[810px] left-0 top-0 w-full">
      {/* Background Image */}
      <img
        src={getImageUrl(movie.backdrop_path)}
        alt={movie.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient Overlay - from transparent at top to black at bottom */}
      <div className="absolute bg-gradient-to-b from-transparent to-black h-full left-0 top-0 w-full" />

      {/* Content Container - Responsive positioning */}
      <div className="absolute flex flex-col gap-6 md:gap-8 lg:gap-12 items-start px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[140px] top-[180px] sm:top-[220px] md:top-[260px] lg:top-[298px] w-full max-w-full lg:max-w-[635px]">
        {/* Text Content */}
        <div className="flex flex-col gap-3 md:gap-4 w-full">
          <h1 className="text-neutral-25 text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold leading-tight lg:leading-[60px] tracking-tight">
            {movie.title}
          </h1>
          <p className="text-sm sm:text-base md:text-text-md font-normal text-neutral-400 leading-relaxed md:leading-[30px] line-clamp-2 sm:line-clamp-3">
            {movie.overview}
          </p>
        </div>

        {/* Buttons - Stack on mobile, side by side on sm+ */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          {/* Primary Button - Watch Trailer */}
          <Link to={`/movie/${movie.id}`} className="w-full sm:w-auto">
            <button className="bg-[#961200] text-[#fdfdfd] h-[48px] sm:h-[52px] w-full sm:w-[200px] md:w-[230px] rounded-full flex items-center justify-center gap-2 px-4 font-semibold text-sm sm:text-text-md leading-[30px] hover:bg-[#a81500] transition-colors">
              Watch Trailer
              <Play className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" fill="currentColor" />
            </button>
          </Link>
          {/* Secondary Button - See Detail */}
          <Link to={`/movie/${movie.id}`} className="w-full sm:w-auto">
            <button className="backdrop-blur-[20px] bg-[rgba(10,13,18,0.6)] border border-[#181d27] text-[#fdfdfd] h-[48px] sm:h-[52px] w-full sm:w-[200px] md:w-[230px] rounded-full flex items-center justify-center gap-2 px-4 font-semibold text-sm sm:text-text-md leading-[30px] hover:bg-[rgba(10,13,18,0.7)] transition-colors">
              See Detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
