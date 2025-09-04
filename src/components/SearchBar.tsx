import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading?: boolean;
  initialValue?: string;
}

export const SearchBar = ({ onSearch, loading, initialValue = '' }: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        
        <Input
          type="text"
          placeholder="Buscar filmes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 pr-20 h-12 bg-cinema-light border-cinema-light focus:border-cinema-gold focus:ring-cinema-gold text-foreground placeholder:text-muted-foreground"
          disabled={loading}
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
          {query && (
            <Button
              type="button"
              onClick={clearSearch}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-cinema-darker"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          
          <Button
            type="submit"
            disabled={loading || !query.trim()}
            size="sm"
            className="h-8 bg-cinema-gold hover:bg-cinema-gold/90 text-cinema-dark font-medium"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </Button>
        </div>
      </div>
    </form>
  );
};