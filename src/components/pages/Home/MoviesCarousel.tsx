import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { getImageUrl } from '../../../hooks/useMovies';
import type { Movie } from '../../../types/movie';
import { Link } from 'react-router-dom';

interface MoviesCarouselProps {
  title: string;
  movies: Movie[];
}

export const MoviesCarousel = ({
  title,
  movies,
}: MoviesCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  }, []);

  useEffect(() => {
    // Delay untuk memastikan DOM sudah render sepenuhnya
    const timer = setTimeout(() => {
      checkScroll();
    }, 100);
    return () => clearTimeout(timer);
  }, [movies, checkScroll]);

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    setTimeout(() => checkScroll(), 300);
  };

  return (
    <section className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
      <h2 className="text-2xl sm:text-3xl lg:text-[36px] leading-tight lg:leading-[48px] tracking-[-0.02em] font-bold text-[#FDFDFD]">
        {title}
      </h2>

      <div className="relative">
        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 sm:gap-4 lg:gap-[20px] overflow-x-auto scroll-smooth no-scrollbar"
          onScroll={checkScroll}
        >
          {movies.map((movie, index) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="flex-shrink-0 w-[140px] sm:w-[180px] lg:w-[216px] group cursor-pointer"
            >
              <div className="relative aspect-[2/3] rounded-lg sm:rounded-[12px] overflow-hidden bg-gray-900">
                {/* Movie Poster */}
                <img
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Number Badge */}
                <div className="absolute top-2 left-2 sm:top-[12px] sm:left-[12px] w-8 h-8 sm:w-10 sm:h-10 lg:w-[48px] lg:h-[48px] rounded-full backdrop-blur-[20px] bg-[rgba(10,13,18,0.6)] flex items-center justify-center text-white font-semibold text-sm sm:text-base lg:text-text-lg">
                  {index + 1}
                </div>

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Info */}
              <div className="flex flex-col gap-[2px] mt-2 sm:mt-[12px]">
                <h3 className="text-sm sm:text-base lg:text-text-lg font-semibold text-[#FDFDFD] line-clamp-2">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 sm:w-[16.667px] sm:h-[16.667px] fill-yellow-400 text-yellow-400 flex-shrink-0" />
                  <span className="text-xs sm:text-text-md font-regular text-[#A4A7AE]">
                    {movie.vote_average.toFixed(1)}/10
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Navigation Arrows - Hidden on mobile */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="hidden sm:flex absolute right-[10px] top-1/2 -translate-y-1/2 z-10 backdrop-blur-[20px] bg-[rgba(10,13,18,0.6)] border border-[#181d27] text-white h-10 w-10 lg:h-[56px] lg:w-[56px] rounded-full items-center justify-center hover:bg-[rgba(10,13,18,0.7)] transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 lg:w-[32.667px] lg:h-[32.667px]" />
          </button>
        )}
      </div>
    </section>
  );
};
