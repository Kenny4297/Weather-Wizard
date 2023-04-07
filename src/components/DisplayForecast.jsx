import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DisplayForecast = () => {
  const [forecastData, setForecastData] = useState(null);
  const apiKey = "0c8087e93b7bd6b5e9d6fbd5daee1b51";
  const { city } = useParams();

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

  useEffect(() => {
    returnFiveDayForecast(city);
  }, [city]);

  return (
    <div className="col future-information-section future-forecast">
      {forecastData &&
        forecastData.list
          .filter((data, index) => index % 8 === 3)
          .map((data) => (
            <div className="row card future-forecast-css" key={data.dt}>
              <p>
                <u>{data.dt_txt.substring(0, 10)}</u>
              </p>
              <p>Temperature: {data.main.temp}&deg;F</p>
              <img
                className="icon-images"
                style={{width: '100px'}}
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                alt={data.weather[0].description}
              />
              <p className="skies-description">Skies: {data.weather[0].description}</p>
              <p>Wind Speed: {data.wind.speed} mph</p>
              <p>Humidity: {data.main.humidity}%</p>
            </div>
          ))}
    </div>
  );
};

export default DisplayForecast;
