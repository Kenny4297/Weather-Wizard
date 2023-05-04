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
    <div style={{padding:'1.5rem', border:'2px solid blue', height:'100vh', width:'100vw', backgroundImage: 'linear-gradient(159deg, rgb(255, 251, 255) 0%, rgb(255, 255, 255) 100%)'}}>
      <div style={{display:'flex'}}>
          <div style={{width:'50%', border:'2px solid orange'}}>
            <DisplayWeather city={city} />
          </div>
          <div style={{width:'50%', height:'50vh'}}>
            <IntroPage setCity={setCity} />
          </div>
      </div>

        <div style={{marginTop:'1.5rem'}}>
          <DisplayForecast city={city} />
        </div>
      
    </div>
  );
}

export default App;
