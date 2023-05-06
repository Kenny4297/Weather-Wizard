import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DisplayWeather from "./components/DisplayWeather";
import DisplayForecast from "./components/DisplayForecast";
import IntroPage from "./components/IntroPage";

function App() {
  const [city, setCity] = useState("");

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
            <IntroPage setCity={setCity} />
          </div>
      </div>

        <div style={{marginTop:'1.5rem'}}>
          <DisplayForecast city={city} />
        </div>
  </>
  );
}

export default App;
