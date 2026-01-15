import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { MoviesResponse, MovieDetailsResponse } from '../types/movie';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/original';

export const usePopularMovies = (page = 1) => {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: async () => {
      const response = await api.get<MoviesResponse>('/movie/popular', {
        params: { page, api_key: import.meta.env.VITE_API_KEY },
      });
      return response.data;
    },
  });
};

export const useMovieDetails = (movieId: number) => {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: async () => {
      const response = await api.get<MovieDetailsResponse>(`/movie/${movieId}`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          append_to_response: 'credits,videos',
        },
      });
      return response.data;
    },
    enabled: !!movieId,
  });
};

export const useSearchMovies = (query: string, page = 1) => {
  return useQuery({
    queryKey: ['movies', 'search', query, page],
    queryFn: async () => {
      const response = await api.get<MoviesResponse>('/search/movie', {
        params: {
          query,
          page,
          api_key: import.meta.env.VITE_API_KEY,
        },
      });
      return response.data;
    },
    enabled: !!query,
  });
};

export const getTrendingMovies = async (page = 1) => {
  const response = await api.get<MoviesResponse>('/movie/top_rated', {
    params: {
      page,
      api_key: import.meta.env.VITE_API_KEY,
    },
  });
  return response.data;
};

export const getPopularMovies = async (page = 1) => {
  const response = await api.get<MoviesResponse>('/movie/popular', {
    params: {
      page,
      api_key: import.meta.env.VITE_API_KEY,
    },
  });
  return response.data;
};

export const getImageUrl = (path: string | null) => {
  if (!path) return '/placeholder-movie.png';
  return `${TMDB_IMAGE_BASE}${path}`;
};
