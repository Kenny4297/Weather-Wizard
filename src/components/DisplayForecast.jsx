import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DisplayForecast = () => {
    const [forecastData, setForecastData] = useState(null);
    const apiKey = "0c8087e93b7bd6b5e9d6fbd5daee1b51";
    const { city } = useParams();

    // This returns the data at the bottom of the page
    const returnFiveDayForecast = async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
        try {
            let response = await fetch(url);
            let data = await response.json();
            setForecastData(data);
        } catch (error) {
            console.log(error);
        }
    };

    function getFormattedDate(dateStr) {
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

        const date = new Date(dateStr);
        const dayOfWeek = daysOfWeek[date.getDay()];
        const month = months[date.getMonth()];
        const day = date.getDate();
        return `${dayOfWeek}, ${month} ${day}`;
    }

    useEffect(() => {
        returnFiveDayForecast(city);
    }, [city]);

    try {
        return (
            <div style={{ height: "40vh", overflow: "visible", zIndex: "1" }}>
                {!forecastData ? (
                    <><p>No forecast data available</p></>
                ) : (
                    <div className="future-forecast">
                        {forecastData &&
                            forecastData.list
                                .filter((data, index) => index % 8 === 3)
                                .map((data) => (
                                    <div
                                        className="future-forecast-css"
                                        key={data.dt}
                                    >
                                        <p className="future-text-date">
                                            <u>
                                                {getFormattedDate(data.dt_txt)}
                                            </u>
                                        </p>
                                        <p className="future-text">
                                            {data.main.temp}&deg;F
                                        </p>
                                        <img
                                            className="icon-images"
                                            style={{ width: "3rem" }}
                                            src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                                            alt={data.weather[0].description}
                                        />
                                        <p className="future-text">
                                            {data.weather[0].description}
                                        </p>
                                        <p className="future-text">
                                            {data.wind.speed} mph
                                        </p>
                                        <p className="future-text">
                                            {data.main.humidity}%
                                        </p>
                                    </div>
                                ))}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.log(error);
        <p>Sorry, no forecast data available</p>
    }
};

export default DisplayForecast;
