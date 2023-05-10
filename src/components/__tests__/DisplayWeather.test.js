import { render, screen, act, waitForElementToBeRemoved } from "@testing-library/react";
import DisplayWeather from "../DisplayWeather";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
    fetchMock.enableMocks();
  });

beforeEach(() => {
    fetch.resetMocks();
});

test("renders DisplayWeather component", async () => {
    fetch.mockResponseOnce(
        JSON.stringify({
            coord: { lon: -122.08, lat: 37.39 },
            weather: [
                {
                    id: 800,
                    main: "Clear",
                    description: "clear sky",
                    icon: "01d",
                },
            ],
            base: "stations",
            main: {
                temp: 282.55,
                feels_like: 281.86,
                temp_min: 280.37,
                temp_max: 284.26,
                pressure: 1023,
                humidity: 100,
            },
            visibility: 16093,
            wind: { speed: 1.5, deg: 350 },
            clouds: { all: 1 },
            dt: 1560350645,
            sys: {
                type: 1,
                id: 5122,
                message: 0.0139,
                country: "US",
                sunrise: 1560343627,
                sunset: 1560396563,
            },
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

// 1. Test the component when data is being fetched (show spinner)
test("displays spinner while fetching data", () => {
    render(
        <MemoryRouter>
            <DisplayWeather setCity={jest.fn()} />
        </MemoryRouter>
    );

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
});

// 2. Test the component when a city is not found (display error message)
test("displays error message when a city is not found", async () => {
    fetch.mockResponseOnce(
        JSON.stringify({
            cod: "404",
            message: "city not found",
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

    const errorMessage = screen.getByText(
        /Sorry, but your request was inadequate. The city you entered does not exist in our database. If it is spelt correctly, try entering another city that is close by./i
    );
    expect(errorMessage).toBeInTheDocument();

    const alertIcon = screen.getByTestId("alert-icon");
    expect(alertIcon).toBeInTheDocument();
});

// 3. Test the component when the fetch request fails (network error or other issues)
test('displays error message when fetch request fails', async () => {
    // Mock the failed fetch request
    fetchMock.mockResponseOnce(JSON.stringify({ cod: "404" }));
  
    render(<DisplayWeather />);
  
    // Wait for the error message to appear in the DOM
    const errorMessage = await screen.findByText(/Sorry, but your request was inadequate/i);
  
    // Check if the error message is in the document
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays correct date and time when weather data is fetched successfully", async () => {
    // Mock weather API response
    fetch.mockResponses(
      [
        JSON.stringify({
            coord: { lon: -122.08, lat: 37.39 },
            weather: [
                {
                    id: 800,
                    main: "Clear",
                    description: "clear sky",
                    icon: "01d",
                },
            ],
            base: "stations",
            main: {
                temp: 282.55,
                feels_like: 281.86,
                temp_min: 280.37,
                temp_max: 284.26,
                pressure: 1023,
                humidity: 100,
            },
            visibility: 16093,
            wind: { speed: 1.5, deg: 350 },
            clouds: { all: 1 },
            dt: 1560350645,
            sys: {
                type: 1,
                id: 5122,
                message: 0.0139,
                country: "US",
                sunrise: 1560343627,
                sunset: 1560396563,
            },
            timezone: -25200,
            id: 420006353,
            name: "Mountain View",
            cod: 200,
        }),
        { status: 200 },
      ],
      [
        JSON.stringify({
          status: "OK",
          message:"",
          countryCode:"US",
          countryName:"United States",
          regionName:"Minnesota",
          cityName:"Lino Lakes",
          zoneName:"America/Chicago",
          abbreviation:"CDT",
          gmtOffset:-18000,
          dst:"1",
          zoneStart:1678608000,
          zoneEnd:1699167600,
          nextAbbreviation:"CST",
          timestamp:1683740088,
          formatted:"2023-05-10 12:00:00"}
        ),
        { status: 200 },
      ]
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
  
    // Assert that the expected date and time values are in the document
    expect(screen.getByText(/Wed, May 10/i)).toBeInTheDocument();
    expect(screen.getByText(/12:00 PM/i)).toBeInTheDocument();
  
    // Clean up fetch mocks
    fetch.resetMocks();
  });
