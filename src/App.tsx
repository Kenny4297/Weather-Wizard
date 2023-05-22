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
            {city === "" ? 
                <IntroPage data-testid="intro-page" /> 
                : 
                <div data-testid="weather-results-page">
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
                </div>
            }
        </CityContext.Provider>
    );
};

export default App;
