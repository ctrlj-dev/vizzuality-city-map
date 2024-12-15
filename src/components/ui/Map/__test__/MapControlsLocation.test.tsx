import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MapControlsLocation } from '../MapControls';

// Mock the Button component to avoid rendering issues
jest.mock('../../Button', () => ({
  Button: jest.fn(({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  )),
}));

describe('MapControlsLocation', () => {
  let mockFlyTo: jest.Mock;
  let ref: React.RefObject<mapboxgl.Map | null>;

  beforeEach(() => {
    // Create a mock ref object
    ref = React.createRef();
    mockFlyTo = jest.fn();

    // Mock the current property of the ref
    Object.defineProperty(ref, 'current', {
      value: {
        flyTo: mockFlyTo,
      },
      writable: true,
    });
  });

  it('renders without crashing', () => {
    render(<MapControlsLocation ref={ref} location={[0, 0]} />);
    expect(screen.getByText('Near me')).toBeInTheDocument();
  });

  it('calls flyTo with the correct parameters when the button is clicked', () => {
    const location: [number, number] = [12.34, 56.78];
    render(<MapControlsLocation ref={ref} location={location} />);

    fireEvent.click(screen.getByText('Near me'));

    expect(mockFlyTo).toHaveBeenCalledWith({
      center: location,
      zoom: 10,
      essential: true,
    });
  });
});
