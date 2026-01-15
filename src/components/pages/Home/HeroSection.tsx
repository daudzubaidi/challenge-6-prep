import { getImageUrl } from '../../../hooks/useMovies';
import type { Movie } from '../../../types/movie';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

interface HeroSectionProps {
  movie: Movie;
}

export const HeroSection = ({ movie }: HeroSectionProps) => {
  return (
    <div className="absolute h-[810px] left-0 top-0 w-full">
      {/* Background Image */}
      <img
        src={getImageUrl(movie.backdrop_path)}
        alt={movie.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient Overlay - from transparent at top to black at bottom */}
      <div className="absolute bg-gradient-to-b from-transparent to-black h-[810px] left-0 top-0 w-full" />

      {/* Content Container */}
      <div className="absolute flex flex-col gap-12 items-start left-[140px] top-[298px] w-[635px]">
        {/* Text Content */}
        <div className="flex flex-col gap-4 w-full">
          <h1 style={{ fontSize: '56px', fontWeight: 700, lineHeight: '72px', letterSpacing: '-0.96px' }} className="text-neutral-25">
            {movie.title}
          </h1>
          <p className="text-text-md font-regular text-neutral-400 leading-[30px] line-clamp-3">
            {movie.overview}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          {/* Primary Button - Watch Trailer */}
          <Link to={`/movie/${movie.id}`}>
            <button className="bg-[#961200] text-[#fdfdfd] h-[52px] w-[230px] rounded-full flex items-center justify-center gap-2 p-[8px] font-semibold text-text-md leading-[30px] hover:bg-[#a81500] transition-colors">
              Watch Trailer
              <Play className="h-6 w-6 flex-shrink-0" fill="currentColor" />
            </button>
          </Link>
          {/* Secondary Button - See Detail */}
          <Link to={`/movie/${movie.id}`}>
            <button className="backdrop-blur-[20px] bg-[rgba(10,13,18,0.6)] border border-[#181d27] text-[#fdfdfd] h-[52px] w-[230px] rounded-full flex items-center justify-center gap-2 p-[8px] font-semibold text-text-md leading-[30px] hover:bg-[rgba(10,13,18,0.7)] transition-colors">
              See Detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
