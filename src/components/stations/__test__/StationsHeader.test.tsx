import { render, screen } from '@testing-library/react';
import { StationsState, StationsStateContext } from '../StationsContext';
import StationsHeader from '../StationsHeader';

describe('StationsHeader', () => {
  const mockContextValue = {
    stations: {
      name: 'Station A',
      location: { city: 'City Name', country: 'Country Name' },
      company: ['Company 1', 'Company 2'],
    },
  };

  it('renders the station header with correct information', () => {
    render(
      <StationsStateContext.Provider value={mockContextValue as StationsState}>
        <StationsHeader />
      </StationsStateContext.Provider>
    );

    // Check if the station name is rendered
    expect(screen.getByText('Station A')).toBeInTheDocument();

    // Check if the location is rendered
    expect(screen.getByText('City Name,Country Name')).toBeInTheDocument();

    // Check if the company names are rendered
    expect(screen.getByText('Company 1, Company 2')).toBeInTheDocument();

    // Check if the back link is rendered
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
