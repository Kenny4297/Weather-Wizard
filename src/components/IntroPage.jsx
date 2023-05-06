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

  const [selectedCity, setSelectedCity] = useState(null);

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
    setSelectedCity(inputValue);
    navigate(`/displayWeather/${inputValue}`);
    setInputValue("");

    // add new entry to history
    if (!history.includes(inputValue)) {
      setHistory((prevHistory) => [...prevHistory, inputValue]);
    }
  };

  const handleHistoryClick = (city) => {
    setSelectedCity(city);
    setCity(city);
    navigate(`/displayWeather/${city}`);
  };

  return (
    <div className="" style={{height:'100%'}}>
        {/* <div className="row text-center d-flex justify-content-center align-items-center " style={{border:'2px solid purple', height:'100%'}} > */}
              <form id="form" className="intro-page" onSubmit={handleSubmit}><h1 className='intro-page-text-h1'><em>Weather Wizard</em></h1>
                <h2 className="top-section-text intro-page-text">Enter the city and country name</h2>
                <p>
                  <em className="top-section-text intro-page-text">Example: Caguas, Puerto Rico</em>
                </p>
                <input
                  type="text"
                  id="cityInput"
                  className="form-input top-section-text intro-page-text"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <p>
                  <button type="submit" id="submit" className="form-button top-section-text intro-page-text">
                    Today's Weather
                  </button>
                </p>
              </form>
        {/* </div> */}
      
  
      {/* <div className="row history-row text-center" style={{height: "20vh", border: '2px solid blue', marginTop: '-2rem'}}>
        <p className="history-heading">Recent History</p>
        <div className="col-12 history">
          {history.map((city) => (
            <button
              key={city}
              onClick={() => handleHistoryClick(city)}
              className="history-button"
              disabled={city === selectedCity}
            >
              {city}
            </button>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default IntroPage;
