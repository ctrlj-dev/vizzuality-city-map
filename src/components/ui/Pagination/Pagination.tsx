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
  const handleNavigateToPage = (page: number) => {
    if (page !== currentPage) {
      onNavigateToPage(page);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLAnchorElement>,
    action: () => void
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  if (totalPages === 1) {
    return null;
  }

  return (
    <PaginationRoot className={className}>
      <PaginationContent>
        {currentPage > 1 && (
          <>
            <PaginationPrevious
              theme={theme}
              onClick={onPreviousPage}
              onKeyDown={event => handleKeyDown(event, onPreviousPage)}
              tabIndex={0}
            />
            <PaginationLink
              theme={theme}
              isActive={currentPage === currentPage - 1}
              onClick={() => handleNavigateToPage(currentPage - 1)}
              onKeyDown={event =>
                handleKeyDown(event, () =>
                  handleNavigateToPage(currentPage - 1)
                )
              }
              aria-disabled={currentPage === currentPage - 1}
            >
              {currentPage - 1}
            </PaginationLink>
          </>
        )}

        <PaginationLink
          theme={theme}
          isActive
          onClick={() => handleNavigateToPage(currentPage)}
          onKeyDown={event =>
            handleKeyDown(event, () => handleNavigateToPage(currentPage))
          }
          aria-disabled
        >
          {currentPage}
        </PaginationLink>

        {currentPage < totalPages && (
          <PaginationLink
            theme={theme}
            isActive={currentPage === currentPage + 1}
            onClick={() => handleNavigateToPage(currentPage + 1)}
            onKeyDown={event =>
              handleKeyDown(event, () => handleNavigateToPage(currentPage + 1))
            }
            aria-disabled={currentPage === currentPage + 1}
          >
            {currentPage + 1}
          </PaginationLink>
        )}

        {currentPage < totalPages - 1 && <PaginationEllipsis />}

        {currentPage < totalPages && (
          <PaginationNext
            theme={theme}
            onClick={onNextPage}
            onKeyDown={event => handleKeyDown(event, onNextPage)}
            tabIndex={0}
          />
        )}
      </PaginationContent>
    </PaginationRoot>
  );
};

export default Pagination;
