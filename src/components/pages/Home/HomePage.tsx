import { useEffect, useState } from 'react';
import { usePopularMovies, getTrendingMovies } from '../../../hooks/useMovies';
import { Container, Header, Footer } from '../../layout';
import { Loading, MovieCardSkeletonGrid } from '../../common';
import { HeroSection } from './HeroSection';
import { MoviesGrid } from './MoviesGrid';
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
  const featuredMovies = popularData?.results.slice(1, 9) || [];

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main>
        <Container className="py-8">
          {heroMovie && <HeroSection movie={heroMovie} />}
        </Container>

        <Container className="py-12">
          {featuredMovies.length > 0 ? (
            <MoviesGrid
              title="Featured Movies"
              movies={featuredMovies}
              onFavoriteToggle={handleFavoriteToggle}
              favorites={favorites}
            />
          ) : (
            <MovieCardSkeletonGrid />
          )}
        </Container>

        <Container className="py-12">
          {trendingMovies.length > 0 ? (
            <MoviesGrid
              title="Trending Now"
              movies={trendingMovies}
              onFavoriteToggle={handleFavoriteToggle}
              favorites={favorites}
            />
          ) : (
            <MovieCardSkeletonGrid />
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
};
