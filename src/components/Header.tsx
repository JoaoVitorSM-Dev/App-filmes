import { Link, useLocation } from 'react-router-dom';
import { Film, Heart, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';

export const Header = () => {
  const location = useLocation();
  const { favorites } = useFavorites();

  return (
    <header className="bg-cinema-darker/95 backdrop-blur-sm border-b border-cinema-light sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
            <Film className="w-4 h-4 sm:w-6 sm:h-6 text-foreground" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-accent bg-clip-text text-transparent">
              CineSearch
            </h1>
            <p className="text-xs text-muted-foreground">Descubra filmes incríveis</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Button
            asChild
            variant={location.pathname === '/' ? 'default' : 'ghost'}
            size="sm"
            className={
              location.pathname === '/'
                ? 'bg-cinema-gold text-cinema-dark hover:bg-cinema-gold/90'
                : 'hover:bg-cinema-light'
            }
          >
            <Link to="/" className="flex items-center">
              <Home className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Início</span>
            </Link>
          </Button>

          <Button
            asChild
            variant={location.pathname === '/favorites' ? 'default' : 'ghost'}
            size="sm"
            className={
              location.pathname === '/favorites'
                ? 'bg-cinema-gold text-cinema-dark hover:bg-cinema-gold/90'
                : 'hover:bg-cinema-light'
            }
          >
            <Link to="/favorites" className="relative flex items-center">
              <Heart className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Favoritos</span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-cinema-red text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};