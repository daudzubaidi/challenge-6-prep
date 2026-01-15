import { useEffect, useState } from 'react';
import { Header, Footer, Container } from '../../layout';
import { MovieCardSkeletonGrid, FilmClapperIcon } from '../../common';
import { Heart, Play, Star } from 'lucide-react';
import { getImageUrl } from '../../../hooks/useMovies';
import { Link } from 'react-router-dom';
import type { Movie } from '../../../types/movie';
import { api } from '../../../lib/api';

export const FavoritesPage = () => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      if (favoriteIds.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        const moviePromises = favoriteIds.map((id) =>
          api.get<Movie>(`/movie/${id}`, {
            params: { api_key: import.meta.env.VITE_API_KEY },
          })
        );

        const responses = await Promise.all(moviePromises);
        const fetchedMovies = responses.map((res) => res.data);
        setMovies(fetchedMovies);
      } catch (error) {
        console.error('Failed to fetch favorite movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, [favoriteIds]);

  const handleFavoriteToggle = (movie: Movie) => {
    const newFavorites = favoriteIds.filter((id) => id !== movie.id);
    setFavoriteIds(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setMovies((prev) => prev.filter((m) => m.id !== movie.id));
  };

  if (isLoading && favoriteIds.length > 0) {
    return (
      <div className="min-h-screen bg-background-dark">
        <Header />
        <Container>
          <div className="py-20">
            <MovieCardSkeletonGrid />
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-dark">
      <Header />

      <main className="flex-1 pt-16 md:pt-[90px] relative">
        {movies.length === 0 ? (
          <>
            {/* Empty State - Mobile */}
            <div className="md:hidden px-4 pt-6 pb-10">
              <h1 className="text-[24px] leading-[36px] font-bold text-[#FDFDFD] mb-8">
                Favorites
              </h1>
              <div className="flex flex-col items-center gap-6 mt-16">
                <div className="flex flex-col items-center gap-3">
                  <FilmClapperIcon />
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h2 className="text-[16px] leading-[30px] font-semibold text-white">
                      Data Empty
                    </h2>
                    <p className="text-[14px] leading-[28px] font-normal text-[#A4A7AE]">
                      You don't have a favorite movie yet
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => (window.location.href = '/')}
                  className="w-[200px] h-[44px] bg-[#961200] rounded-full flex items-center justify-center gap-2 cursor-pointer hover:bg-[#a81500] transition-colors"
                >
                  <span className="text-[14px] leading-[28px] font-semibold text-[#FDFDFD]">
                    Explore Movie
                  </span>
                </button>
              </div>
            </div>

            {/* Empty State - Desktop */}
            <div className="hidden md:block">
              <div className="absolute top-[154px] left-[140px]">
                <h1 className="text-[36px] leading-[48px] tracking-[-0.02em] font-bold text-[#FDFDFD]">
                  Favorites
                </h1>
              </div>
              <div className="absolute top-[306px] left-1/2 -translate-x-1/2 w-[300px] flex flex-col items-center gap-[24px]">
                <div className="flex flex-col items-center gap-[16px] w-[246px]">
                  <FilmClapperIcon />
                  <div className="flex flex-col items-center gap-[8px] w-[246px]">
                    <h2 className="text-[16px] leading-[30px] font-semibold text-white text-center w-[246px]">
                      Data Empty
                    </h2>
                    <p className="text-[14px] leading-[28px] font-normal text-[#A4A7AE] text-center w-[246px]">
                      You don't have a favorite movie yet
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => (window.location.href = '/')}
                  className="w-[300px] h-[52px] bg-[#961200] rounded-full flex items-center justify-center gap-[8px] cursor-pointer hover:bg-[#a81500] transition-colors"
                >
                  <span className="text-[16px] leading-[30px] font-semibold text-[#FDFDFD]">
                    Explore Movie
                  </span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Filled State - Mobile */}
            <div className="md:hidden px-4 pt-6 pb-10">
              <h1 className="text-[24px] leading-[36px] font-bold text-[#FDFDFD] mb-8">
                Favorites
              </h1>
              <div className="flex flex-col gap-8">
                {movies.map((movie, index) => (
                  <div key={movie.id}>
                    {/* Favorite Item - Mobile */}
                    <div className="flex flex-col gap-6">
                      {/* Poster + Info Row */}
                      <div className="flex gap-4">
                        {/* Poster */}
                        <div className="h-[156px] w-[104px] rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={getImageUrl(movie.poster_path)}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                          <h2 className="text-[16px] leading-[30px] font-bold text-[#FDFDFD]">
                            {movie.title}
                          </h2>

                          {/* Rating */}
                          <div className="flex items-center gap-1">
                            <Star className="h-[18px] w-[18px] text-yellow-500 fill-yellow-500 flex-shrink-0" />
                            <p className="text-[14px] leading-[28px] font-medium text-[#FDFDFD]">
                              {movie.vote_average.toFixed(1)}/10
                            </p>
                          </div>

                          {/* Description */}
                          <p className="text-[14px] leading-[28px] font-normal text-[#A4A7AE] line-clamp-3 overflow-hidden">
                            {movie.overview}
                          </p>
                        </div>
                      </div>

                      {/* Buttons Row */}
                      <div className="flex gap-4 items-center">
                        {/* Watch Trailer Button */}
                        <Link to={`/movie/${movie.id}`} className="flex-1">
                          <button className="w-full bg-[#961200] text-[#FDFDFD] h-[44px] rounded-full flex items-center justify-center gap-2 p-2 font-semibold text-[14px] leading-[28px] hover:bg-[#a81500] transition-colors">
                            Watch Trailer
                            <Play className="h-[18px] w-[18px] flex-shrink-0" fill="currentColor" />
                          </button>
                        </Link>

                        {/* Heart Button */}
                        <button
                          onClick={() => handleFavoriteToggle(movie)}
                          className="backdrop-blur-[16px] bg-[rgba(10,13,18,0.6)] border border-[#181d27] text-[#FDFDFD] h-[44px] w-[44px] rounded-full flex items-center justify-center flex-shrink-0 hover:bg-[rgba(10,13,18,0.7)] transition-colors"
                          aria-label="Remove from favorites"
                        >
                          <Heart className="h-6 w-6 fill-current" />
                        </button>
                      </div>
                    </div>

                    {/* Divider */}
                    {index < movies.length - 1 && (
                      <div className="border-t border-[#252B37] mt-8" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Filled State - Desktop */}
            <div className="hidden md:block">
              <div className="absolute top-[154px] left-[140px]">
                <h1 className="text-[36px] leading-[48px] tracking-[-0.02em] font-bold text-[#FDFDFD]">
                  Favorites
                </h1>
              </div>
              <Container>
                <div className="flex flex-col gap-12 py-12 pt-24">
                  <div className="flex flex-col gap-0">
                    {movies.map((movie, index) => (
                      <div key={movie.id}>
                        {/* Favorite Item */}
                        <div className="flex items-start justify-between gap-6 py-12">
                          {/* Left: Poster + Info */}
                          <div className="flex gap-6 flex-1">
                            {/* Poster */}
                            <div className="h-[270px] w-[182px] rounded-xl overflow-hidden flex-shrink-0">
                              <img
                                src={getImageUrl(movie.poster_path)}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Info */}
                            <div className="flex flex-col gap-6 flex-1">
                              {/* Title + Rating */}
                              <div className="flex flex-col gap-3">
                                <h2 className="text-display-xs font-bold text-neutral-25 leading-[36px]">
                                  {movie.title}
                                </h2>

                                {/* Rating */}
                                <div className="flex items-center gap-1">
                                  <Star className="h-6 w-6 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                                  <p className="text-text-lg font-medium text-neutral-25">
                                    {movie.vote_average.toFixed(1)}/10
                                  </p>
                                </div>
                              </div>

                              {/* Description */}
                              <p className="text-text-md font-regular text-neutral-400 line-clamp-3">
                                {movie.overview}
                              </p>

                              {/* Watch Trailer Button */}
                              <Link to={`/movie/${movie.id}`}>
                                <button className="bg-[#961200] text-[#fdfdfd] h-[52px] w-[200px] rounded-full flex items-center justify-center gap-2 p-[8px] font-semibold text-text-md leading-[30px] hover:bg-[#a81500] transition-colors">
                                  Watch Trailer
                                  <Play className="h-6 w-6 flex-shrink-0" fill="currentColor" />
                                </button>
                              </Link>
                            </div>
                          </div>

                          {/* Right: Heart Button */}
                          <button
                            onClick={() => handleFavoriteToggle(movie)}
                            className="backdrop-blur-[20px] bg-[rgba(10,13,18,0.6)] border border-[#181d27] text-[#fdfdfd] h-[56px] w-[56px] rounded-full flex items-center justify-center flex-shrink-0 hover:bg-[rgba(10,13,18,0.7)] transition-colors"
                            aria-label="Remove from favorites"
                          >
                            <Heart className="h-6 w-6 fill-current" />
                          </button>
                        </div>

                        {/* Divider */}
                        {index < movies.length - 1 && (
                          <div className="border-t border-neutral-800" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Container>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};
