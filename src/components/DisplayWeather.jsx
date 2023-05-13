import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";

const DisplayCurrentWeather = () => {
    const [weatherData, setWeatherData] = useState(null);
    // const apiKey = "0c8087e93b7bd6b5e9d6fbd5daee1b51";
    const apiKey = process.env.REACT_APP_API_KEY;
    const { city } = useParams();
    const timeAPIKey = "ZCTR7FVB0K4V";
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    const getTimeForLocation = useCallback(
        async (lat, lng) => {
            const timeUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${timeAPIKey}&format=json&by=position&lat=${lat}&lng=${lng}`;
            try {
                const response = await fetch(timeUrl);
                const data = await response.json();

                // Parse the date and time from the API response
                const dateTime = new Date(data.formatted);

                // Extract and format the date
                const formattedDate = dateTime.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "long",
                    day: "numeric",
                });

                // Extract and format the time
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
        async (city) => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Weather data fetch failed");
                const data = await response.json();
                setWeatherData(data);

                if (data.cod !== "404") {
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

    const mapWeatherIcon = (code) => {
        switch (code) {
            case "01d":
             return "fas fa-sun";
            case "01n":
                return "fas fa-moon";
            case "02d":
                return "fas fa-cloud-sun";
            case "02n":
                return "fas fa-cloud-moon";
            case "03d":
                return "fas fa-cloud";
            case "03n":
                return "fas fa-cloud";
            case "04d":
                return "fas fa-cloud";
            case "04n":
                return "fas fa-cloud";
            case "09d":
                return "fas fa-cloud-showers-heavy";
            case "09n":
                return "fas fa-cloud-showers-heavy";
            case "10d":
                return "fas fa-cloud-sun-rain";
            case "10n":
                return "fas fa-cloud-moon-rain";
            case "11d":
                return "fas fa-bolt";
            case "11n":
                return "fas fa-bolt";
            case "13d":
                return "fas fa-snowflake";
            case "13n":
                return "fas fa-snowflake";
            case "50d":
                return "fas fa-smog";
            case "50n":
                return "fas fa-smog";
            default:
                return "fas fa-question";
        }
    };

    return (
        <div data-testid="display-weather-page" style={{ height: "100%" }}>
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
                >
                    <FaSpinner className="spinner" data-testid="spinner" />
                </p>
            ) : weatherData.cod === "404" ? (
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
                    >
                        <p style={{ color: "var(--red3" }}>
                            Sorry, but your request was inadequate. The city you
                            entered does not exist in our database. If it is
                            spelt correctly, try entering another city that is
                            close by.
                        </p>
                        <FiAlertCircle
                            size={295}
                            data-testid="alert-icon"
                            style={{ position: "relative", bottom: "1rem" }}
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
                                    {weatherData.name},{" "}
                                    {weatherData.sys.country}
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
                                <i
                                  className={`${mapWeatherIcon(weatherData.weather[0].icon)} icon fa-2x`}
                                  aria-label={weatherData.weather[0].description}
                                  title={weatherData.weather[0].description}
                                  data-testid={`${weatherData.weather[0].icon}-icon`}
                                ></i>
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
                                    {weatherData.weather[0].description}
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
                                        {`${weatherData.main.temp}`}&deg;F
                                    </span>
                                </span>
                            </p>
                            <p className="daily-data-text">
                                <span id="display-high-temp">
                                    <span
                                        className="todays-numbers max-min"
                                        title="low"
                                    >
                                        {`${weatherData.main.temp_min}`}&deg;F
                                    </span>
                                    <span className="todays-numbers"> / </span>
                                    <span
                                        className="todays-numbers max-min"
                                        title="high"
                                    >
                                        {`${weatherData.main.temp_max}`}&deg;F
                                    </span>
                                </span>
                            </p>
                            <p className="daily-data-text">
                                <span id="display-humidity">
                                    <span style={{ color: "var(--red1)" }}>
                                        Humidity:{" "}
                                    </span>
                                    <span style={{ color: "var(--red3)" }}>
                                        {`${weatherData.main.humidity}%`}
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
                                    >{`${weatherData.wind.speed}mph`}</span>
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
