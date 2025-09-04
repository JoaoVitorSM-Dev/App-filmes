import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '@/services/tmdb';
import { useFavorites } from '@/hooks/useFavorites';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, 
  Heart, 
  Star, 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  Globe,
  Play
} from 'lucide-react';

export const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const {
    data: movie,
    isLoading,
    error
  } = useQuery({
    queryKey: ['movieDetails', id],
    queryFn: () => tmdbService.getMovieDetails(Number(id)),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-muted-foreground">Carregando detalhes...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="container mx-auto px-4">
          <Alert className="max-w-2xl mx-auto border-destructive">
            <AlertDescription className="text-destructive">
              Erro ao carregar detalhes do filme. Tente novamente.
            </AlertDescription>
          </Alert>
          <div className="text-center mt-6">
            <Button onClick={() => navigate(-1)} variant="secondary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const director = movie.credits?.crew?.find(person => person.job === 'Director');
  const mainCast = movie.credits?.cast?.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section with Backdrop */}
      <div className="relative">
        {movie.backdrop_path && (
          <div className="absolute inset-0 h-[60vh]">
            <img
              src={tmdbService.getImageUrl(movie.backdrop_path, 'original')}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-cinema-dark/80 to-cinema-dark/40" />
          </div>
        )}

        <div className="relative container mx-auto px-4 pt-8 pb-16">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="sm"
            className="mb-6 hover:bg-cinema-light/20 text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Poster */}
            <div className="lg:col-span-1">
              <div className="relative group">
                <img
                  src={tmdbService.getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  className="w-full max-w-sm mx-auto rounded-lg shadow-card group-hover:shadow-card-hover transition-shadow duration-300"
                />
                <Button
                  onClick={() => toggleFavorite(movie)}
                  variant="ghost"
                  size="lg"
                  className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-200 ${
                    isFavorite(movie.id) 
                      ? 'bg-cinema-red/20 text-cinema-red hover:bg-cinema-red/30' 
                      : 'bg-cinema-darker/80 text-muted-foreground hover:bg-cinema-darker hover:text-cinema-red'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isFavorite(movie.id) ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Movie Info */}
            <div className="lg:col-span-2 space-y-6 animate-fade-in">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 text-foreground">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="text-lg text-cinema-gold italic">
                    "{movie.tagline}"
                  </p>
                )}
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-cinema-light/50 rounded-full px-3 py-1">
                  <Star className="w-4 h-4 fill-cinema-gold text-cinema-gold" />
                  <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
                  <span className="text-muted-foreground">({movie.vote_count} votos)</span>
                </div>
                
                <div className="flex items-center gap-2 bg-cinema-light/50 rounded-full px-3 py-1">
                  <Calendar className="w-4 h-4 text-cinema-gold" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                
                {movie.runtime && (
                  <div className="flex items-center gap-2 bg-cinema-light/50 rounded-full px-3 py-1">
                    <Clock className="w-4 h-4 text-cinema-gold" />
                    <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-gradient-accent text-cinema-dark text-sm font-medium rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <div>
                <h2 className="text-xl font-semibold mb-3 text-foreground">Sinopse</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {movie.overview || 'Sinopse não disponível.'}
                </p>
              </div>

              {/* Director */}
              {director && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Direção</h3>
                  <p className="text-cinema-gold font-medium">{director.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {mainCast.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground flex items-center gap-3">
            <Users className="w-6 h-6 text-cinema-gold" />
            Elenco Principal
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {mainCast.map((actor) => (
              <div key={actor.id} className="text-center space-y-3 animate-scale-in">
                <div className="relative">
                  <img
                    src={tmdbService.getImageUrl(actor.profile_path, 'w185')}
                    alt={actor.name}
                    className="w-full aspect-[2/3] object-cover rounded-lg shadow-card hover:shadow-card-hover transition-shadow duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm">{actor.name}</h3>
                  <p className="text-xs text-muted-foreground">{actor.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Info */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {movie.budget > 0 && (
            <div className="bg-gradient-card rounded-lg p-6 shadow-card">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-5 h-5 text-cinema-gold" />
                <h3 className="font-semibold text-foreground">Orçamento</h3>
              </div>
              <p className="text-2xl font-bold text-cinema-gold">
                ${(movie.budget / 1000000).toFixed(0)}M
              </p>
            </div>
          )}

          {movie.revenue > 0 && (
            <div className="bg-gradient-card rounded-lg p-6 shadow-card">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-5 h-5 text-cinema-gold" />
                <h3 className="font-semibold text-foreground">Bilheteria</h3>
              </div>
              <p className="text-2xl font-bold text-cinema-gold">
                ${(movie.revenue / 1000000).toFixed(0)}M
              </p>
            </div>
          )}

          <div className="bg-gradient-card rounded-lg p-6 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-5 h-5 text-cinema-gold" />
              <h3 className="font-semibold text-foreground">Idioma</h3>
            </div>
            <p className="text-lg font-medium text-foreground">
              {movie.original_language.toUpperCase()}
            </p>
          </div>

          <div className="bg-gradient-card rounded-lg p-6 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <Play className="w-5 h-5 text-cinema-gold" />
              <h3 className="font-semibold text-foreground">Status</h3>
            </div>
            <p className="text-lg font-medium text-foreground">
              {movie.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};