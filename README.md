# Weather Wizard

![Screenshot](./public/assets/weather-wizard.png)
## Table of Contents
- [License](#license)
- [Project Overview](#project-overview)
- [Purpose and Inspiration](#purpose-and-inspiration)
- [Technologies](#technologies)
- [Functionality and Features](#functionality-and-features)
- [Deployment](#Deployment)
- [Testing](#testing)

## License
This project is licensed under the MIT license.

## Project Overview
This project presents an advanced weather dashboard, capable of providing real-time weather updates, a five-day forecast, and the local time for any city globally. It leverages the power of React and TypeScript to deliver a seamless and personalized user experience, including the ability to remember a user's home city.

## Purpose and Inspiration
This project was motivated by a desire to push beyond the confines of my coursework requirements at the Minnesota Coding Bootcamp. Recognizing the potential to augment the original weather dashboard's limited functionality, I set out to create an enhanced, more intuitive, and comprehensive user interface.

## Technologies
OpenWeather API:
The OpenWeather API is a web-based service that provides weather data and forecasts for various locations around the world. It allows developers to access real-time and historical weather data in a programmatic way, using HTTP requests to retrieve JSON or XML responses. The API provides a wide range of weather data, including temperature, humidity, wind speed and direction, precipitation, and more. It also includes features such as historical data retrieval, weather alerts, and UV index forecasts. 

TimeZoneDB API:
TimeZone BD is a web service that provides time zone data and related services, such as current time, time zone conversion, and daylight saving time information. It allows developers to integrate time zone functionality into their applications, such as scheduling, appointment booking, and time-based notifications. 

TypeScript:
TypeScript is a statically-typed superset of JavaScript, developed by Microsoft to catch common errors early in the development process. It allows developers to specify types for variables and function parameters, providing better tooling and documentation. Once TypeScript code is written, it's compiled into JavaScript, enabling it to run in any JavaScript environment.

## Functionality and Features
The dashboard is designed for global utility, allowing users to input any city worldwide to view its current weather conditions. These conditions include data points such as temperature, sky conditions, humidity levels, daily high and low temperatures, and wind speed. It also offers a five-day forecast for the selected location. A standout feature is the dashboard's capacity to store the last searched city in local storage, enabling users to see their default location's weather updates immediately upon revisiting the app. This functionality eliminates the need for repeated manual entry, making the tool more user-friendly and efficient.

## Deployment
Check it out [here](https://weather-wizard4297.herokuapp.com/)!

## Testing
I used Jest and RTL for tests. Here is the coverage table for all tests:

----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------|---------|----------|---------|---------|-------------------
All files             |   76.85 |    57.77 |   77.77 |   76.85 |                   
 src                  |   26.66 |    35.71 |      25 |   26.66 |                   
  App.tsx             |     100 |       50 |      50 |     100 | 26-34             
  index.js            |       0 |      100 |     100 |       0 | 8-16              
  reportWebVitals.js  |       0 |        0 |       0 |       0 | 1-8
 src/components       |   84.94 |    67.74 |   92.85 |   84.94 | 
  DisplayForecast.tsx |   65.51 |    54.54 |      80 |   65.51 | 62-69,110,180-181
  DisplayWeather.tsx  |   97.05 |       80 |     100 |   97.05 | 100
  IntroPage.tsx       |      90 |       70 |     100 |      90 | 24,34,43
  index.ts            |       0 |        0 |       0 |       0 | 
----------------------|---------|----------|---------|---------|-------------------