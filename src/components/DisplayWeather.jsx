import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import ErrorMessage from '../Utils/ErrorMessage'

const DisplayCurrentWeather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = "0c8087e93b7bd6b5e9d6fbd5daee1b51";
    const { city } = useParams();
    const timeAPIKey = "ZCTR7FVB0K4V";
    const [time, setTime] = useState("");
    const [errorMessage, setErrorMessage] = useState(null)

    const getTimeForLocation = async (lat, lng) => {
        const timeUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${timeAPIKey}&format=json&by=position&lat=${lat}&lng=${lng}`;
        try {
            const response = await fetch(timeUrl);
            const data = await response.json();
            const currentTime = new Date(); // get the current time
            const timezoneOffsetSeconds = data.gmtOffset; // get the timezone offset in seconds
            const timezoneOffsetMilliseconds = timezoneOffsetSeconds * 1000; // convert to milliseconds
            const timeWithOffset = new Date(
                currentTime.getTime() +
                    5 * 60 * 60 * 1000 +
                    timezoneOffsetMilliseconds
            ); // add 5 hours worth of milliseconds and the offset to the current time
            const time = timeWithOffset.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            });
            setTime(time);
        } catch (error) {
            console.log(error);
        }
    };

    const returnCurrentForecast = async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setWeatherData(data);
            getTimeForLocation(data.coord.lat, data.coord.lon); // call the function to get time for location
        } catch (error) {
            console.log(error);
            setErrorMessage('Ops! The city you entered does not match a city in our database. Check your spelling, or enter another city close by it.');
        }
    };

    useEffect(() => {
        returnCurrentForecast(city);
    }, [city]);

    return (
        <div className="row mx-auto future-information-section">
            {console.log(`Weather data is:${JSON.stringify(weatherData)}`)}
            {!weatherData ? (
                <p>Test test</p>
                ) : weatherData.cod === "404" ? (
                <ErrorMessage message="Sorry, your request was inadequate. The city you entered does not exist in our database. If it is spelt correctly, try entering another city that is close by. " />
                ) : (
            <div className="col">
                <div
                className="row row-weather text-center current-forecast-css"
                style={{
                    borderRadius: "20px",
                    boxShadow: "0 0 10px var(--red2)",
                    padding: "20px",
                    backgroundColor: "var(--red5)",
                    width: "30vw",
                }}
                >
                {console.log("weatherData is not null, rendering content...")}
                <div className="col todays-weather-specs h-25 w-100">
                    <h2>
                    <strong>
                        <span
                        id="display-city-name"
                        style={{ textDecoration: "underline" }}
                        >
                        {weatherData.name}
                        </span>
                    </strong>
                    </h2>
                    <p>
                    <span className="todays-weather" id="display-date">
                        {dayjs().$d.toString().substring(0, 10)}
                    </span>
                    </p>
                    <p className="todays-numbers">{time}</p>
                    {weatherData ? (
                    <p>
                        <span id="weather-icon">
                        <img
                            style={{ width: "100px" }}
                            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                            alt={weatherData.weather[0].description}
                        />
                        </span>
                    </p>
                    ) : null}
                    <p>
                    <span className="todays-numbers" id="display-skies">
                        {weatherData.weather[0].description}
                    </span>
                    </p>
                    <p>
                    <span id="display-temperature">
                        <span className="todays-weather">Current Temperature:</span>
                        <span className="todays-numbers">
                        {`${weatherData.main.temp}`}&deg;F
                        </span>
                    </span>
                    </p>
                    <p>
                    <span id="display-high-temp">
                        <span
                        className="todays-numbers max-min"
                        title="max"
                        >{`${weatherData.main.temp_max}`}&deg;F</span>
                        <span className="todays-numbers">/ </span>
                        <span
                        className="todays-numbers max-min"
                        title="min"
                        >{`${weatherData.main.temp_min}`}&deg;F</span>
                    </span>
                    </p>
                    <p>
                    <span id="display-humidity">
                        <span className="todays-weather">Humidity: </span>
                        <span className="todays-numbers">
                        {`${weatherData.main.humidity}%`}
                        </span>
                    </span>
                    </p>
                    <p>
                    <span id="wind-speed">
                        <span className="todays-weather">Wind Speed: </span>
                        <span className="todays-numbers">{`${weatherData.wind.speed}mph`}</span>
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
