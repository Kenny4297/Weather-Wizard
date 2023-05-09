import React, { useState, useEffect} from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { DisplayCurrentWeather, DisplayForecast, IntroPage } from "./components";


const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const path = queryParams.get("path");
    if (path) {
      navigate(path, { replace: true });
    }
  }, [navigate]);

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
