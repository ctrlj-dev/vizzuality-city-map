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
            <PaginationPrevious onClick={handlePreviousPage} />
            <PaginationLink
              isActive={currentPage === currentPage - 1}
              onClick={() => handleNavigateToPage(currentPage - 1)}
            >
              {currentPage - 1}
            </PaginationLink>
          </>
        )}

        <PaginationLink
          isActive
          onClick={() => handleNavigateToPage(currentPage)}
        >
          {currentPage}
        </PaginationLink>

        {currentPage < totalPages && (
          <PaginationLink
            isActive={currentPage === currentPage + 1}
            onClick={() => handleNavigateToPage(currentPage + 1)}
          >
            {currentPage + 1}
          </PaginationLink>
        )}

        {currentPage < totalPages - 1 && <PaginationEllipsis />}

        {currentPage < totalPages && (
          <PaginationNext onClick={handleNextPage} />
        )}
      </PaginationContent>
    </PaginationRoot>
  );
};

export default Pagination;
