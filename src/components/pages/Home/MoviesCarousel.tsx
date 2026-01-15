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

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400;
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    setTimeout(() => checkScroll(), 300);
  };

  return (
    <section className="flex flex-col gap-10">
      <h2 style={{ fontSize: '36px', fontWeight: 700, lineHeight: '48px', letterSpacing: '-0.02em' }} className="text-neutral-25">{title}</h2>

      <div className="relative">
        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-[20px] overflow-x-auto scroll-smooth"
          style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none' }}
          onScroll={checkScroll}
        >
          {movies.map((movie, index) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="flex-shrink-0 w-[216px] group cursor-pointer"
            >
              <div className="relative h-[321px] rounded-[12px] overflow-hidden bg-gray-900">
                {/* Movie Poster */}
                <img
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Number Badge */}
                <div className="absolute top-[12px] left-[12px] w-[48px] h-[48px] rounded-full backdrop-blur-[20px] bg-[rgba(10,13,18,0.6)] flex items-center justify-center text-white font-semibold text-text-lg">
                  {index + 1}
                </div>

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Info */}
              <div className="flex flex-col gap-[2px] mt-[12px]">
                <h3 className="text-text-lg font-semibold text-neutral-25 line-clamp-2">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-[4px]">
                  <Star className="w-[16.667px] h-[16.667px] fill-yellow-400 text-yellow-400 flex-shrink-0" />
                  <span className="text-text-md font-regular text-neutral-400">
                    {movie.vote_average.toFixed(1)}/10
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Navigation Arrows */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-[10px] top-1/2 -translate-y-1/2 z-10 backdrop-blur-[20px] bg-[rgba(10,13,18,0.6)] border border-[#181d27] text-white h-[56px] w-[56px] rounded-full flex items-center justify-center hover:bg-[rgba(10,13,18,0.7)] transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-[32.667px] h-[32.667px]" />
          </button>
        )}
      </div>
    </section>
  );
};
