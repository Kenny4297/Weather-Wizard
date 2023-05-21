import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";

const DisplayCurrentWeather = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | Error | null>(null);
    const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
    const { city } = useParams() as { city: string };
    const timeAPIKey= process.env.REACT_APP_TIMEZONE_API_KEY;
    const [time, setTime] = useState<string>("");
    const [date, setDate] = useState<string>("");

    //Interface for the response from OpenWeatherAPI
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

    interface Error {
        cod: string;
    }

    interface TimeZoneAPI {
        formatted: string
    }

    const getTimeForLocation = useCallback(
        async (lat: string, lng: string) => {
            const timeUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${timeAPIKey}&format=json&by=position&lat=${lat}&lng=${lng}`;
            try {
                const response = await fetch(timeUrl);
                const data = await response.json();

                const dateTime = new Date(data.formatted);

                const formattedDate = dateTime.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "long",
                    day: "numeric",
                });

                const formattedTime = dateTime.toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                });

                setDate(formattedDate);
                setTime(formattedTime);
            } catch (error) {
                console.log(error);
            }
        },
        [timeAPIKey, setDate, setTime]
    );

    const returnCurrentForecast = useCallback(
        async (city: string) => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Weather data fetch failed");
                const data = await response.json();
                setWeatherData(data);

                if (data.cod !== 404) {
                    try {
                        getTimeForLocation(data.coord.lat, data.coord.lon);
                    } catch (error) {
                        console.log(error);
                    }
                }
            } catch (error) {
                console.log(error);
                setWeatherData({ cod: "404" });
            }
        },
        [apiKey, setWeatherData, getTimeForLocation]
    );

    useEffect(() => {
        returnCurrentForecast(city);
    }, [returnCurrentForecast, city]);

    return (
        <div
            data-testid="display-weather-page"
            style={{ height: "100%" }}
            aria-labelledby="display-weather-heading"
        >
            {!weatherData ? (
                <p
                    style={{
                        color: "var(--red3)",
                        display: "flex",
                        justifyContent: "center",
                        position: "relative",
                        top: "10rem",
                        fontSize: "1.5rem",
                        alignItems: "center",
                    }}
                    aria-label="Loading..."
                >
                    <FaSpinner className="spinner" data-testid="spinner" />
                </p>
            ) : 'cod' in weatherData && weatherData.cod === "404" ? (
                <>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            top: "5rem",
                            flexDirection: "column",
                            textAlign: "center",
                            maxHeight: "300px",
                        }}
                        aria-labelledby="error-message-heading"
                    >
                        <p
                            style={{ color: "var(--red3" }}
                            aria-label="Sorry, but your request was inadequate. The city you entered does not exist in our database. If it is spelt correctly, try entering another city that is close by."
                        >
                            The city you
                            entered does not exist in our database. If it is
                            spelt correctly, and a comma is between the city and country code, try entering another city that is
                            close by.
                        </p>
                        <FiAlertCircle
                            size={295}
                            data-testid="alert-icon"
                            style={{ position: "relative", bottom: "1rem" }}
                            aria-hidden="true"
                        />
                    </div>
                </>
            ) : (
                <div
                    className=""
                    style={{
                        boxShadow: "0 0 10px var(--red1)",
                        backgroundColor: "var(--red5)",
                        position: "relative",
                        textAlign: "center",
                        height: "100%",
                    }}
                >
                    <div className="weather-title-box">
                        <h1 className="city-name">
                            <strong>
                                <span
                                    id="display-city-name"
                                    // style={{ textDecoration: "underline" }}
                                >
                                    {(weatherData as WeatherData).name},{" "}
                                    {(weatherData as WeatherData).sys.country}
                                </span>
                            </strong>
                        </h1>
                        <p className="date-and-time">
                            <span id="display-date">{date}</span>
                        </p>
                        <p className="date-and-time">
                            {time}{" "}
                            <span className="local-time ">Local Time</span>
                        </p>
                    </div>

                    <div className="weather-box">
                        <div className="weather-icon-box ">
                            {weatherData ? (
                                <p className="">
                                    <span id="weather-icon">
                                      <img
                                                  className="icon"
                                                  style={{ width: "4.5rem" }}
                                                  src={`http://openweathermap.org/img/w/${(weatherData as WeatherData).weather[0].icon}.png`}
                                                  alt={
                                                    (weatherData as WeatherData).weather[0].description
                                                  }
                                                  aria-label={
                                                    (weatherData as WeatherData).weather[0].description
                                                  }
                                              />
                                      </span>
                                  </p>
                            ) : null}

                            <p className="weather-img-desc">
                                <span
                                    id="display-skies"
                                    style={{
                                        color: "var(--red3)",
                                        fontWeight: "600",
                                    }}
                                >
                                    {(weatherData as WeatherData).weather[0].description}
                                </span>
                            </p>
                        </div>

                        <div className="todays-weather-data">
                            <p className="daily-data-text">
                                <span id="display-temperature">
                                    <span style={{ color: "var(--red1)" }}>
                                        Temp:{" "}
                                    </span>
                                    <span style={{ color: "var(--red3)" }}>
                                        {`${(weatherData as WeatherData).main.temp}`}&deg;F
                                    </span>
                                </span>
                            </p>
                            <p className="daily-data-text">
                                <span id="display-high-temp">
                                    <span
                                        className="todays-numbers max-min"
                                        title="low"
                                    >
                                        {`${(weatherData as WeatherData).main.temp_min}`}&deg;F
                                    </span>
                                    <span className="todays-numbers"> / </span>
                                    <span
                                        className="todays-numbers max-min"
                                        title="high"
                                    >
                                        {`${(weatherData as WeatherData).main.temp_max}`}&deg;F
                                    </span>
                                </span>
                            </p>
                            <p className="daily-data-text">
                                <span id="display-humidity">
                                    <span style={{ color: "var(--red1)" }}>
                                        Humidity:{" "}
                                    </span>
                                    <span style={{ color: "var(--red3)" }}>
                                        {`${(weatherData as WeatherData).main.humidity}%`}
                                    </span>
                                </span>
                            </p>
                            <p className="daily-data-text">
                                <span id="wind-speed">
                                    <span style={{ color: "var(--red1)" }}>
                                        Wind Speed:{" "}
                                    </span>
                                    <span
                                        style={{ color: "var(--red3)" }}
                                    >{`${(weatherData as WeatherData).wind.speed}mph`}</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default DisplayCurrentWeather;
