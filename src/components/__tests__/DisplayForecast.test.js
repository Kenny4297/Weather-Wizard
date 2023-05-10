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
        })
    );

    render(
        <MemoryRouter>
            <DisplayForecast setCity={jest.fn()} />
        </MemoryRouter>
    );

    await waitFor(() => {
        const displayForecastElement = screen.getByTestId(
            "display-forecast-page"
        );
        expect(displayForecastElement).toBeInTheDocument();

        // Check if the forecast-related elements are rendered
        const forecastDateElement = screen.getByTestId("forecast-date");
        expect(forecastDateElement).toHaveTextContent(/wednesday, may 10/i);
        const temperatureElement = screen.getByText(/68.43°F/i);
        expect(temperatureElement).toBeInTheDocument();
        const descriptionElement = screen.getByText(/clear sky/i);
        expect(descriptionElement).toBeInTheDocument();
        const humidityElement = screen.getByText(/41%/i);
        expect(humidityElement).toBeInTheDocument();
        const windSpeedElement = screen.getByText(/4.72 mph/i);
        expect(windSpeedElement).toBeInTheDocument();

        // Check if the weather icon is rendered with correct src and alt
        const weatherIcon = screen.getByAltText(/clear sky/i);
        expect(weatherIcon).toBeInTheDocument();
        expect(weatherIcon.src).toContain(
            "http://openweathermap.org/img/w/01d.png"
        );
    });
});

test("renders Loading... text while fetching data", async () => {
    fetch.mockResponseOnce(
        // Simulate a delayed response
        () =>
            new Promise((resolve) =>
                setTimeout(
                    () =>
                        resolve({
                            body: JSON.stringify({
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
                                        wind: {
                                            speed: 4.72,
                                            deg: 70,
                                            gust: 6.33,
                                        },
                                        sys: { pod: "d" },
                                    },
                                ],
                            }),
                        }),
                    100
                )
            )
    );

    render(
        <MemoryRouter>
            <DisplayForecast setCity={jest.fn()} testMode={true} />
        </MemoryRouter>
    );

    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();

    // Clean up after test
    await waitFor(() => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
});
