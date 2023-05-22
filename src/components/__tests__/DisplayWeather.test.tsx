import { render, screen, act } from "@testing-library/react";
import DisplayWeather from "../DisplayWeather";
import { MemoryRouter } from "react-router-dom";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
import { CityContext } from '../../App'; 

interface WeatherData {
    coord: {
        lon: number;
        lat: number;
    };
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: string;
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

interface Wind {
    speed: number;
    deg: number;
}

interface Clouds {
    all: number;
}

interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

interface Error {
    cod: string;
}

interface TimeZoneAPI {
    formatted: string;
}

beforeEach(() => {
    enableFetchMocks();
    fetchMock.resetMocks();
});

test("mock fetch call", async () => {
    const responseJsonWeather: WeatherData = {
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
            country: "US",
            sunrise: 1560343627,
            sunset: 1560396563,
        },
        timezone: -25200,
        id: 420006353,
        name: "Mountain View",
        cod: "200",
    };

    const responseJsonTime: TimeZoneAPI = {
        formatted: "2023-05-10 12:00:00",
    };

    fetchMock.mockResponses(
        [JSON.stringify(responseJsonWeather), { status: 200 }],
        [JSON.stringify(responseJsonTime), { status: 200 }]
    );

    const responseWeather = await fetch("https://fake-url-for-test-weather");
    const dataWeather: WeatherData = await responseWeather.json();
    expect(dataWeather).toEqual(responseJsonWeather);

    const responseTime = await fetch("https://fake-url-for-test-time");
    const dataTime: TimeZoneAPI = await responseTime.json();
    expect(dataTime).toEqual(responseJsonTime);
});

test("renders DisplayWeather component", async () => {
    const weatherResponse: WeatherData = {
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
            country: "US",
            sunrise: 1560343627,
            sunset: 1560396563,
        },
        timezone: -25200,
        id: 420006353,
        name: "Mountain View",
        cod: "200",
    };

    const timeResponse: TimeZoneAPI = {
        formatted: "2023-05-10 12:00:00",
    };

    fetchMock.mockResponses(
        [JSON.stringify(weatherResponse), { status: 200 }],
        [JSON.stringify(timeResponse), { status: 200 }]
    );

    render(
        <MemoryRouter>
            <DisplayWeather setCity={jest.fn()} />
        </MemoryRouter>
    );

    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const displayWeatherElement = screen.getByTestId("display-weather-page");
    expect(displayWeatherElement).toBeInTheDocument();
});

test("displays error message when a city is not found", async () => {
    const errorResponse: Error = {
        cod: "404",
    };

    fetchMock.mockResponseOnce(
        JSON.stringify(errorResponse),
        { status: 404 }
    );

    const mockSetCity = jest.fn();

    render(
        <CityContext.Provider value={{ city: '', setCity: mockSetCity }}>
            <MemoryRouter>
                <DisplayWeather />
            </MemoryRouter>
        </CityContext.Provider>
    );

    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const errorMessage = screen.getByText(
        /The city you entered does not exist in our database. If it is spelt correctly, and a comma is between the city and country code, try entering another city that is close by./i
    );
    expect(errorMessage).toBeInTheDocument();

    const alertIcon = screen.getByTestId("alert-icon");
    expect(alertIcon).toBeInTheDocument();
});

test("displays error message when fetch request fails", async () => {

    fetchMock.mockRejectOnce(() => Promise.reject("API is down"));

    const mockSetCity = jest.fn();

    render(
        <CityContext.Provider value={{ city: '', setCity: mockSetCity }}>
            <MemoryRouter>
                <DisplayWeather />
            </MemoryRouter>
        </CityContext.Provider>
    );

    const errorMessage = await screen.findByText(
        /The city you entered does not exist in our database./i
    );
    expect(errorMessage).toBeInTheDocument();
});

test("displays correct date and time when weather data is fetched successfully", async () => {
    const weatherResponse: WeatherData = {
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
            country: "US",
            sunrise: 1560343627,
            sunset: 1560396563,
        },
        timezone: -25200,
        id: 420006353,
        name: "Mountain View",
        cod: "200",
    };

    const timeResponse: TimeZoneAPI = {
        formatted: "2023-05-10 12:00:00",
    };

    fetchMock.mockResponses(
        [JSON.stringify(weatherResponse), { status: 200 }],
        [JSON.stringify(timeResponse), { status: 200 }]
    );

    const mockSetCity = jest.fn();

    render(
        <CityContext.Provider value={{ city: '', setCity: mockSetCity }}>
            <MemoryRouter>
                <DisplayWeather />
            </MemoryRouter>
        </CityContext.Provider>
    );

    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText(/Wed, May 10/i)).toBeInTheDocument();
    expect(screen.getByText(/12:00 PM/i)).toBeInTheDocument();
});

