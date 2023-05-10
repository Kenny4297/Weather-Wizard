import { render, screen, act, waitFor } from "@testing-library/react";
import DisplayForecast from "../DisplayForecast";
import React from "react";
import { MemoryRouter } from "react-router-dom";

beforeEach(() => {
  fetch.resetMocks();
});

test("renders DisplayForecast component", async () => {
  fetch.mockResponseOnce(
    JSON.stringify({
        list: [
            {
            dt_txt: "2023-05-10 03:00:00",
            main: {
                temp: 68.43,
                feels_like: 66.9,
                temp_min: 68.43,
                temp_max: 71.13,
                pressure: 1014,
                humidity: 41,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
            clouds: { all: 3 },
            wind: { speed: 4.72, deg: 70, gust: 6.33 },
            sys: { pod: "d" },
            }
        ],
        })
    );

  render(
    <MemoryRouter>
      <DisplayForecast setCity={jest.fn()} />
    </MemoryRouter>
  );

  await act(async () => {
    // Wait for the component to update after the fetch
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  await waitFor(() => {
    const displayForecastElement = screen.getByTestId("display-forecast-page");
    expect(displayForecastElement).toBeInTheDocument();
  });
});


test("renders Loading... text while fetching data", async () => {
    fetch.mockResponseOnce(
      // Simulate a delayed response
      () => new Promise((resolve) => setTimeout(() => resolve({ body: JSON.stringify({
        list: [
            {
            dt_txt: "2023-05-10 03:00:00",
            main: {
                temp: 68.43,
                feels_like: 66.9,
                temp_min: 68.43,
                temp_max: 71.13,
                pressure: 1014,
                humidity: 41,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
            clouds: { all: 3 },
            wind: { speed: 4.72, deg: 70, gust: 6.33 },
            sys: { pod: "d" },
            }
        ],
        }) }), 100))
    );
  
    render(
      <MemoryRouter>
        <DisplayForecast />
      </MemoryRouter>
    );
  
    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
  
    // Clean up after test
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });