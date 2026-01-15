export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids?: number[];
  genres?: Genre[];
  runtime?: number;
  director?: string;
  cast?: Cast[];
  videos?: {
    results: Video[];
  };
}

export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetailsResponse extends Movie {
  credits?: {
    cast: Cast[];
    crew: {
      id: number;
      name: string;
      job: string;
    }[];
  };
  videos?: {
    results: Video[];
  };
  release_dates?: {
    results: Array<{
      iso_3166_1: string;
      release_dates: Array<{
        certification: string;
        release_date: string;
        type: number;
        note: string;
      }>;
    }>;
  };
}
