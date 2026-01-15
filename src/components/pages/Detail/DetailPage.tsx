import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetails, getImageUrl } from '../../../hooks/useMovies';
import { Header, Footer, Container } from '../../layout';
import { Loading, EmptyState, Toast } from '../../common';
import { Heart, ArrowLeft, Play, Calendar, Star } from 'lucide-react';
import { AgeLimitIcon, GenreIcon } from '../../common';
import { useState } from 'react';

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: movie, isLoading } = useMovieDetails(Number(id));
  const [toastVisible, setToastVisible] = useState(false);

  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Derive isFavorite from favorites state - no useEffect needed
  const isFavorite = movie ? favorites.includes(movie.id) : false;

  const handleFavoriteToggle = () => {
    if (!movie) return;

    const isAlreadyFavorite = favorites.includes(movie.id);
    const newFavorites = isAlreadyFavorite
      ? favorites.filter((fid) => fid !== movie.id)
      : [...favorites, movie.id];

    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));

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
        <div className="relative h-[345px] md:h-[500px] w-full overflow-hidden">
          <img
            src={getImageUrl(movie.backdrop_path)}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

          {/* Back Button - Desktop only */}
          <button
            onClick={() => navigate(-1)}
            className="hidden md:block absolute top-20 left-16 z-10 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        {/* Content Section */}
        <Container className="relative -mt-32 md:-mt-32 z-10 px-4 md:px-0">
          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Poster + Title Row */}
            <div className="flex gap-4 items-start">
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="h-[171px] w-[116px] rounded-xl object-cover shadow-2xl flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-white leading-[34px]">
                  {movie.title}
                </h1>
                {movie.release_date && (
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="h-5 w-5 text-white" />
                    <span className="text-white text-sm">
                      {new Date(movie.release_date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons - Mobile */}
            <div className="flex gap-4 mt-6 items-center">
              {trailer ? (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#961200] hover:bg-[#7a0f00] text-[#FDFDFD] font-semibold text-sm leading-7 rounded-full transition-colors flex items-center justify-center gap-2 h-11 p-2"
                >
                  Watch Trailer
                  <Play size={18} fill="currentColor" />
                </a>
              ) : (
                <div className="flex-1 bg-gray-600 text-gray-400 font-semibold text-sm rounded-full flex items-center justify-center gap-2 h-11 cursor-not-allowed">
                  No Trailer
                </div>
              )}
              <button
                onClick={handleFavoriteToggle}
                className="bg-[rgba(10,13,18,0.6)] backdrop-blur-[20px] border border-[#181D27] hover:bg-gray-700 text-white rounded-full transition-colors flex items-center justify-center h-11 w-11 flex-shrink-0"
              >
                <Heart
                  size={24}
                  className={isFavorite ? 'fill-current text-red-500' : ''}
                />
              </button>
            </div>

            {/* Stat Cards - Mobile */}
            <div className="flex gap-3 mt-6">
              <div className="flex-1 bg-black border border-[#252B37] rounded-2xl p-4 flex flex-col items-center gap-2">
                <Star size={24} className="text-[#E4A802] fill-[#E4A802]" />
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs font-normal text-[#D5D7DA]">Rating</span>
                  <span className="text-lg font-semibold text-[#FDFDFD]">
                    {movie.vote_average.toFixed(1)}/10
                  </span>
                </div>
              </div>
              <div className="flex-1 bg-black border border-[#252B37] rounded-2xl p-4 flex flex-col items-center gap-2">
                <GenreIcon />
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs font-normal text-[#D5D7DA]">Genre</span>
                  <span className="text-lg font-semibold text-[#FDFDFD]">
                    {primaryGenre}
                  </span>
                </div>
              </div>
              <div className="flex-1 bg-black border border-[#252B37] rounded-2xl p-4 flex flex-col items-center gap-2">
                <AgeLimitIcon />
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs font-normal text-[#D5D7DA]">Age Limit</span>
                  <span className="text-lg font-semibold text-[#FDFDFD]">
                    13
                  </span>
                </div>
              </div>
            </div>

            {/* Overview Section - Mobile */}
            <div className="mt-6">
              <h2 className="text-xl font-bold text-white mb-2">Overview</h2>
              <p className="text-[#A4A7AE] leading-7 text-sm">
                {movie.overview}
              </p>
            </div>

            {/* Cast & Crew Section - Mobile */}
            {cast.length > 0 && (
              <div className="mt-6 pb-10">
                <h2 className="text-xl font-bold text-white mb-4">Cast & Crew</h2>
                <div className="flex flex-col gap-4">
                  {cast.map((actor) => (
                    <div key={actor.id} className="flex gap-3 items-center">
                      {actor.profile_path ? (
                        <img
                          src={getImageUrl(actor.profile_path)}
                          alt={actor.name}
                          className="h-[84px] w-[55px] rounded-lg object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="h-[84px] w-[55px] rounded-lg bg-gray-800 flex-shrink-0" />
                      )}
                      <div className="flex flex-col justify-center flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm leading-7">
                          {actor.name}
                        </p>
                        <p className="text-[#A4A7AE] text-sm leading-7">
                          {actor.character}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block">
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
                <h1 className="text-[48px] leading-[60px] tracking-[-0.96px] font-bold text-white mb-4">
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
                      className="bg-primary-300 hover:bg-primary-400 text-white font-semibold px-8 rounded-full transition-colors flex items-center gap-2 h-12"
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
                  <div className="w-[276px] h-[146px] bg-black border border-[#252B37] rounded-[16px] p-5 flex flex-col items-center justify-center gap-2">
                    <Star size={32} className="text-[#E4A802] fill-[#E4A802]" />
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-[16px] font-normal text-[#D5D7DA]">Rating</span>
                      <span className="text-[20px] font-semibold text-[#FDFDFD]">
                        {movie.vote_average.toFixed(1)}/10
                      </span>
                    </div>
                  </div>

                  {/* Genre Card */}
                  <div className="w-[276px] h-[146px] bg-black border border-[#252B37] rounded-[16px] p-5 flex flex-col items-center justify-center gap-2">
                    <GenreIcon />
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-[16px] font-normal text-[#D5D7DA]">Genre</span>
                      <span className="text-[20px] font-semibold text-[#FDFDFD]">
                        {primaryGenre}
                      </span>
                    </div>
                  </div>

                  {/* Age Limit Card */}
                  <div className="w-[276px] h-[146px] bg-black border border-[#252B37] rounded-[16px] p-5 flex flex-col items-center justify-center gap-2">
                    <AgeLimitIcon />
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-[16px] font-normal text-[#D5D7DA]">Age Limit</span>
                      <span className="text-[20px] font-semibold text-[#FDFDFD]">
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
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
};
