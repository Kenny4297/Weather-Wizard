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
    <div className="row" style={{height:'100%'}}>
        {/* <div className="row text-center d-flex justify-content-center align-items-center " style={{border:'2px solid purple', height:'100%'}} > */}
              <form id="form" className="col d-flex justify-content-center flex-column align-items-center" onSubmit={handleSubmit} style={{
                    borderRadius: "20px",
                    boxShadow: "0 0 10px var(--red2)",
                    backgroundColor: "var(--red5)",
                    width: "100%",
                    // height: "100%",
                    margin: '1rem'
                }} >
                <h2 className="form-heading">Enter the city and country name</h2>
                <p>
                  <em className="form-subheading">Example: Caguas, Puerto Rico</em>
                </p>
                <input
                  type="text"
                  id="cityInput"
                  className="form-input"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <p>
                  <button type="submit" id="submit" className="form-button">
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
