import React, { useEffect, useState, useContext } from "react";
import { CityContext } from "../App";
interface ForecastDataInterface {
    list: Array<{
        dt_txt: string;
        main: {
            temp: number;
            humidity: number;
        };
        weather: Array<{
            icon: string;
            description: string;
        }>;
        wind: {
            speed: number;
        };
    }>;
}

interface DisplayForecastProps {
    forecastDataProp?: ForecastDataInterface;
    isLoading?: boolean;
}

const DisplayForecast: React.FC<DisplayForecastProps> = ({
    forecastDataProp,
    isLoading = false,
}) => {
    const [forecastData, setForecastData] =
        useState<ForecastDataInterface | null>(forecastDataProp ?? null);
    const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
    const { city } = useContext(CityContext);

    // This returns the data at the bottom of the page
    const returnFiveDayForecast = async (city: string) => {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
        try {
            let response = await fetch(url);
            let data = await response.json();
            setForecastData(data);
        } catch (error) {
            console.log(error);
        }
    };

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

    useEffect(() => {
        if (forecastDataProp) {
            setForecastData(forecastDataProp);
        } else {
            returnFiveDayForecast(city);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city, forecastDataProp]);

    try {
        return (
            <div
                data-testid="display-forecast-page"
                style={{ height: "40vh", overflow: "visible", zIndex: "1" }}
                aria-labelledby="display-forecast-heading"
            >
                {!forecastData && isLoading ? (
                    <>
                        <p
                            style={{
                                color: "var(--green)",
                                textAlign: "center",
                                fontSize: "2rem",
                            }}
                            aria-label="Loading..."
                        >
                            Loading...
                        </p>
                    </>
                ) : (
                    <div className="future-forecast">
                        {forecastData &&
                            forecastData.list.slice(0, 5).map((data) => (
                                <div
                                    className="future-forecast-css"
                                    key={data.dt_txt}
                                    data-testid="forecast-css-test"
                                    aria-labelledby={`forecast-${data.dt_txt}`}
                                >
                                    <p
                                        className="future-text-date"
                                        aria-label={getFormattedDate(
                                            data.dt_txt
                                        )}
                                    >
                                        <u data-testid="forecast-date-test">
                                            {getFormattedDate(data.dt_txt)}
                                        </u>
                                    </p>
                                    <p
                                        className="future-text"
                                        data-testid="forecast-text-test"
                                    >
                                        {data.main.temp}&deg;F
                                    </p>
                                    <img
                                        className="icon-images"
                                        style={{ width: "3rem" }}
                                        src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                                        alt={data.weather[0].description}
                                        data-testid="icon-images-test"
                                        aria-label={data.weather[0].description}
                                    />
                                    <p
                                        className="future-text"
                                        data-testid="weather-description-test"
                                    >
                                        {data.weather[0].description}
                                    </p>
                                    <p
                                        className="future-text"
                                        data-testid="humidity-test"
                                    >
                                        {data.main.humidity}%
                                    </p>
                                    <p
                                        className="future-text"
                                        data-testid="wind-speed-test"
                                    >
                                        {data.wind.speed} mph
                                    </p>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.log(error);
        return <p>Sorry, no forecast data available</p>;
    }
};

export default DisplayForecast;
