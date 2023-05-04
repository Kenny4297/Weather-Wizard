import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiAlertCircle } from 'react-icons/fi';
import dayjs from 'dayjs';


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
            <div style={{height:'100%'}}>
                {console.log(`Weather data is:${JSON.stringify(weatherData)}`)}
                {!weatherData ? (
                <p style={{color:'var(--Red1)', display:'flex', justifyContent:'center', alignItems:'center'}}>Loading...</p>
                ) : weatherData.cod === "404" ? (
                    <>
                    <div style={{
                            color: 'blue',
                            display:'flex',
                            border:'2px solid green',
                            justifyContent:'center',
                            alignItems:'center',
                            position: 'relative',
                            flexDirection:'column',
                            textAlign:'center',
                            // top: '1rem',
                            maxHeight:'300px'
                        }}>
                            <p >Sorry, but your request was inadequate. The city you entered does not exist in our database. If it is spelt correctly, try entering another city that is close by. </p>
                    <FiAlertCircle size={295} style={{position:'relative', bottom:'1rem'}} />

                    </div>
                </>
                ) : (
                <div
                className=""
                style={{
                    boxShadow: "0 0 10px var(--red2)",
                    backgroundColor: "var(--red5)",
                    position: 'relative',
                    textAlign:'center',
                    // paddingTop:'1rem',
                    border:'2px solid green',
                    height:'100%'
                }}
                >
                    {console.log("weatherData is not null, rendering content...")}
                        
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

                        <div className="rw" style={{
                                display:'flex',
                                width:'100%',
                                height:'60%',  
                                position:'absolute',
                                bottom:'0', 
                                // top:'1.5rem',
                                // left:'.74rem', 
                                border:'2px solid blue'
                                }}>
                            <div style={{
                                boxShadow: "0 0 10px var(--red2)", 
                                width:'50%', 
                                margin: '1rem', 
                                marginTop: '0rem',

                                borderRadius:'1rem'
                                }} >
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
                                    <span id="display-skies" style={{color: "var(--red1)", fontWeight:'600'}}>
                                        {weatherData.weather[0].description}
                                    </span>
                                </p>
                            </div>
                                
                            <div style={{
                                    lineHeight:'1.7rem',
                                    width:'50%',
                                    paddingTop:'1rem',
                                    margin:'1rem',
                                    boxShadow: "0 0 10px var(--red2)",
                                    marginTop: '1rem',
                                    borderRadius:'1rem'
                                    // borderRadius: '1rem',
                                    // backgroundColor: 'var(--red5)',
                                    }}>
                                <p>
                                    <span id="display-temperature">
                                        <span style={{color:"var(--red3)"}}>Temp: </span>
                                        <span style={{color:"var(--red2)"}}>
                                        {`${weatherData.main.temp}`}&deg;F
                                    </span>
                                </span>
                                </p>
                                <p>
                                <span id="display-high-temp">
                                    <span
                                    className="todays-numbers max-min"
                                    title="low"
                                    >{`${weatherData.main.temp_min}`}&deg;F</span>
                                    <span className="todays-numbers"> / </span>
                                    <span
                                    className="todays-numbers max-min"
                                    title="high"
                                    >{`${weatherData.main.temp_max}`}&deg;F</span>
                                    
                                    
                                </span>
                                </p>
                                <p>
                                <span id="display-humidity">
                                    <span style={{color:"var(--red2)"}}>Humidity: </span>
                                    <span style={{color:"var(--red3)"}}>
                                    {`${weatherData.main.humidity}%`}
                                    </span>
                                </span>
                                </p>
                                <p>
                                <span id="wind-speed">
                                    <span style={{color:"var(--red2)"}}>Wind Speed: </span>
                                    <span style={{color:"var(--red3)"}}>{`${weatherData.wind.speed}mph`}</span>
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
