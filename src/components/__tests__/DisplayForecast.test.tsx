import { render, screen, waitFor } from "@testing-library/react";
import DisplayForecast from "../DisplayForecast";
import React from "react";
import { MemoryRouter } from "react-router-dom";

const getFormattedDate = (dateStr: string): string => {
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    // Editing the response for better UX
    const date = new Date(dateStr.replace(" ", "T"));
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${dayOfWeek}, ${month} ${day}`;
};

beforeEach(() => {
  global.fetch = jest.fn().mockReset();
});

test("renders DisplayForecast component", async () => {
    const mockDate = "2023-05-10 03:00:00";
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
              weather: [
                {
                  id: 800,
                  main: "Clear",
                  description: "clear sky",
                  icon: "01d",
                },
              ],
              clouds: { all: 3 },
              wind: { speed: 4.72, deg: 70, gust: 6.33 },
              sys: { pod: "d" },
            },
          ],
        }),
    })
  );

  render(
    <MemoryRouter>
      <DisplayForecast />
    </MemoryRouter>
  );

  await waitFor(() => {
    const displayForecastElement = screen.getByTestId(
        "display-forecast-page"
    );
    expect(displayForecastElement).toBeInTheDocument();

    const formattedDate = getFormattedDate(mockDate);

    const forecastDateElement = screen.getByTestId("forecast-date");
    expect(forecastDateElement).toHaveTextContent(new RegExp(formattedDate, 'i'));
    const temperatureElement = screen.getByText(/68.43°F/i);
    expect(temperatureElement).toBeInTheDocument();
    const descriptionElement = screen.getByText(/clear sky/i);
    expect(descriptionElement).toBeInTheDocument();
    const humidityElement = screen.getByText(/41%/i);
    expect(humidityElement).toBeInTheDocument();
    const windSpeedElement = screen.getByText(/4.72 mph/i);
    expect(windSpeedElement).toBeInTheDocument();

    // Check if the weather icon is rendered with correct src and alt
    const weatherIcon = screen.getByAltText(/clear sky/i) as HTMLImageElement;
    expect(weatherIcon).toBeInTheDocument();
    expect(weatherIcon.src).toContain(
        "http://openweathermap.org/img/w/01d.png"
    );
  });
});