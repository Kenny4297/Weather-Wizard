import { render, screen } from '@testing-library/react';
import IntroPage from '../IntroPage';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';


test('renders IntroPage component', () => {
  render(
    <MemoryRouter>
      <IntroPage setCity={jest.fn()} />
    </MemoryRouter>
  );
  const introPageElement = screen.getByTestId('intro-page');
  expect(introPageElement).toBeInTheDocument();
});
