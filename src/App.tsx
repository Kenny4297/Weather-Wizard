import React, {
    useState,
    createContext,
    Dispatch,
    SetStateAction,
} from "react";
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
            <div className={!city ? 'weather-section-no-city' : 'weather-section'}>
                <div className={!city ? '' : 'box1'}>
                    {city && <DisplayCurrentWeather data-testid="display-current-weather-page" />}
                </div>
                <div className={!city ? 'intro-page-no-city' : 'box2'}>
                    <IntroPage data-testid="intro-page"  />
                </div>
            </div>
            {city && (
                <div style={{ marginTop: "1.5rem" }}>
                    <DisplayForecast data-testid="display-forecast-page" />
                </div>
            )}
        </CityContext.Provider>
    );
};

export default App;
