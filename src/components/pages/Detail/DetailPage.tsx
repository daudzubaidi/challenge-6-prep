import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetails, getImageUrl } from '../../../hooks/useMovies';
import { Header, Footer, Container } from '../../layout';
import { Loading, EmptyState, Toast } from '../../common';
import { Heart, ArrowLeft, Play, Calendar, Star } from 'lucide-react';
import { AgeLimitIcon, GenreIcon } from '../../common';
import { useState, useEffect } from 'react';

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: movie, isLoading } = useMovieDetails(Number(id));
  const [isFavorite, setIsFavorite] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

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

    const isAlreadyFavorite = favorites.includes(movie.id);
    const newFavorites = isAlreadyFavorite
      ? favorites.filter((id) => id !== movie.id)
      : [...favorites, movie.id];

    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isAlreadyFavorite);

    // Show toast only when adding to favorites
    if (!isAlreadyFavorite) {
      setToastVisible(true);
    }
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
      <Toast
        message="Success Add to Favorites"
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />

      <main>
        {/* Hero Section with Backdrop */}
        <div className="relative h-[500px] w-full overflow-hidden">
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

        {/* Content Section - Overlaps backdrop */}
        <Container className="relative -mt-32 z-10">
          <div className="flex gap-8">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="h-80 w-56 rounded-2xl object-cover shadow-2xl"
              />
            </div>

            {/* Content - Title, Date, Buttons, Stats */}
            <div className="flex-1">
              {/* Title */}
              <h1 style={{ fontSize: '48px', fontWeight: 700, lineHeight: '60px', letterSpacing: '-0.96px' }} className="text-white mb-4">
                {movie.title}
              </h1>

              {/* Release Date */}
              {movie.release_date && (
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="h-5 w-5 text-white" />
                  <span className="text-white text-sm">
                    {new Date(movie.release_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8 items-center">
                {trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 rounded-full transition-colors flex items-center gap-2 h-12"
                  >
                    <Play size={24} fill="currentColor" />
                    Watch Trailer
                  </a>
                )}

                <button
                  onClick={handleFavoriteToggle}
                  className="bg-gray-800/80 hover:bg-gray-700 text-white rounded-full transition-colors flex items-center justify-center h-12 w-12 flex-shrink-0"
                >
                  <Heart
                    size={24}
                    className={isFavorite ? 'fill-current text-red-500' : ''}
                  />
                </button>
              </div>

              {/* Stat Cards - Horizontal Row */}
              <div className="flex gap-5 mt-12">
                {/* Rating Card */}
                <div style={{ width: '276px', height: '146px' }} className="bg-black border border-[#252B37] rounded-[16px] p-5 flex flex-col items-center justify-center gap-2">
                  <Star size={32} className="text-[#E4A802] fill-[#E4A802]" />
                  <div className="flex flex-col items-center gap-0.5">
                    <span style={{ fontSize: '16px', fontWeight: 400 }} className="text-[#D5D7DA]">Rating</span>
                    <span style={{ fontSize: '20px', fontWeight: 600 }} className="text-[#FDFDFD]">
                      {movie.vote_average.toFixed(1)}/10
                    </span>
                  </div>
                </div>

                {/* Genre Card */}
                <div style={{ width: '276px', height: '146px' }} className="bg-black border border-[#252B37] rounded-[16px] p-5 flex flex-col items-center justify-center gap-2">
                  <GenreIcon />
                  <div className="flex flex-col items-center gap-0.5">
                    <span style={{ fontSize: '16px', fontWeight: 400 }} className="text-[#D5D7DA]">Genre</span>
                    <span style={{ fontSize: '20px', fontWeight: 600 }} className="text-[#FDFDFD]">
                      {primaryGenre}
                    </span>
                  </div>
                </div>

                {/* Age Limit Card */}
                <div style={{ width: '276px', height: '146px' }} className="bg-black border border-[#252B37] rounded-[16px] p-5 flex flex-col items-center justify-center gap-2">
                  <AgeLimitIcon />
                  <div className="flex flex-col items-center gap-0.5">
                    <span style={{ fontSize: '16px', fontWeight: 400 }} className="text-[#D5D7DA]">Age Limit</span>
                    <span style={{ fontSize: '20px', fontWeight: 600 }} className="text-[#FDFDFD]">
                      13
                    </span>
                  </div>
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
