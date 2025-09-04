import { Movie, MovieDetails, TMDBResponse } from '@/types/movie';

// Using your TMDB API key
const API_KEY = 'd1bddc04bf773bc9612328b7fcadebc9';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const tmdbService = {
  searchMovies: async (query: string, page: number = 1): Promise<TMDBResponse> => {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=pt-BR`
    );
    
    if (!response.ok) {
      throw new Error('Erro ao buscar filmes');
    }
    
    return response.json();
  },

  getMovieDetails: async (id: number): Promise<MovieDetails> => {
    const [movieResponse, creditsResponse] = await Promise.all([
      fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`),
      fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)
    ]);

    if (!movieResponse.ok || !creditsResponse.ok) {
      throw new Error('Erro ao buscar detalhes do filme');
    }

    const movie = await movieResponse.json();
    const credits = await creditsResponse.json();

    return { ...movie, credits };
  },

  getPopularMovies: async (page: number = 1): Promise<TMDBResponse> => {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=pt-BR`
    );
    
    if (!response.ok) {
      throw new Error('Erro ao buscar filmes populares');
    }
    
    return response.json();
  },

  getImageUrl: (path: string | null, size: 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string => {
    if (!path) return '/placeholder.svg';
    return `${IMAGE_BASE_URL}/${size}${path}`;
  }
};