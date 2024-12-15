import { render, screen } from '@testing-library/react';
import StationsHeader from '../StationsHeader';

describe('StationsHeader', () => {
  const mockStationDetails = {
    name: 'Station A',
    location: { city: 'City Name', country: 'Country Name' },
    company: ['Company 1', 'Company 2'],
  };

  it('renders the station header with correct information', () => {
    render(
      <StationsHeader
        name={mockStationDetails.name}
        city={mockStationDetails.location.city}
        company={mockStationDetails.company}
        country={mockStationDetails.location.country}
      />
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
