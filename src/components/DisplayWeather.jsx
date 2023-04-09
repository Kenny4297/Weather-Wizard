import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const DisplayCurrentWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "0c8087e93b7bd6b5e9d6fbd5daee1b51";
  const { city } = useParams();

  const returnCurrentForecast = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    try {
      let response = await fetch(url);
      let data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    returnCurrentForecast(city);
  }, [city]);

  return (
<div className="row mx-auto future-information-section">
  <div className="col ">
    <div className="row row-weather text-center current-forecast-css" style={{ borderRadius: '20px', boxShadow: '0 0 10px var(--red2)', padding: '20px', backgroundColor: 'var(--red5)', width: '30vw' }}>
      <h2 id="todays-weather">Today's Weather:</h2>
      {weatherData && (
        <div className="col todays-weather-specs h-25 w-50">
          <p>
            <strong>
              <span id="display-city-name">{weatherData.name}</span>
            </strong>
          </p>
          <p>
            <span id="display-date">{dayjs().$d.toString().substring(0, 10)}</span>
          </p>
          <p>
            <span id="weather-icon">
              <img
                src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
              />
            </span>
          </p>
          <p>
            <span id="display-skies">{weatherData.weather[0].description}</span>
          </p>
          <p>
            <span id="display-temperature">{`Current Temperature: ${weatherData.main.temp}&deg;F`}</span>
          </p>
          <p>
            <span id="display-humidity">{`Humidity: ${weatherData.main.humidity}%`}</span>
          </p>
          <p>
            <span id="wind-speed">{`Wind Speed: ${weatherData.wind.speed}mph`}</span>
          </p>
        </div>
      )}
    </div>
  </div>
</div>


  );
}
export default DisplayCurrentWeather;