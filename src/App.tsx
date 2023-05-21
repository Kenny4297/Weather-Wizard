import React, {
    useState,
    createContext,
    Dispatch,
    SetStateAction,
} from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import {
    DisplayCurrentWeather,
    DisplayForecast,
    IntroPage,
} from "./components";


export const CityContext = createContext<{
    city: string;
    setCity: Dispatch<SetStateAction<string>>;
    }>({
    city: "",
    setCity: () => {},
});

const App = () => {
    const [city, setCity] = useState<string>("");

    return (
        <CityContext.Provider value={{ city, setCity }}>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<IntroPage />} />
                    <Route
                        path="/displayWeather/:city"
                        element={<WeatherResultsPage />}
                    />
                </Routes>
            </HashRouter>
        </CityContext.Provider>
    );
};

const WeatherResultsPage: React.FC = () => {
    return (
        <>
            <div className="weather-section">
                <div className="box1">
                    <DisplayCurrentWeather />
                </div>

                <div className="box2">
                    <IntroPage data-testid="intro-page" />
                </div>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
                <DisplayForecast />
            </div>
        </>
    );
};

export default App;