import { render, screen, fireEvent } from '@testing-library/react';
import { CityContext } from './App';
import React, { useContext } from 'react';
import App from './App';

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


test("only IntroPage is rendered when city is an empty string", () => {
    render(<App />);

    // Check that the IntroPage component is in the document
    const introPageElement = screen.getByTestId('intro-page');
    expect(introPageElement).toBeInTheDocument();

    // Check that the DisplayCurrentWeather and DisplayForecast components are not in the document
    const currentWeatherElement = screen.queryByTestId('display-current-weather-page');
    const forecastElement = screen.queryByTestId('display-forecast-page');

    expect(currentWeatherElement).not.toBeInTheDocument();
    expect(forecastElement).not.toBeInTheDocument();
});





