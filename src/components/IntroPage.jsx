import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IntroPage = ({ setCity }) => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  // load saved history from localStorage
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("weatherHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    // save history to localStorage whenever it changes
    localStorage.setItem("weatherHistory", JSON.stringify(history));
  }, [history]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(inputValue);
    navigate(`/displayWeather/${inputValue}`);
    setInputValue("");

    // add new entry to history
    if (!history.includes(inputValue)) {
      setHistory((prevHistory) => [...prevHistory, inputValue]);
    }
  };

  const handleHistoryClick = (city) => {
    setCity(city);
    navigate(`/displayWeather/${city}`);
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="row input-column w-auto text-center">
          <form id="form" onSubmit={handleSubmit}>
            <h2>Enter the city and country name</h2>
            <p>
              <em>Example: Caguas, Puerto Rico</em>
            </p>
            <input
              type="text"
              id="cityInput"
              value={inputValue}
              onChange={handleInputChange}
            />
            <p>
              <button type="submit" id="submit">
                Today's Weather
              </button>
            </p>
          </form>
        </div>
      </div>

      <div className="row history-row text-center">
        <p>Recent History</p>
        <div className="col-12 history">
          {history.map((city) => (
            <button key={city} onClick={() => handleHistoryClick(city)}>
              {city}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default IntroPage;
