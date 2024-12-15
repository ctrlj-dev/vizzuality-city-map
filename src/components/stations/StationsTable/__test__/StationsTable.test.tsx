import { Station } from '@/lib/types';
import { render, screen } from '@testing-library/react';
import { StationsState, StationsStateContext } from '../../StationsContext';
import StationsTable from '../StationsTable';

// Mock data for stations
const mockStations = [
  { id: '1', name: 'Station A', freeBikes: 5, emptySlots: 10 },
  { id: '2', name: 'Station B', freeBikes: 0, emptySlots: 15 },
  { id: '3', name: 'Station C', freeBikes: 8, emptySlots: 12 },
];

const mockContextValue: StationsState = {
  stations: mockStations as Station[],
  currentPage: 1,
  sortBy: 'freeBikes',
  isAscending: true,
};

describe('StationsTable', () => {
  it('renders the component and displays the correct number of stations', () => {
    render(
      <StationsStateContext.Provider value={mockContextValue}>
        <StationsTable />
      </StationsStateContext.Provider>
    );

    const stationCount = screen.getByText(/All/i);
    expect(stationCount).toBeInTheDocument();
    expect(stationCount).toHaveTextContent(`All${mockStations.length}stations`);

    // Check if the stations are rendered in the table
    mockStations.forEach(station => {
      expect(screen.getByText(station.name)).toBeInTheDocument();
      expect(screen.getByText(`${station.freeBikes}`)).toBeInTheDocument();
      expect(screen.getByText(`${station.emptySlots}`)).toBeInTheDocument();
    });
  });

  it('sorts the stations correctly', () => {
    render(
      <StationsStateContext.Provider value={mockContextValue}>
        <StationsTable />
      </StationsStateContext.Provider>
    );

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Station B');
    expect(rows[2]).toHaveTextContent('Station A510');
    expect(rows[3]).toHaveTextContent('Station C812');
  });
});
