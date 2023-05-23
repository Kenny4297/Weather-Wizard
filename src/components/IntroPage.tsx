import React, { useState, useEffect, useContext } from "react";
import { FaBolt, FaCloudShowersHeavy } from "react-icons/fa";
import { CityContext } from "../App";

const IntroPage: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const { city, setCity } = useContext(CityContext);

    // State for disabling the 'Today's Weather' button if user hasn't entered anything
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    // Default city should only run when user visits the page
    const [hasMounted, setHasMounted] = useState<boolean>(false);
    const [defaultCity, setDefaultCity] = useState<string | null>("");
    
    // Condition sets the boolean for 'isDefaultCity'
    const isDefaultCity: boolean = city === defaultCity;

    // Automatically search the default city on mount
    useEffect(() => {
        if (!hasMounted) {
            const defaultCity = localStorage.getItem("defaultCity");
            if (defaultCity) {
                setCity(defaultCity);
            }
            setHasMounted(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasMounted]);
    
    useEffect(() => {
        const localStorageCity = localStorage.getItem("defaultCity");
        if (localStorageCity !== null) {
            setDefaultCity(localStorageCity);
        }
    }, []);

    const checkInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
    
        if (value.trim() === "") {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
    };
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // set the current input as the default city
        localStorage.setItem("defaultCity", inputValue);
        setDefaultCity(inputValue);
    
        setCity(inputValue);
        setInputValue("");
    };
    

    return (
        <div data-testid="intro-page">
            <form
                id="form"
                className="intro-page-box"
                onSubmit={handleSubmit}
                aria-labelledby="intro-page-heading"
            >
                <h1
                    id="intro-page-heading"
                    className="intro-page-text-h1"
                    style={{ color: "var(--blue)" }}
                >
                    <FaCloudShowersHeavy />
                    <em>Weather Wizard</em>
                    <FaBolt size={30} />
                </h1>
                <h2
                    className="intro-page-text"
                    style={{ color: "var(--red2)" }}
                    aria-label="Enter the city name"
                >
                    Enter the city name
                </h2>
                <p style={{ color: "var(--red3)" }}>
                    <em
                        className="intro-page-text"
                        aria-label="Example: Caguas, PR"
                    >
                        Example: Caguas, PR
                    </em>
                </p>
                <input
                    type="text"
                    id="cityInput"
                    className="form-input thing intro-page-text"
                    value={inputValue}
                    onChange={checkInput}
                    aria-label="City input"
                />
                <p>
                    <button
                        type="submit"
                        id="submit"
                        disabled={isButtonDisabled}
                        className="form-button"
                        style={{
                            backgroundColor: isButtonDisabled
                                ? "grey"
                                : "var(--red2)",
                        }}
                        aria-label="Today's Weather"
                    >
                        Today's Weather
                    </button>
                </p>
                <div>
                    {/* {city && (
                        <button
                            type="button"
                            className="set-city-button"
                            onClick={handleSetDefaultCity}
                            disabled={isDefaultCity}
                            aria-label="Set Default City"
                        >
                            Set Default City
                        </button>
                    )}
                    {localStorage.getItem("defaultCity") && (
                        <p className="default-city-text">
                            Current City: {localStorage.getItem("defaultCity")}
                        </p>
                    )} */}
                </div>
            </form>
        </div>
    );
};

export default IntroPage;
