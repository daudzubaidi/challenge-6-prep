import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetails, getImageUrl } from '../../../hooks/useMovies';
import { Header, Footer, Container } from '../../layout';
import { Loading, EmptyState, Button } from '../../common';
import { Heart, ArrowLeft, Play } from 'lucide-react';
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
      <div className="min-h-screen bg-black">
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

  const director = movie.credits?.crew?.find((c) => c.job === 'Director');
  const cast = movie.credits?.cast?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main>
        {/* Hero Section */}
        <div className="relative h-96 w-full overflow-hidden md:h-screen">
          <img
            src={getImageUrl(movie.backdrop_path)}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 z-10 rounded-lg bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        <Container className="relative -mt-24 z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Poster */}
            <div className="hidden md:block">
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="w-full rounded-lg shadow-2xl"
              />
            </div>

            {/* Info */}
            <div className="col-span-1 md:col-span-2 pt-4">
              <h1 className="mb-4 text-4xl md:text-5xl font-bold text-white">
                {movie.title}
              </h1>

              <div className="mb-6 flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span className="text-xl font-semibold text-white">
                    {movie.vote_average.toFixed(1)}/10
                  </span>
                </div>

                {movie.release_date && (
                  <span className="text-gray-400">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                )}

                {movie.runtime && (
                  <span className="text-gray-400">
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-red-600/20 px-4 py-1 text-sm text-red-400"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Synopsis */}
              <p className="mb-8 text-gray-300 leading-relaxed">
                {movie.overview}
              </p>

              {/* Director & Cast */}
              {director && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">
                    Director
                  </h3>
                  <p className="text-white">{director.name}</p>
                </div>
              )}

              {cast.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">
                    Cast
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {cast.map((actor) => (
                      <div key={actor.id} className="text-sm">
                        <p className="text-white font-medium">{actor.name}</p>
                        <p className="text-gray-400 text-xs">{actor.character}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleFavoriteToggle}
                  className="flex items-center gap-2"
                >
                  <Heart
                    size={20}
                    className={isFavorite ? 'fill-current' : ''}
                  />
                  {isFavorite ? 'Saved' : 'Save'}
                </Button>

                {trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="lg" className="flex items-center gap-2">
                      <Play size={20} />
                      Watch Trailer
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
};
