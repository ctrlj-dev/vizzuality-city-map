import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MapControlsZoom } from '../MapControls';

describe('MapControlsZoom', () => {
  let mockZoomIn: jest.Mock;
  let mockZoomOut: jest.Mock;
  let ref: React.RefObject<mapboxgl.Map | null>;

  beforeEach(() => {
    // Create a mock ref object
    ref = React.createRef();
    mockZoomIn = jest.fn();
    mockZoomOut = jest.fn();

    // Mock the current property of the ref
    Object.defineProperty(ref, 'current', {
      value: {
        zoomIn: mockZoomIn,
        zoomOut: mockZoomOut,
      },
      writable: true,
    });
  });

  it('renders without crashing', () => {
    render(<MapControlsZoom ref={ref} />);
    expect(
      screen.getByRole('button', { name: /zoom in/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /zoom out/i })
    ).toBeInTheDocument();
  });

  it('calls zoomIn when the plus button is clicked', () => {
    render(<MapControlsZoom ref={ref} />);

    fireEvent.click(screen.getByRole('button', { name: /zoom in/i }));

    expect(mockZoomIn).toHaveBeenCalledTimes(1);
  });

  it('calls zoomOut when the minus button is clicked', () => {
    render(<MapControlsZoom ref={ref} />);

    fireEvent.click(screen.getByRole('button', { name: /zoom out/i }));

    expect(mockZoomOut).toHaveBeenCalledTimes(1);
  });
});
