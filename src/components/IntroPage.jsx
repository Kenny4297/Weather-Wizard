import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBolt, FaCloudShowersHeavy } from 'react-icons/fa'

const IntroPage = ({ setCity }) => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const [selectedCity, setSelectedCity] = useState(null);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const checkInput = (e) => {
    const value = e.target.value.trim();
    setInputValue(value);

    if (value === '') {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(inputValue);
    setSelectedCity(inputValue);
    navigate(`/displayWeather/${inputValue}`);
    setInputValue("");

  };


  return (
    <div style={{height:'100%'}}>
              <form id="form" className="intro-page-box"onSubmit={handleSubmit}>
                <h1 className='intro-page-text-h1' style={{color: '#5DA4D8'}}><FaCloudShowersHeavy /><em>Weather Wizard</em><FaBolt size={30}/></h1>
                <h2 className="intro-page-text"  style={{color:'var(--red2)'}}>Enter the city name</h2>
                <p style={{color:'var(--red3)'}}>
                  <em className="intro-page-text">Example: Caguas, Puerto Rico</em>
                </p>
                <input
                  type="text"
                  id="cityInput"
                  className="form-input intro-page-text"
                  value={inputValue}
                  onChange={checkInput}
                />
                <p>
                  <button type="submit" id="submit" disabled={isButtonDisabled} className="form-button"
                  style={{
                    backgroundColor: isButtonDisabled ? 'grey' : 'var(--red2)' // Set this to your normal button color
                  }}>
                    Today's Weather
                  </button>
                </p>
              </form>
    </div>
  );
};

export default IntroPage;
