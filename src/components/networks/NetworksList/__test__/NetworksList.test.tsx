import { render, screen } from '@testing-library/react';
import { NetworksState, NetworkStateContext } from '../../NetworksContext';
import NetworksList from '../NetworksList';

jest.mock('../NetworksListSkeleton', () => () => <div>Loading...</div>);

const mockNetworks = [
  {
    id: '1',
    name: 'Network A',
    company: ['Company A'],
    location: { city: 'Test City', country: 'US', longitude: 0, latitude: 0 },
  },
  {
    id: '2',
    name: 'Network B',
    company: ['Company B'],
    location: { city: 'Test City', country: 'CA', longitude: 0, latitude: 0 },
  },
];

const renderWithContext = (value: NetworksState) => {
  return render(
    <NetworkStateContext.Provider value={value}>
      <NetworksList />
    </NetworkStateContext.Provider>
  );
};

describe('NetworksList', () => {
  it('renders loading state', () => {
    renderWithContext({
      networks: [],
      currentPage: 1,
      loading: true,
      filters: {},
    });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders no networks available message', () => {
    renderWithContext({
      networks: [],
      currentPage: 1,
      loading: false,
      filters: {},
    });

    expect(screen.getByText('No networks available...')).toBeInTheDocument();
  });

  it('renders a list of networks', () => {
    renderWithContext({
      networks: mockNetworks,
      currentPage: 1,
      loading: false,
      filters: {},
    });

    expect(screen.getByText('Network A')).toBeInTheDocument();
    expect(screen.getByText('Network B')).toBeInTheDocument();
  });

  it('renders paginated networks correctly', () => {
    renderWithContext({
      networks: mockNetworks,
      currentPage: 1,
      loading: false,
      filters: {},
    });

    expect(screen.getByText('Network A')).toBeInTheDocument();
    expect(screen.getByText('Network B')).toBeInTheDocument();
  });
});
