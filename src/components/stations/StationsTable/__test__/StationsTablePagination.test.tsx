import { StationList } from '@/lib/types';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  StationsAPI,
  StationsAPIContext,
  StationsState,
  StationsStateContext,
} from '../../StationsContext';
import StationsTablePagination from '../StationsTablePagination';

const mockStations = {
  stations: [
    { id: '1', name: 'Station A', freeBikes: 5, emptySlots: 10 },
    { id: '2', name: 'Station B', freeBikes: 0, emptySlots: 15 },
    { id: '3', name: 'Station C', freeBikes: 3, emptySlots: 12 },
    { id: '4', name: 'Station D', freeBikes: 2, emptySlots: 8 },
    { id: '5', name: 'Station E', freeBikes: 1, emptySlots: 9 },
    { id: '6', name: 'Station F', freeBikes: 5, emptySlots: 10 },
    { id: '7', name: 'Station G', freeBikes: 0, emptySlots: 15 },
    { id: '8', name: 'Station H', freeBikes: 3, emptySlots: 12 },
    { id: '9', name: 'Station I', freeBikes: 2, emptySlots: 8 },
    { id: '10', name: 'Station J', freeBikes: 1, emptySlots: 9 },
    { id: '11', name: 'Station K', freeBikes: 1, emptySlots: 9 },
    { id: '12', name: 'Station L', freeBikes: 1, emptySlots: 9 },
    { id: '13', name: 'Station M', freeBikes: 1, emptySlots: 9 },
  ],
};

const mockContextStateValue: StationsState = {
  stations: mockStations as StationList,
  loading: false,
  currentPage: 1,
  sortBy: 'freeBikes',
  isAscending: true,
};

const mockAPIContextValue: StationsAPI = {
  handleSort: jest.fn(),
  handleSetPage: jest.fn(),
  handleSetStations: jest.fn(),
};

describe('StationsTablePagination', () => {
  it('renders pagination correctly', () => {
    render(
      <StationsStateContext.Provider value={mockContextStateValue}>
        <StationsAPIContext.Provider value={mockAPIContextValue}>
          <StationsTablePagination />
        </StationsAPIContext.Provider>
      </StationsStateContext.Provider>
    );

    // Check if Pagination component is called with correct props
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(mockAPIContextValue.handleSetPage).not.toHaveBeenCalled();
  });

  it('navigates to the next page', () => {
    render(
      <StationsStateContext.Provider value={mockContextStateValue}>
        <StationsAPIContext.Provider value={mockAPIContextValue}>
          <StationsTablePagination />
        </StationsAPIContext.Provider>
      </StationsStateContext.Provider>
    );

    // Simulate clicking the next page
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // Check if handleSetPage was called with the next page
    expect(mockAPIContextValue.handleSetPage).toHaveBeenCalledWith(2);
  });

  it('navigates to the previous page', () => {
    const contextValue = {
      ...mockContextStateValue,
      currentPage: 2,
    };

    render(
      <StationsStateContext.Provider value={contextValue}>
        <StationsAPIContext.Provider value={mockAPIContextValue}>
          <StationsTablePagination />
        </StationsAPIContext.Provider>
      </StationsStateContext.Provider>
    );

    // Simulate clicking the previous page
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);

    // Check if handleSetPage was called with the previous page
    expect(mockAPIContextValue.handleSetPage).toHaveBeenCalledWith(1);
  });

  it('navigates to a specific page', () => {
    render(
      <StationsStateContext.Provider value={mockContextStateValue}>
        <StationsAPIContext.Provider value={mockAPIContextValue}>
          <StationsTablePagination />
        </StationsAPIContext.Provider>
      </StationsStateContext.Provider>
    );

    const page3Button = screen.getByText('2');
    fireEvent.click(page3Button);

    // Check if handleSetPage was called with the correct page
    expect(mockAPIContextValue.handleSetPage).toHaveBeenCalledWith(2);
  });
});
