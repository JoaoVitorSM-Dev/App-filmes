import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-6 sm:mt-8 flex-wrap">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="ghost"
        size="sm"
        className="hover:bg-cinema-light disabled:opacity-50 text-xs sm:text-sm"
      >
        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Anterior</span>
        <span className="sm:hidden">Ant</span>
      </Button>

      <div className="flex items-center gap-1">
        {getVisiblePages().map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <Button variant="ghost" size="sm" disabled className="pointer-events-none">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={() => onPageChange(Number(page))}
                variant={currentPage === page ? "default" : "ghost"}
                size="sm"
                className={
                  currentPage === page
                    ? "bg-cinema-gold text-cinema-dark hover:bg-cinema-gold/90"
                    : "hover:bg-cinema-light"
                }
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="ghost"
        size="sm"
        className="hover:bg-cinema-light disabled:opacity-50 text-xs sm:text-sm"
      >
        <span className="hidden sm:inline">Próxima</span>
        <span className="sm:hidden">Prox</span>
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
      </Button>
    </div>
  );
};