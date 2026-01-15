import { useEffect, useState } from 'react';
import { usePopularMovies, getTrendingMovies } from '../../../hooks/useMovies';
import { Container, Header, Footer } from '../../layout';
import { Loading, MovieCardSkeletonGrid } from '../../common';
import { HeroSection } from './HeroSection';
import { MoviesGrid } from './MoviesGrid';
import { MoviesCarousel } from './MoviesCarousel';
import type { Movie } from '../../../types/movie';

export const HomePage = () => {
  const { data: popularData, isLoading: isLoadingPopular } = usePopularMovies(1);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    getTrendingMovies(1).then((data) => {
      setTrendingMovies(data.results);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleFavoriteToggle = (movie: Movie) => {
    setFavorites((prev) =>
      prev.includes(movie.id)
        ? prev.filter((id) => id !== movie.id)
        : [...prev, movie.id]
    );
  };

  if (isLoadingPopular && !popularData) {
    return <Loading />;
  }

  const heroMovie = popularData?.results[0];
  const newReleaseMovies = popularData?.results.slice(1, 11) || [];

  return (
    <div className="min-h-screen bg-background-dark">
      <Header />

      <main className="relative">
        {/* Hero Section - Full width */}
        {heroMovie && <HeroSection movie={heroMovie} />}

        {/* Add spacing for hero section */}
        <div className="h-[810px]" />

        <Container>
          {trendingMovies.length > 0 ? (
            <div className="py-[80px]">
              <MoviesCarousel
                title="Trending Now"
                movies={trendingMovies.slice(0, 5)}
              />
            </div>
          ) : (
            <MovieCardSkeletonGrid />
          )}
        </Container>

        <Container>
          {newReleaseMovies.length > 0 ? (
            <div className="py-[80px]">
              <MoviesGrid
                title="New Release"
                movies={newReleaseMovies}
                onFavoriteToggle={handleFavoriteToggle}
                favorites={favorites}
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
