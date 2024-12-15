import {
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationRoot,
} from './PaginationElements';

type PaginationProps = {
  className?: string;
  currentPage: number;
  totalPages: number;
  theme?: 'light' | 'dark';
  onPreviousPage: () => void;
  onNextPage: () => void;
  onNavigateToPage: (page: number) => void;
};

const Pagination = ({
  className,
  currentPage,
  onPreviousPage,
  onNextPage,
  totalPages,
  onNavigateToPage,
  theme = 'light',
}: PaginationProps) => {
  const handlePreviousPage = () => {
    onPreviousPage();
  };

  const handleNextPage = () => {
    onNextPage();
  };

  const handleNavigateToPage = (page: number) => {
    onNavigateToPage(page);
  };

  return (
    <PaginationRoot className={className}>
      <PaginationContent>
        {currentPage > 1 && (
          <>
            <PaginationPrevious theme={theme} onClick={handlePreviousPage} />
            <PaginationLink
              theme={theme}
              isActive={currentPage === currentPage - 1}
              onClick={() => handleNavigateToPage(currentPage - 1)}
            >
              {currentPage - 1}
            </PaginationLink>
          </>
        )}

        <PaginationLink
          theme={theme}
          isActive
          onClick={() => handleNavigateToPage(currentPage)}
        >
          {currentPage}
        </PaginationLink>

        {currentPage < totalPages && (
          <PaginationLink
            theme={theme}
            isActive={currentPage === currentPage + 1}
            onClick={() => handleNavigateToPage(currentPage + 1)}
          >
            {currentPage + 1}
          </PaginationLink>
        )}

        {currentPage < totalPages - 1 && <PaginationEllipsis />}

        {currentPage < totalPages && (
          <PaginationNext theme={theme} onClick={handleNextPage} />
        )}
      </PaginationContent>
    </PaginationRoot>
  );
};

export default Pagination;
