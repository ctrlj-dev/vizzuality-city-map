import { render, screen } from '@testing-library/react';
import Sidebar from '../Sidebar';

describe('Sidebar Component', () => {
  it('renders the children correctly', () => {
    render(
      <Sidebar>
        <p>Test Content</p>
      </Sidebar>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default classes', () => {
    render(<Sidebar>Sidebar Content</Sidebar>);

    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveClass(
      'relative flex flex-col p-4 lg:p-10 bg-white border-r border-gray-200 md:overflow-y-auto h-[100vh] animate-slide-in'
    );
  });

  it('applies custom classes passed through className', () => {
    render(
      <Sidebar className="custom-class">
        <p>Sidebar Content</p>
      </Sidebar>
    );

    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveClass('custom-class');
  });

  it('passes additional props to the aside element', () => {
    render(
      <Sidebar data-testid="sidebar">
        <p>Sidebar Content</p>
      </Sidebar>
    );

    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toBeInTheDocument();
  });
});
