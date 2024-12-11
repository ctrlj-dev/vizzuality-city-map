import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IconButton, { iconButtonVariants } from '../IconButton';

describe('IconButton Component', () => {
  it('renders the icon correctly', () => {
    render(<IconButton icon={<span data-testid="icon">Icon</span>} />);
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent('Icon');
  });

  it('applies default variants', () => {
    render(<IconButton icon={<span>Icon</span>} />);
    const button = screen.getByTestId('icon-button');
    expect(button).toHaveClass(
      iconButtonVariants({ variant: 'default', size: 'default' })
    );
  });

  it('applies custom variant and size classes', () => {
    render(
      <IconButton
        variant="ghost"
        size="lg"
        icon={<span>Icon</span>}
        className="custom-class"
      />
    );
    const button = screen.getByTestId('icon-button');
    expect(button).toHaveClass(
      iconButtonVariants({ variant: 'ghost', size: 'lg' })
    );
    expect(button).toHaveClass('custom-class');
  });

  it('triggers the `onClick` handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<IconButton onClick={handleClick} icon={<span>Icon</span>} />);
    const button = screen.getByTestId('icon-button');
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies `disabled` attribute and prevents interaction', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <IconButton onClick={handleClick} icon={<span>Icon</span>} disabled />
    );
    const button = screen.getByTestId('icon-button');
    expect(button).toBeDisabled();
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
