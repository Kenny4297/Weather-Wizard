import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DisplayWeather from "./components/DisplayWeather";
import DisplayForecast from "./components/DisplayForecast";
import IntroPage from "./components/IntroPage";

function App() {
  const [city, setCity] = useState("");

  useEffect(() => {
    // Check if there's a default city saved in localStorage
    const savedDefaultCity = localStorage.getItem("defaultCity");
    if (savedDefaultCity) {
      // Fetch weather data for the default city
      // returnCurrentForecast(savedDefaultCity);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={<IntroPage setCity={setCity} />}
        />
        <Route
          path="/displayWeather/:city"
          element={
            <WeatherResultsPage city={city} setCity={setCity} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function WeatherResultsPage({ city, setCity }) {
  return (
    <>
      <div className='weather-section'>
          <div className='box1'>
            <DisplayWeather city={city} />
          </div>


          <div className='box2'>
            <IntroPage setCity={setCity} city={city} />
          </div>
      </div>

        <div style={{marginTop:'1.5rem'}}>
          <DisplayForecast city={city} />
        </div>
  </>
  );
}

export default App;
