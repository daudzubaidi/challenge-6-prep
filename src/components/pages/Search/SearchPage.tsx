import { useState } from 'react';
import { useSearchMovies } from '../../../hooks/useMovies';
import { Header, Footer, Container } from '../../layout';
import { MovieCard, SearchInput, EmptyState, MovieCardSkeletonGrid } from '../../common';
import type { Movie } from '../../../types/movie';

export const SearchPage = () => {
  const [query, setQuery] = useState('');
  const { data: searchResults, isLoading } = useSearchMovies(query);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const handleFavoriteToggle = (movie: Movie) => {
    setFavorites((prev) =>
      prev.includes(movie.id)
        ? prev.filter((id) => id !== movie.id)
        : [...prev, movie.id]
    );
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main>
        <Container className="py-12">
          <h1 className="mb-8 text-4xl font-bold text-white">Search Movies</h1>

          <div className="mb-12 flex justify-center md:justify-start">
            <SearchInput onSearch={handleSearch} />
          </div>

          {!query ? (
            <EmptyState
              icon="🔍"
              title="Start searching"
              description="Enter a movie title to discover amazing films"
            />
          ) : isLoading ? (
            <MovieCardSkeletonGrid />
          ) : searchResults && searchResults.results.length > 0 ? (
            <>
              <div className="mb-4 text-gray-400">
                Found {searchResults.total_results} results for "{query}"
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {searchResults.results.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    isFavorite={favorites.includes(movie.id)}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              icon="😔"
              title="No results found"
              description={`No movies found for "${query}". Try a different search term.`}
            />
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
};
