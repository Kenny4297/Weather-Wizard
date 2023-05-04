import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from '../Utils/ErrorMessage'
import { FiAlertCircle } from 'react-icons/fi';


const DisplayForecast = () => {
  const [forecastData, setForecastData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); // Add error message state
  const apiKey = "0c8087e93b7bd6b5e9d6fbd5daee1b51";
  const { city } = useParams();

  const returnFiveDayForecast = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    try {
      let response = await fetch(url);
      let data = await response.json();
      setForecastData(data);
      setErrorMessage(null); // Clear any previous error message
    } catch (error) {
      console.log(error);
      setErrorMessage('Ops! The city you entered does not match a city in our database. Check your spelling, or enter another city close by it.');
    }
  };

  function getFormattedDate(dateStr) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
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
      <div>
        {!forecastData ? <><p>No forecast data</p> <FiAlertCircle /> </> : (
        <div className="future-forecast">
          {/* Conditionally render the error message if it exists */}
          {errorMessage && <ErrorMessage message={errorMessage} />}
          {forecastData &&
            forecastData.list
              .filter((data, index) => index % 8 === 3)
              .map((data) => (
                <div className="future-forecast-css" key={data.dt}>
                  <p className="future-date"><u>{getFormattedDate(data.dt_txt)}</u></p>
                  <p className="future-temp">{data.main.temp}&deg;F</p>
                  <img
                    className="icon-images"
                    style={{width: '3rem'}}
                    src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                    alt={data.weather[0].description}
                  />
                  <p className="skies-description">{data.weather[0].description}</p>
                  <p className="wind-speed">{data.wind.speed} mph</p>
                  <p className="humidity">{data.main.humidity}%</p>
                </div>
              ))}
        </div>
        )}
      </div>
    );
  } catch (error) {
    console.log(error);
    return <ErrorMessage message={errorMessage} />;
  }
};

export default DisplayForecast;
