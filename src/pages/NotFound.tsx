import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Film } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="w-24 h-24 bg-cinema-light rounded-full flex items-center justify-center mx-auto">
            <Film className="w-12 h-12 text-muted-foreground" />
          </div>
          
          <div>
            <h1 className="text-6xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Página não encontrada
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              O filme que você está procurando não está em cartaz.
            </p>
          </div>
          
          <Button asChild size="lg" className="bg-cinema-gold hover:bg-cinema-gold/90 text-cinema-dark">
            <Link to="/">
              <Home className="w-5 h-5 mr-2" />
              Voltar ao Início
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
