import { render, screen } from '@testing-library/react';
import App from './App';

test('renders epoch times sweden link', () => {
  render(<App />);
  const linkElement = screen.getByText(/epoch times sverige/i);
  expect(linkElement).toBeInTheDocument();
});
