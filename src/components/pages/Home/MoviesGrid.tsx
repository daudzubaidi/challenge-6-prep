import { useRef, useEffect } from 'react';
import type { Movie } from '../../../types/movie';
import { MovieCard } from '../../common';

interface MoviesGridProps {
  title: string;
  movies: Movie[];
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  hasMore?: boolean;
}

export const MoviesGrid = ({
  title,
  movies,
  onLoadMore,
  isLoadingMore = false,
  hasMore = true,
}: MoviesGridProps) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (!hasMore || !onLoadMore || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Jika Load More button terlihat di viewport, auto trigger load more
        // Dengan delay agar user bisa melihat loading state
        if (entries[0].isIntersecting && !hasTriggeredRef.current && !isLoadingMore) {
          hasTriggeredRef.current = true;

          // Delay 500ms sebelum trigger agar user punya waktu melihat
          setTimeout(() => {
            onLoadMore();
          }, 500);
        }
      },
      {
        threshold: 0.5, // Trigger saat 50% elemen terlihat (lebih lambat dari sebelumnya)
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, onLoadMore, isLoadingMore]);

  // Reset trigger flag saat movies berubah (data baru loaded)
  useEffect(() => {
    hasTriggeredRef.current = false;
  }, [movies.length]);

  return (
    <section className="flex flex-col gap-6 sm:gap-8 lg:gap-[40px]">
      <h2 className="text-neutral-25 text-2xl sm:text-3xl lg:text-[36px] font-bold leading-tight lg:leading-[48px] tracking-tight">{title}</h2>

      {/* Responsive Grid: 2 cols mobile, 3 cols sm, 4 cols md, 5 cols lg+ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-[20px]">
        {/* Movie Cards */}
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}

        {/* Load More Button - Centered in grid (spans full width) */}
        {hasMore && (
          <div ref={loadMoreRef} className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 flex justify-center pt-4 sm:pt-6">
            <button
              onClick={onLoadMore}
              disabled={isLoadingMore}
              className="backdrop-blur-[20px] bg-[rgba(10,13,18,0.6)] border border-[#181d27] text-neutral-25 h-11 sm:h-[52px] px-6 sm:px-8 rounded-full font-semibold text-sm sm:text-text-md leading-[30px] hover:bg-[rgba(10,13,18,0.7)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingMore ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
