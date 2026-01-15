import { useEffect, useState } from 'react';
import { usePopularMovies, getTrendingMovies, getPopularMovies } from '../../../hooks/useMovies';
import { Container, Header, Footer } from '../../layout';
import { Loading, MovieCardSkeletonGrid } from '../../common';
import { HeroSection } from './HeroSection';
import { MoviesGrid } from './MoviesGrid';
import { MoviesCarousel } from './MoviesCarousel';
import type { Movie } from '../../../types/movie';

export const HomePage = () => {
  const { data: popularData, isLoading: isLoadingPopular } = usePopularMovies(1);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [newReleaseMovies, setNewReleaseMovies] = useState<Movie[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);

  useEffect(() => {
    getTrendingMovies(1).then((data) => {
      setTrendingMovies(data.results);
    });
  }, []);

  useEffect(() => {
    if (popularData?.results) {
      setNewReleaseMovies(popularData.results.slice(1, 16));
    }
  }, [popularData]);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const data = await getPopularMovies(nextPage);

      if (data && data.results) {
        // Get 5 movies (1 row) from the next page
        const additionalMovies = data.results.slice(0, 5);
        setNewReleaseMovies((prev) => [...prev, ...additionalMovies]);
        setCurrentPage(nextPage);

        // Check if there are more movies to load
        if (nextPage >= data.total_pages) {
          setHasMoreMovies(false);
        }
      }
    } catch (error) {
      console.error('Failed to load more movies:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (isLoadingPopular && !popularData) {
    return <Loading />;
  }

  const heroMovie = popularData?.results[0];

  return (
    <div className="min-h-screen bg-background-dark">
      <Header />

      <main className="relative">
        {/* Hero Section - Full width */}
        {heroMovie && <HeroSection movie={heroMovie} />}

        {/* Add responsive spacing for hero section */}
        <div className="h-[500px] sm:h-[600px] md:h-[700px] lg:h-[810px]" />

        <Container>
          {trendingMovies.length > 0 ? (
            <div className="py-8 sm:py-10 lg:py-12">
              <MoviesCarousel
                title="Trending Now"
                movies={trendingMovies.slice(0, 10)}
              />
            </div>
          ) : (
            <MovieCardSkeletonGrid />
          )}
        </Container>

        <Container>
          {newReleaseMovies.length > 0 ? (
            <div className="py-8 sm:py-12 md:py-16 lg:py-[80px]">
              <MoviesGrid
                title="New Release"
                movies={newReleaseMovies}
                onLoadMore={handleLoadMore}
                isLoadingMore={isLoadingMore}
                hasMore={hasMoreMovies}
              />
            </div>
          ) : (
            <MovieCardSkeletonGrid />
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
};
