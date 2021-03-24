import { render, screen } from '@testing-library/react';
import { Main } from './Main';

test('first test', () => {
  render(<Main />);
  const linkElement = screen.getByText(/home/);
  expect(linkElement).toBeInTheDocument();
});
