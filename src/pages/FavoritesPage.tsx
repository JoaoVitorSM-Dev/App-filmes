import { useFavorites } from '@/hooks/useFavorites';
import { MovieCard } from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { Heart, Search, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  const handleRemoveFavorite = (movieId: number) => {
    removeFromFavorites(movieId);
    setShowDeleteConfirm(null);
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="animate-fade-in">
              <div className="w-24 h-24 bg-cinema-light rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-muted-foreground" />
              </div>
              
              <h1 className="text-4xl font-bold mb-4 text-foreground">
                Sua Lista de Favoritos
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Você ainda não adicionou nenhum filme aos seus favoritos.
              </p>
              
              <Button asChild size="lg" className="bg-cinema-gold hover:bg-cinema-gold/90 text-cinema-dark">
                <Link to="/">
                  <Search className="w-5 h-5 mr-2" />
                  Descobrir Filmes
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Meus Favoritos
                </h1>
                <p className="text-muted-foreground">
                  {favorites.length} filme{favorites.length !== 1 ? 's' : ''} salvo{favorites.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <Button asChild variant="secondary">
              <Link to="/">
                <Search className="w-4 h-4 mr-2" />
                Buscar Mais
              </Link>
            </Button>
          </div>

          {showDeleteConfirm && (
            <Alert className="max-w-md mx-auto border-destructive animate-scale-in">
              <AlertDescription>
                <div className="space-y-4">
                  <p className="text-foreground">
                    Remover este filme dos favoritos?
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleRemoveFavorite(showDeleteConfirm)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remover
                    </Button>
                    <Button
                      onClick={() => setShowDeleteConfirm(null)}
                      variant="secondary"
                      size="sm"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <div key={movie.id} className="relative group">
              <MovieCard movie={movie} />
              
              {/* Quick remove button */}
              <Button
                onClick={() => setShowDeleteConfirm(movie.id)}
                variant="ghost"
                size="sm"
                className="absolute top-2 left-2 p-2 rounded-full bg-cinema-darker/80 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <p className="text-muted-foreground">
              Continue explorando e descobrindo novos filmes para adicionar à sua coleção!
            </p>
            <Button asChild size="lg" className="bg-cinema-gold hover:bg-cinema-gold/90 text-cinema-dark">
              <Link to="/">
                <Search className="w-5 h-5 mr-2" />
                Descobrir Mais Filmes
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};