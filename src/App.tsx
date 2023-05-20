import React, { useState } from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import {
    DisplayCurrentWeather,
    DisplayForecast,
    IntroPage,
} from "./components";

export interface IntroPageProps {
    city: string;
    setCity: React.Dispatch<React.SetStateAction<string>>;
}

const App = () => {
    const [city, setCity] = useState("");

    return (
        <HashRouter>
            <Routes>
                <Route
                    path="/"
                    element={<IntroPage city={city} setCity={setCity} />}
                />
                <Route
                    path="/displayWeather/:city"
                    element={
                        <WeatherResultsPage city={city} setCity={setCity} />
                    }
                />
            </Routes>
        </HashRouter>
    );
};

const WeatherResultsPage: React.FC<IntroPageProps> = ({ city, setCity }) => {
    return (
        <>
            <div className="weather-section">
                <div className="box1">
                    <DisplayCurrentWeather />
                </div>

                <div className="box2">
                    <IntroPage
                        data-testid="intro-page"
                        setCity={setCity}
                        city={city}
                    />
                </div>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
                <DisplayForecast city={city} />
            </div>
        </>
    );
};

export default App;
