import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '@/services/tmdb';
import { SearchBar } from '@/components/SearchBar';
import { MovieCard } from '@/components/MovieCard';
import { Pagination } from '@/components/Pagination';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Film, Search } from 'lucide-react';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const {
    data: searchResults,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['searchMovies', query, page],
    queryFn: () => tmdbService.searchMovies(query, page),
    enabled: !!query,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const {
    data: popularMovies,
    isLoading: popularLoading,
    error: popularError
  } = useQuery({
    queryKey: ['popularMovies', page],
    queryFn: () => tmdbService.getPopularMovies(page),
    enabled: !query,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (page > 1) params.set('page', page.toString());
    setSearchParams(params, { replace: true });
  }, [query, page, setSearchParams]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayData = query ? searchResults : popularMovies;
  const loading = query ? isLoading : popularLoading;
  const currentError = query ? error : popularError;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-accent rounded-full flex items-center justify-center shadow-glow">
              <Film className="w-6 h-6 sm:w-8 sm:h-8 text-foreground" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-accent bg-clip-text text-transparent">
            CineSearch
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Descubra filmes incríveis, explore detalhes e crie sua lista de favoritos
          </p>
          
          <SearchBar
            onSearch={handleSearch}
            loading={loading}
            initialValue={query}
          />
        </div>

        {/* Results Section */}
        <div className="space-y-8">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <LoadingSpinner size="lg" />
                <p className="text-muted-foreground">
                  {query ? 'Buscando filmes...' : 'Carregando filmes populares...'}
                </p>
              </div>
            </div>
          )}

          {currentError && (
            <Alert className="max-w-2xl mx-auto border-destructive">
              <AlertDescription className="text-destructive">
                Erro ao carregar filmes. Tente novamente.
              </AlertDescription>
            </Alert>
          )}

          {displayData && !loading && (
            <>
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-cinema-gold" />
                  <h2 className="text-lg sm:text-2xl font-semibold">
                    {query ? `Resultados para "${query}"` : 'Filmes Populares'}
                  </h2>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {displayData.total_results} resultado{displayData.total_results !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Movies Grid */}
              {displayData.results.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
                    {displayData.results.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>

                  <Pagination
                    currentPage={page}
                    totalPages={Math.min(displayData.total_pages, 500)} // TMDB limit
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-cinema-light rounded-full flex items-center justify-center mx-auto">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">Nenhum filme encontrado</h3>
                  <p className="text-muted-foreground">
                    Tente buscar com termos diferentes ou verifique a ortografia.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};