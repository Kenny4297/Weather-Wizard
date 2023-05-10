import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { DisplayCurrentWeather, DisplayForecast, IntroPage } from "./components/";

const App = () => {
  const [city, setCity] = useState("");
  const basename = process.env.NODE_ENV === "production" ? "/Weather-Wizard" : "";

  return (
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<IntroPage setCity={setCity} />} />
          <Route
            path="/displayWeather/:city"
            element={<WeatherResultsPage city={city} setCity={setCity} />}
          />
        </Routes>
      </BrowserRouter>
    );
}

const WeatherResultsPage = ({ city, setCity }) => {
  return (
    <>
      <div className='weather-section'>
          <div className='box1'>
            <DisplayCurrentWeather city={city} />
          </div>

          <div className='box2'>
            <IntroPage data-testid='intro-page' setCity={setCity} city={city} />
          </div>
      </div>

        <div style={{marginTop:'1.5rem'}}>
          <DisplayForecast city={city} />
        </div>
  </>
  );
}

export default App;
