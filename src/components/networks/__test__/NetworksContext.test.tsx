import { Network } from '@/lib/types/networks';
import { render, screen, waitFor } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import { useContext } from 'react';
import { NetworkStateContext, NetworksWrapper } from '../NetworksContext';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

const mockInitialNetworks: Network[] = [
  {
    id: '1',
    name: 'Network A',
    company: ['Company A'],
    location: { city: 'test', country: 'US', longitude: 0, latitude: 0 },
  },
  {
    id: '2',
    name: 'Network B',
    company: ['Company B'],
    location: { city: 'test', country: 'CA', longitude: 0, latitude: 0 },
  },
];

const TestContextConsumer = () => {
  const { networks } = useContext(NetworkStateContext);
  return (
    <div>
      {networks.map(network => (
        <div key={network.id}>{network.name}</div>
      ))}
    </div>
  );
};

describe('NetworksWrapper', () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(undefined),
    });
  });

  it('renders children correctly', () => {
    render(
      <NetworksWrapper initialNetworks={mockInitialNetworks}>
        <div>Test Child</div>
      </NetworksWrapper>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('sets networks from props correctly', async () => {
    render(
      <NetworksWrapper initialNetworks={mockInitialNetworks}>
        <TestContextConsumer />
      </NetworksWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Network A')).toBeInTheDocument();
      expect(screen.getByText('Network B')).toBeInTheDocument();
    });
  });

  it('handles filters from search params', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(param => {
        if (param === 'country') return 'US';
        if (param === 'search') return 'Network A';
        return null;
      }),
    });

    render(
      <NetworksWrapper initialNetworks={mockInitialNetworks}>
        <TestContextConsumer />
      </NetworksWrapper>
    );

    await waitFor(() => {
      expect(screen.queryByText('Network B')).not.toBeInTheDocument();
      expect(screen.getByText('Network A')).toBeInTheDocument();
    });
  });
});
