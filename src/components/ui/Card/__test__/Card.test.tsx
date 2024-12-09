// Card.test.tsx
import { render, screen } from '@testing-library/react';
import { Card, CardAction, CardContent, CardItem, CardTitle } from '../Card';

describe('Card Components', () => {
  test('renders Card component with default styles', () => {
    render(<Card data-testid="card">Card Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass(
      'relative block px-4 py-2 rounded-sm border-b border-primary-100 hover:bg-primary-100 transition-colors cursor-pointer group'
    );
  });

  test('renders CardTitle component with default styles', () => {
    render(<CardTitle data-testid="card-title">Card Title</CardTitle>);
    const cardTitle = screen.getByTestId('card-title');
    expect(cardTitle).toBeInTheDocument();
    expect(cardTitle).toHaveClass(
      'font-bold text-xl leading-7 text-primary-800 mb-1'
    );
  });

  test('renders CardContent component with default styles', () => {
    render(<CardContent data-testid="card-content">Card Content</CardContent>);
    const cardContent = screen.getByTestId('card-content');
    expect(cardContent).toBeInTheDocument();
    expect(cardContent).toHaveClass('mb-2');
  });

  test('renders CardItem component with default styles', () => {
    render(<CardItem data-testid="card-item">Card Item</CardItem>);
    const cardItem = screen.getByTestId('card-item');
    expect(cardItem).toBeInTheDocument();
    expect(cardItem).toHaveClass('flex items-center gap-2 mb-2;');
  });

  test('renders CardAction component with default styles', () => {
    render(<CardAction data-testid="card-action">Card Action</CardAction>);
    const cardAction = screen.getByTestId('card-action');
    expect(cardAction).toBeInTheDocument();
    expect(cardAction).toHaveClass(
      'absolute h-10 bottom-2 right-2 flex items-center'
    );
  });

  test('accepts additional className props', () => {
    render(
      <Card className="custom-class" data-testid="card-with-class">
        Card Content
      </Card>
    );
    const card = screen.getByTestId('card-with-class');
    expect(card).toHaveClass('custom-class');
  });
});
