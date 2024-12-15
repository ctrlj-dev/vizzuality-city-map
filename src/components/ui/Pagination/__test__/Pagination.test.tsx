import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../Pagination';

const mockOnPreviousPage = jest.fn();
const mockOnNextPage = jest.fn();
const mockOnNavigateToPage = jest.fn();

const setup = (props = {}) => {
  render(
    <Pagination
      currentPage={1}
      totalPages={5}
      onPreviousPage={mockOnPreviousPage}
      onNextPage={mockOnNextPage}
      onNavigateToPage={mockOnNavigateToPage}
      {...props}
    />
  );
};

describe('Pagination Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial props', () => {
    setup();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /next/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /previous/i })
    ).not.toBeInTheDocument();
  });

  it('navigates to the previous page when previous button is clicked', () => {
    setup({ currentPage: 2 });
    const previousButton = screen.getByRole('link', { name: /previous/i });
    fireEvent.click(previousButton);
    expect(mockOnPreviousPage).toHaveBeenCalledTimes(1);
  });

  it('navigates to the next page when next button is clicked', () => {
    setup({ currentPage: 1 });
    const nextButton = screen.getByRole('link', { name: /next/i });
    fireEvent.click(nextButton);
    expect(mockOnNextPage).toHaveBeenCalledTimes(1);
  });

  it('navigates to a specific page when page number is clicked', () => {
    setup({ currentPage: 2 });
    const pageTwo = screen.getByText('2');
    fireEvent.click(pageTwo);
    expect(mockOnNavigateToPage).toHaveBeenCalledWith(2);
  });

  it('does not render the previous button on the first page', () => {
    setup();
    expect(
      screen.queryByRole('link', { name: /previous/i })
    ).not.toBeInTheDocument();
  });

  it('does not render the next button on the last page', () => {
    setup({ currentPage: 5 });
    expect(
      screen.queryByRole('link', { name: /next/i })
    ).not.toBeInTheDocument();
  });

  it('renders ellipsis when there are more than two pages available', () => {
    setup({ currentPage: 2 });
    expect(screen.getByText('More pages')).toBeInTheDocument();
  });

  it('does not render ellipsis if on the last page', () => {
    setup({ currentPage: 5 });
    expect(screen.queryByText('More pages')).not.toBeInTheDocument();
  });
});
