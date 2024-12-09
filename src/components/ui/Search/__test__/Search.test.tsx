import { fireEvent, render, screen } from '@testing-library/react';
import Search from '../Search';

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders with a custom placeholder', () => {
    const placeholder = 'Custom Placeholder';
    render(<Search placeholder={placeholder} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('displays the search icon', () => {
    render(<Search />);
    const searchIcon = screen.getByRole('img');
    expect(searchIcon).toBeInTheDocument();
  });

  it('allows user input', () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Test input' } });
    expect(input.value).toBe('Test input');
  });

  it('renders with custom class names', () => {
    const customClass = 'bg-gray-200';
    render(<Search className={customClass} />);
    const input = screen.getByPlaceholderText('Search...');

    expect(input).toHaveClass(customClass);
  });

  it('disables the input when disabled prop is passed', () => {
    render(<Search disabled />);
    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;

    expect(input).toBeDisabled();
  });
});
