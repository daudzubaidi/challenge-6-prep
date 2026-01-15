import { useRef, useEffect } from 'react';
import type { Movie } from '../../../types/movie';
import { MovieCard } from '../../common';

interface MoviesGridProps {
  title: string;
  movies: Movie[];
  onFavoriteToggle?: (movie: Movie) => void;
  favorites?: number[];
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  hasMore?: boolean;
}

export const MoviesGrid = ({
  title,
  movies,
  onFavoriteToggle,
  favorites = [],
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
    <section className="flex flex-col gap-[40px]">
      <h2 style={{ fontSize: '36px', fontWeight: 700, lineHeight: '48px', letterSpacing: '-0.02em' }} className="text-neutral-25">{title}</h2>

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

        {/* Load More Button - Centered in grid (spans all 5 columns) */}
        {hasMore && (
          <div ref={loadMoreRef} className="col-span-5 flex justify-center">
            <button
              onClick={onLoadMore}
              disabled={isLoadingMore}
              className="backdrop-blur-[20px] bg-[rgba(10,13,18,0.6)] border border-[#181d27] text-neutral-25 h-[52px] px-8 rounded-full font-semibold text-text-md leading-[30px] hover:bg-[rgba(10,13,18,0.7)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingMore ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
