import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetails, getImageUrl } from '../../../hooks/useMovies';
import { Header, Footer, Container } from '../../layout';
import { Loading, EmptyState } from '../../common';
import { Heart, ArrowLeft, Play, Calendar, Star, Film, Smile } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: movie, isLoading } = useMovieDetails(Number(id));
  const [isFavorite, setIsFavorite] = useState(false);

  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (movie) {
      setIsFavorite(favorites.includes(movie.id));
    }
  }, [movie, favorites]);

  const handleFavoriteToggle = () => {
    if (!movie) return;

    const newFavorites = isFavorite
      ? favorites.filter((id) => id !== movie.id)
      : [...favorites, movie.id];

    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);

    toast.success(
      isFavorite ? 'Removed from favorites' : 'Added to favorites'
    );
  };

  if (isLoading) return <Loading />;
  if (!movie) {
    return (
      <div className="min-h-screen bg-background-dark">
        <Header />
        <Container>
          <EmptyState title="Movie not found" />
        </Container>
        <Footer />
      </div>
    );
  }

  const trailer = movie.videos?.results?.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  );

  const cast = movie.credits?.cast?.slice(0, 5) || [];
  const primaryGenre = movie.genres?.[0]?.name || 'N/A';

  return (
    <div className="min-h-screen bg-background-dark">
      <Header />

      <main>
        {/* Hero Section with Backdrop */}
        <div className="relative h-[810px] w-full overflow-hidden">
          <img
            src={getImageUrl(movie.backdrop_path)}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-20 left-16 z-10 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        <Container className="relative -mt-32 z-10">
          <div className="flex gap-8">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="h-96 w-64 rounded-2xl object-cover shadow-2xl"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Title */}
              <h1 className="text-display-2xl font-bold text-white mb-6 tracking-[-0.02em]">
                {movie.title}
              </h1>

              {/* Release Date */}
              {movie.release_date && (
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="h-6 w-6 text-white" />
                  <span className="text-white">
                    {new Date(movie.release_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8">
                {trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition-colors flex items-center gap-2"
                  >
                    <Play size={24} fill="currentColor" />
                    Watch Trailer
                  </a>
                )}

                <button
                  onClick={handleFavoriteToggle}
                  className="bg-gray-800/80 hover:bg-gray-700 text-white p-3 rounded-full transition-colors"
                >
                  <Heart
                    size={24}
                    className={isFavorite ? 'fill-current text-red-500' : ''}
                  />
                </button>
              </div>

              {/* Stats Cards */}
              <div className="flex gap-6 mb-8">
                {/* Rating */}
                <div className="bg-black border border-gray-800/50 rounded-2xl p-5 flex flex-col items-center justify-center min-w-max">
                  <Star className="h-11 w-11 text-yellow-400 fill-yellow-400 mb-2" />
                  <span className="text-sm text-gray-400 mb-1">Rating</span>
                  <span className="text-xl font-semibold text-white">
                    {movie.vote_average.toFixed(1)}/10
                  </span>
                </div>

                {/* Genre */}
                <div className="bg-black border border-gray-800/50 rounded-2xl p-5 flex flex-col items-center justify-center min-w-max">
                  <Film className="h-11 w-11 text-white mb-2" />
                  <span className="text-sm text-gray-400 mb-1">Genre</span>
                  <span className="text-xl font-semibold text-white">
                    {primaryGenre}
                  </span>
                </div>

                {/* Age Limit */}
                <div className="bg-black border border-gray-800/50 rounded-2xl p-5 flex flex-col items-center justify-center min-w-max">
                  <Smile className="h-11 w-11 text-white mb-2" />
                  <span className="text-sm text-gray-400 mb-1">Age Limit</span>
                  <span className="text-xl font-semibold text-white">
                    13
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Overview Section */}
          <div className="mt-16 mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Overview</h2>
            <p className="text-gray-400 leading-relaxed text-base">
              {movie.overview}
            </p>
          </div>

          {/* Cast & Crew Section */}
          {cast.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8">Cast & Crew</h2>
              <div className="flex gap-10 overflow-x-auto pb-4">
                {cast.map((actor) => (
                  <div key={actor.id} className="flex-shrink-0 w-80">
                    <div className="flex gap-4">
                      {actor.profile_path ? (
                        <img
                          src={getImageUrl(actor.profile_path)}
                          alt={actor.name}
                          className="h-26 w-20 rounded-lg object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="h-26 w-20 rounded-lg bg-gray-800 flex-shrink-0" />
                      )}
                      <div className="flex flex-col justify-center">
                        <p className="text-white font-semibold">
                          {actor.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {actor.character}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
};
