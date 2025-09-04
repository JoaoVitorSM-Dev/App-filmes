import { Movie } from '@/types/movie';
import { tmdbService } from '@/services/tmdb';
import { useFavorites } from '@/hooks/useFavorites';
import { Button } from '@/components/ui/button';
import { Heart, Star, Calendar, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="group relative bg-gradient-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 animate-scale-in">
      <div className="relative">
        <img
          src={tmdbService.getImageUrl(movie.poster_path, 'w342')}
          alt={movie.title}
          className="w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-darker via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Favorite button */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(movie);
          }}
          variant="ghost"
          size="sm"
          className={`absolute top-1 right-1 sm:top-2 sm:right-2 p-1 sm:p-2 rounded-full transition-all duration-200 ${
            isFavorite(movie.id) 
              ? 'bg-cinema-red/20 text-cinema-red hover:bg-cinema-red/30' 
              : 'bg-cinema-darker/60 text-muted-foreground hover:bg-cinema-darker/80 hover:text-cinema-red'
          }`}
        >
          <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isFavorite(movie.id) ? 'fill-current' : ''}`} />
        </Button>
      </div>

      <div className="p-2 sm:p-3 lg:p-4 space-y-2 sm:space-y-3">
        <h3 className="font-semibold text-sm sm:text-base text-foreground line-clamp-2 group-hover:text-cinema-gold transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-cinema-gold text-cinema-gold" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3 hidden sm:block">
          {movie.overview || 'Sinopse não disponível.'}
        </p>

        <Button
          onClick={handleDetailsClick}
          variant="secondary"
          size="sm"
          className="w-full group-hover:bg-cinema-gold group-hover:text-cinema-dark transition-colors text-xs sm:text-sm"
        >
          <Info className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
          <span className="hidden sm:inline">Ver Detalhes</span>
          <span className="sm:hidden">Detalhes</span>
        </Button>
      </div>
    </div>
  );
};