import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBolt, FaCloudShowersHeavy } from "react-icons/fa";

const IntroPage = ({ setCity, city, publicUrl }) => {
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();
    const [selectedCity, setSelectedCity] = useState(null);
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
            setSelectedCity(defaultCity);
            navigate(`/displayWeather/${defaultCity}`);
          }
          setHasMounted(true);
        }
        setDefaultCityState(localStorage.getItem("defaultCity"));
      }, [navigate, setCity, hasMounted]);

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
        setSelectedCity(inputValue);
        navigate(`/displayWeather/${inputValue}`, { replace: true });
        setInputValue("");
      };

    const setDefaultCity = () => {
        localStorage.setItem("defaultCity", city);
        setDefaultCityState(city);
    };

    return (
        <div data-testid="intro-page" style={{ height: "100%" }}>
            <form id="form" className="intro-page-box" onSubmit={handleSubmit}>
                <h1 className="intro-page-text-h1" style={{ color: 'var(--blue)'}}>
                    <FaCloudShowersHeavy />
                    <em>Weather Wizard</em>
                    <FaBolt size={30} />
                </h1>
                <h2
                    className="intro-page-text"
                    style={{ color: "var(--red2)" }}
                >
                    Enter the city name
                </h2>
                <p style={{ color: "var(--red3)" }}>
                    <em className="intro-page-text">
                        Example: Caguas, PR
                    </em>
                </p>
                <input
                    type="text"
                    id="cityInput"
                    className="form-input thing intro-page-text"
                    value={inputValue}
                    onChange={checkInput}
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
                    >
                            Set Default City
                        </button>
                    )}
                    {localStorage.getItem("defaultCity") && (
                        <p className='default-city-text'>
                            Current City: {localStorage.getItem("defaultCity")}
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default IntroPage;
