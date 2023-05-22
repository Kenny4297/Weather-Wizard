import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface DisplayForecastProps {
    testMode?: boolean;
}

// 'testMode - false' for second test
const DisplayForecast: React.FC<DisplayForecastProps> = ({ testMode }) => {
    const [forecastData, setForecastData] = useState<ForecastResponse | null>(null);
    const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
    const { city } = useParams() as { city: string };

    interface ForecastResponse {
        list: ForecastListItem[];
    }

    interface ForecastListItem {
        dt_txt: string; 
        main: Main;
        weather: Weather[];
        wind: Wind;
        sys: Sys;
    }
    
    interface Main {
        temp: number; 
        humidity: number; 
    }
    
    interface Weather {
        description: string; 
        icon: string; 
    }
    
    interface Wind {
        speed: number; 
    }
    
    interface Sys {
        pod: string;
    }
    

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
        returnFiveDayForecast(city);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city]);

    try {
        return (
            <div
                data-testid="display-forecast-page"
                style={{ height: "40vh", overflow: "visible", zIndex: "1" }}
                aria-labelledby="display-forecast-heading"
            >
                {!forecastData ? (
                    <>
                        <p
                            style={{
                                color: "var(--red3)",
                                textAlign: "center",
                                fontSize: "2rem",
                            }}
                            aria-label="Loading..."
                        >
                            Loading...
                        </p>
                    </>
                ) : (
                    <div className="future-forecast" data-testid="forecast-date">
                        {forecastData &&
                            forecastData.list
                                .reduce((uniqueIndices: number[], data, index) => {
                                    if (
                                        uniqueIndices.length < 5 &&
                                        (testMode || index % 8 === 3) &&
                                        uniqueIndices.every(
                                            (storedIndex) =>
                                                getFormattedDate(
                                                    forecastData.list[
                                                        storedIndex
                                                    ].dt_txt
                                                ).slice(0, 10) !==
                                                getFormattedDate(
                                                    data.dt_txt
                                                ).slice(0, 10)
                                        )
                                    ) {
                                        uniqueIndices.push(index);
                                    }
                                    return uniqueIndices;
                                }, [] as number[])
                                .map((uniqueIndex) => {
                                    const data = forecastData.list[uniqueIndex];
                                    return (
                                        <div
                                            className="future-forecast-css"
                                            key={data.dt_txt}
                                            aria-labelledby={`forecast-${data.dt_txt}`}
                                        >
                                            <p
                                                data-testid="forecast-date"
                                                className="future-text-date"
                                                aria-label={getFormattedDate(
                                                    data.dt_txt
                                                )}
                                            >
                                                <u>
                                                    {getFormattedDate(
                                                        data.dt_txt
                                                    )}
                                                </u>
                                            </p>
                                            <p className="future-text">
                                                {data.main.temp}&deg;F
                                            </p>
                                            <img
                                                className="icon-images"
                                                style={{ width: "3rem" }}
                                                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                                                alt={
                                                    data.weather[0].description
                                                }
                                                aria-label={
                                                    data.weather[0].description
                                                }
                                            />
                                            <p className="future-text">
                                                {data.weather[0].description}
                                            </p>
                                            <p className="future-text">
                                                {data.main.humidity}%
                                            </p>
                                            <p className="future-text">
                                                {data.wind.speed} mph
                                            </p>
                                        </div>
                                    );
                                })}
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
