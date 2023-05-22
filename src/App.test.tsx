import { render, screen, fireEvent } from '@testing-library/react';
import { CityContext } from './App';
import React, { useContext } from 'react';

test('updates city context', () => {
  const TestComponent = () => {
    const { city, setCity } = useContext(CityContext);

    return (
      <div>
        <p>{city}</p>
        <button onClick={() => setCity('Test City')}>Update City</button>
      </div>
    );
  };

  const { rerender } = render(
    <CityContext.Provider value={{ city: "", setCity: () => {} }}>
      <TestComponent />
    </CityContext.Provider>
  );

  rerender(
    <CityContext.Provider value={{ city: "Test City", setCity: () => {} }}>
      <TestComponent />
    </CityContext.Provider>
  );

  fireEvent.click(screen.getByText('Update City'));
  expect(screen.getByText('Test City')).toBeInTheDocument();
});





