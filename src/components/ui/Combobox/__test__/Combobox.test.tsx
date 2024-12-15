import { Option } from '@/lib/utils';
import { fireEvent, render, screen } from '@testing-library/react';
import Combobox from '../Combobox';

describe('Combobox Component', () => {
  const options: Option[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  // Mock function for onSelect prop
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    global.ResizeObserver = class MockedResizeObserver {
      observe = jest.fn();
      unobserve = jest.fn();
      disconnect = jest.fn();
    };
  });

  beforeAll(() => {
    Element.prototype.scrollIntoView = jest.fn();
  });

  beforeEach(() => {
    Element.prototype.scrollIntoView = jest.fn();
  });

  test('renders without crashing', () => {
    render(
      <Combobox label="Test Label" options={options} onSelect={mockOnSelect} />
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('displays the label when no option is selected', () => {
    render(
      <Combobox label="Test Label" options={options} onSelect={mockOnSelect} />
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  test('opens the popover when the button is clicked', () => {
    render(
      <Combobox label="Test Label" options={options} onSelect={mockOnSelect} />
    );
    const button = screen.getByRole('combobox');
    fireEvent.click(button);
    expect(
      screen.getByPlaceholderText('Search test label...')
    ).toBeInTheDocument();
  });

  test('displays options in the popover', () => {
    render(
      <Combobox label="Test Label" options={options} onSelect={mockOnSelect} />
    );
    const button = screen.getByRole('combobox');
    fireEvent.click(button);
    options.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  test('selects an option and updates the display', () => {
    render(
      <Combobox label="Test Label" options={options} onSelect={mockOnSelect} />
    );
    const button = screen.getByRole('combobox');
    fireEvent.click(button);

    // Select the second option
    const optionToSelect = screen.getByText('Option 2');
    fireEvent.click(optionToSelect);

    expect(screen.getByRole('combobox')).toHaveTextContent('Option 2');
    // Check that onSelect is called with the correct value
    expect(mockOnSelect).toHaveBeenCalledWith('option2');
  });
});
