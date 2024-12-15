import { fireEvent, render, screen } from '@testing-library/react';
import {
  NetworkAPIContext,
  NetworksAPI,
  NetworksState,
  NetworkStateContext,
} from '../../NetworksContext';
import NetworksListPagination from '../NetworksListPagination';

const mockNetworks = Array.from({ length: 25 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Network ${i + 1}`,
  company: [`Company ${i + 1}`],
  location: { city: 'Test City', country: 'US', longitude: 0, latitude: 0 },
}));

const mockContextValue: NetworksState = {
  networks: mockNetworks,
  loading: false,
  filters: {},
  currentPage: 1,
};

const renderWithContext = (value: NetworksState, api: NetworksAPI) => {
  return render(
    <NetworkStateContext.Provider value={value}>
      <NetworkAPIContext.Provider value={api}>
        <NetworksListPagination />
      </NetworkAPIContext.Provider>
    </NetworkStateContext.Provider>
  );
};

describe('NetworksListPagination', () => {
  let handleSetPage: jest.Mock;
  let handleSetFilters: jest.Mock;
  let handleSetNetworks: jest.Mock;

  beforeEach(() => {
    handleSetPage = jest.fn();
    handleSetFilters = jest.fn();
    handleSetNetworks = jest.fn();
  });

  it('renders pagination correctly with total pages', () => {
    renderWithContext(mockContextValue, {
      handleSetPage,
      handleSetFilters,
      handleSetNetworks,
    });

    const paginationElement = screen.getByRole('navigation');
    expect(paginationElement).toBeInTheDocument();
  });

  it('handles next page navigation', () => {
    renderWithContext(mockContextValue, {
      handleSetPage,
      handleSetFilters,
      handleSetNetworks,
    });

    fireEvent.click(screen.getByText('Next'));
    expect(handleSetPage).toHaveBeenCalledWith(2);
  });

  it('handles previous page navigation', () => {
    renderWithContext(
      { ...mockContextValue, currentPage: 2 },
      {
        handleSetPage,
        handleSetFilters,
        handleSetNetworks,
      }
    );

    fireEvent.click(screen.getByText('Previous'));
    expect(handleSetPage).toHaveBeenCalledWith(1);
  });

  it('navigates to a specific page', () => {
    renderWithContext(mockContextValue, {
      handleSetPage,
      handleSetFilters,
      handleSetNetworks,
    });

    fireEvent.click(screen.getByText('2'));
    expect(handleSetPage).toHaveBeenCalledWith(2);
  });
});
