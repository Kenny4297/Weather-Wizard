import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBolt, FaCloudShowersHeavy } from "react-icons/fa";

const IntroPage = ({ setCity, city }) => {
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [hasMounted, setHasMounted] = useState(false);
    const [defaultCityState, setDefaultCityState] = useState("");
    const isDefaultCity = city === defaultCityState;

    // Set the default city
    useEffect(() => {
        if (!hasMounted) {
            const defaultCity = localStorage.getItem("defaultCity");
            if (defaultCity) {
                setCity(defaultCity);
                navigate(`/displayWeather/${defaultCity}`);
            }
            setHasMounted(true);
        }
    }, [navigate, setCity, hasMounted]);
    
    useEffect(() => {
        setDefaultCityState(localStorage.getItem("defaultCity"));
    }, []); // Run only when the component mounts and unmounts

    const checkInput = (event) => {
        const value = event.target.value;
        setInputValue(value);

        if (value.trim() === "") {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setCity(inputValue);
        navigate(`/displayWeather/${inputValue}`, { replace: true });
        setInputValue("");
    };

    const setDefaultCity = () => {
        localStorage.setItem("defaultCity", city);
        setDefaultCityState(city);
    };

    return (
        <div data-testid="intro-page" style={{ height: "100%" }}>
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
                    {city && (
                        <button
                            type="button"
                            className="set-city-button"
                            onClick={setDefaultCity}
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
                    )}
                </div>
            </form>
        </div>
    );
};

export default IntroPage;
