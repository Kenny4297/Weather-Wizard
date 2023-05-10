import { render, screen, act } from "@testing-library/react";
import DisplayWeather from "../DisplayWeather";
import React from "react";
import { MemoryRouter } from "react-router-dom";

beforeEach(() => {
  fetch.resetMocks();
});

test("renders DisplayWeather component", async () => {
  fetch.mockResponseOnce(
    JSON.stringify({
        coord: { lon: -122.08, lat: 37.39 },
        weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
        base: "stations",
        main: { temp: 282.55, feels_like: 281.86, temp_min: 280.37, temp_max: 284.26, pressure: 1023, humidity: 100 },
        visibility: 16093,
        wind: { speed: 1.5, deg: 350 },
        clouds: { all: 1 },
        dt: 1560350645,
        sys: { type: 1, id: 5122, message: 0.0139, country: "US", sunrise: 1560343627, sunset: 1560396563 },
        timezone: -25200,
        id: 420006353,
        name: "Mountain View",
        cod: 200,
      })
    );

  render(
    <MemoryRouter>
      <DisplayWeather setCity={jest.fn()} />
    </MemoryRouter>
  );

  await act(async () => {
    // Wait for the component to update after the fetch
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  const displayWeatherElement = screen.getByTestId("display-weather-page");
  expect(displayWeatherElement).toBeInTheDocument();
});
