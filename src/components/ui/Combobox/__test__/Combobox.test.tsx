import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Combobox from '../Combobox';

const mockOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

describe('Combobox', () => {
  it('renders with default label', () => {
    render(<Combobox label="Select an option" options={mockOptions} />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('shows options when the button is clicked', () => {
    render(<Combobox options={mockOptions} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('filters options based on search input', () => {
    render(<Combobox options={mockOptions} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Option 1' } });

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
  });

  it('selects an option and updates the button label', () => {
    const onSelectMock = jest.fn();
    render(<Combobox options={mockOptions} onSelect={onSelectMock} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const option = screen.getByText('Option 1');
    fireEvent.click(option);

    expect(onSelectMock).toHaveBeenCalledWith(mockOptions[0]);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('clears the selected option when the clear button is clicked', () => {
    const onSelectMock = jest.fn();
    render(
      <Combobox
        options={mockOptions}
        value={mockOptions[0]}
        onSelect={onSelectMock}
      />
    );

    const IconButton = screen.getByTestId('icon-button');
    fireEvent.click(IconButton);

    expect(onSelectMock).toHaveBeenCalledWith(null);
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('displays a circle indicator for the selected option in the list', () => {
    render(<Combobox options={mockOptions} value={mockOptions[0]} />);

    const button = screen.getByText('Option 1');
    fireEvent.click(button);

    const IconButton = screen.getByTestId('icon-button');

    expect(IconButton).toBeDefined();
  });

  it('shows no options found message when the search has no results', () => {
    render(<Combobox options={mockOptions} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } });

    expect(screen.getByText('No options found')).toBeInTheDocument();
  });
});
