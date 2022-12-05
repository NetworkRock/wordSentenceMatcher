import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App'

test('renders learn react link', () => {
  render(<App />);
  const headerText = screen.getByText(/Match words and sentences!/i);
  expect(headerText).toBeInTheDocument();
});


test.todo('renders the search sentences and words field')

test.todo('renders the textarea field')