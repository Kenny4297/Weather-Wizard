import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { FiAlertCircle } from 'react-icons/fi';


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
        <div style={{border:'2px solid purple'}}>
            {console.log(`Weather data is:${JSON.stringify(weatherData)}`)}
            {!weatherData ? (
                <p style={{color:'var(--Red1)'}}>Loading...</p>
                ) : weatherData.cod === "404" ? (
                    <>
                        <div style={{
                            color: 'var(--red1)',
                            display:'flex',
                            border:'2px solid green',
                            justifyContent:'center',
                            alignItems:'center',
                            position: 'relative',
                            flexDirection:'column',
                            textAlign:'center',
                            top: '1rem',
                            maxHeight:'300px'
                        }}>
                            <p >Sorry, but your request was inadequate. The city you entered does not exist in our database. If it is spelt correctly, try entering another city that is close by. </p>
                    <FiAlertCircle size={295} style={{position:'relative', bottom:'1rem'}} />

                    </div>
                </>
                ) : (
            <div className="row" style={{height: '100%'}}>
                <div
                className="col text-center"
                style={{
                    borderRadius: "20px",
                    boxShadow: "0 0 10px var(--red2)",
                    backgroundColor: "var(--red5)",
                    width: "100%",
                    margin: '1rem',
                    height: '20rem'
                    // height: '60%',
                    // marginTop: '1rem',
                    // marginBottom: 'rem'
                }}
                >
                    {console.log("weatherData is not null, rendering content...")}
                    <div className="col" style={{
                            maxHeight: '6.25rem', 
                            fontSize: '1.3rem',
                            // marginBottom:'2rem',
                            // overflow:'hidden', 
                            lineHeight:'1rem'}}>
                        <h4>
                            <strong>
                                <span
                                id="display-city-name"
                                style={{ textDecoration: "underline" }}
                                >
                                {weatherData.name}
                                </span>
                            </strong>
                        </h4>
                        <p>
                        <span className="todays-weather" id="display-date">
                            {dayjs().$d.toString().substring(0, 10)}
                        </span>
                        </p>
                        <p className="todays-numbers">{time} Local time</p>

                        <div className="row" style={{border:'2px solid red', height: '14rem'}}>
                            <div className="col" style={{border:'2px solid blue'}}>
                                {weatherData ? (
                                <p>
                                    <span id="weather-icon">
                                    <img
                                        style={{ width: "8rem" }}
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
                            </div>
                                
                            <div className="col d-flex flex-column justify-content-center align-items-center" style={{
                                    border:'2px solid blue',
                                    lineHeight:'1.7rem'
                                    }}>
                                <p>
                                    <span id="display-temperature">
                                        <span className="todays-weather">Temp: </span>
                                        <span className="todays-numbers">
                                        {`${weatherData.main.temp}`}&deg;F
                                    </span>
                                </span>
                                </p>
                                <p>
                                <span id="display-high-temp">
                                    <span
                                    className="todays-numbers max-min"
                                    title="min"
                                    >{`${weatherData.main.temp_min}`}&deg;F</span>
                                    <span className="todays-numbers"> / </span>
                                    <span
                                    className="todays-numbers max-min"
                                    title="max"
                                    >{`${weatherData.main.temp_max}`}&deg;F</span>
                                    
                                    
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
                </div>
            </div>
            )}
        </div>
    );
};
export default DisplayCurrentWeather;
