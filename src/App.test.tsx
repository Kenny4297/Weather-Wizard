import { render, screen, fireEvent } from '@testing-library/react';
import { CityContext } from './App';
import React, { useContext } from 'react';
import { MemoryRouter } from 'react-router-dom';
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


// Mock API calls
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
      city: "mockCity"
    }),
    useRouteMatch: () => ({ url: '/displayWeather/mockCity' }),
  }));
  
  test("renders WeatherResultsPage", async () => {
    render(
      <CityContext.Provider value={{ city: "mockCity", setCity: jest.fn() }}>
        <App />
      </CityContext.Provider>
    );
    const displayWeatherElement = await screen.findByTestId("display-weather");
    const displayForecastElement = await screen.findByTestId("display-forecast");
    expect(displayWeatherElement).toBeInTheDocument();
    expect(displayForecastElement).toBeInTheDocument();
  });

