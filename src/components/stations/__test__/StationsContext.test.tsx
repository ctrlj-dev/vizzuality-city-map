import { StationList } from '@/lib/types';
import { render, screen } from '@testing-library/react';
import {
  StationsAPIContext,
  StationsStateContext,
  StationsWrapper,
} from '../StationsContext';

const mockStations = {
  stations: [
    {
      id: '1',
      name: 'Station A',
      freeBikes: 10,
      emptySlots: 5,
      latitude: 0,
      longitude: 0,
    },
    {
      id: '2',
      name: 'Station B',
      freeBikes: 5,
      emptySlots: 10,
      latitude: 0,
      longitude: 0,
    },
  ],
} as StationList;

name;
describe('StationsWrapper', () => {
  it('provides initial state and API to children', () => {
    render(
      <StationsWrapper initialStations={mockStations}>
        <StationsStateContext.Consumer>
          {value => (
            <StationsAPIContext.Consumer>
              {api => (
                <>
                  <div data-testid="current-page">{value.currentPage}</div>
                  <div data-testid="sort-by">{value.sortBy}</div>
                  <div data-testid="api">{JSON.stringify(api)}</div>
                </>
              )}
            </StationsAPIContext.Consumer>
          )}
        </StationsStateContext.Consumer>
      </StationsWrapper>
    );

    expect(screen.getByTestId('current-page')).toHaveTextContent('1');
    expect(screen.getByTestId('sort-by')).toHaveTextContent('');
    expect(screen.getByTestId('api')).toBeDefined();
  });
});
