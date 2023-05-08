import React, { useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DisplayCurrentWeather, DisplayForecast, IntroPage } from "./components";


function App() {
  const [city, setCity] = useState("");

  return (
    <BrowserRouter basename="Weather-Wizard">
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
            <DisplayCurrentWeather city={city} />
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
