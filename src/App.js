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
    <div className="row" style={{margin: '1.5rem', border:"2px solid orange"}}>
        <div className="col-md-6">
          <DisplayWeather city={city} />
        </div>
        <div className="col-md-6">
          <IntroPage setCity={setCity} />
        </div>

      <div className="row" style={{border: '2px solid blue'}}>
        <DisplayForecast city={city} />
      </div>
    </div>
  );
}

export default App;
