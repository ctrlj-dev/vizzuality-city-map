import { fireEvent, render, screen } from '@testing-library/react';
import { StationsAPI, StationsAPIContext } from '../../StationsContext';
import StationsTableHeader from '../StationsTableHeader';

// Mock the context value
const mockContextAPI: StationsAPI = {
  handleSort: jest.fn(),
  handleSetPage: jest.fn(),
  handleSetStations: jest.fn(),
};

describe('StationsTableHeader', () => {
  it('renders the table header correctly', () => {
    render(
      <StationsAPIContext.Provider value={mockContextAPI}>
        <table>
          <StationsTableHeader />
        </table>
      </StationsAPIContext.Provider>
    );

    // Check if the table header elements are rendered
    expect(screen.getByText('Station Name')).toBeInTheDocument();
    expect(screen.getByText('Free Bikes')).toBeInTheDocument();
    expect(screen.getByText('Empty Slots')).toBeInTheDocument();
  });

  it('calls handleSort with correct argument when Free Bikes header is clicked', () => {
    render(
      <StationsAPIContext.Provider value={mockContextAPI}>
        <table>
          <StationsTableHeader />
        </table>
      </StationsAPIContext.Provider>
    );

    // Click the Free Bikes header
    fireEvent.click(screen.getByText('Free Bikes'));

    // Check if handleSort was called with the correct argument
    expect(mockContextAPI.handleSort).toHaveBeenCalledWith('freeBikes');
  });

  it('calls handleSort with correct argument when Empty Slots header is clicked', () => {
    render(
      <StationsAPIContext.Provider value={mockContextAPI}>
        <table>
          <StationsTableHeader />
        </table>
      </StationsAPIContext.Provider>
    );

    // Click the Empty Slots header
    fireEvent.click(screen.getByText('Empty Slots'));

    // Check if handleSort was called with the correct argument
    expect(mockContextAPI.handleSort).toHaveBeenCalledWith('emptySlots');
  });
});
