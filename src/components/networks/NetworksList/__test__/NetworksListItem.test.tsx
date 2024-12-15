import { render, screen } from '@testing-library/react';
import { getVisibleCompanies } from '../../networks.utils';
import NetworksListItem from '../NetworksListItem';

jest.mock('../../networks.utils', () => ({
  getVisibleCompanies: jest.fn(),
}));

describe('NetworksListItem', () => {
  const mockProps = {
    id: '1',
    name: 'Test Network',
    company: ['Company A', 'Company B', 'Company C'],
    location: { city: 'Test City', country: 'Country' },
  };

  beforeEach(() => {
    (getVisibleCompanies as jest.Mock).mockReturnValue({
      visibleCompanies: 'Company A, Company B',
      hiddenCount: 1,
    });
  });

  it('renders correctly with given props', () => {
    render(<NetworksListItem {...mockProps} />);

    expect(screen.getByText('Test Network')).toBeInTheDocument();
    expect(screen.getByText('Test City, Country')).toBeInTheDocument();
    expect(screen.getByText('Company A, Company B')).toBeInTheDocument();
    expect(screen.getByText('+ 1')).toBeInTheDocument();
  });

  it('renders the details button', () => {
    render(<NetworksListItem {...mockProps} />);

    const detailsButton = screen.getByRole('button', { name: /details/i });
    expect(detailsButton).toBeInTheDocument();
  });
});
