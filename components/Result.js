import React, { Component } from "react";
import "./Result.css";

const Result = props => {
  const {
    err,
    city,
    date,
    sunrise,
    sunset,
    temp,
    preassure,
    wind,
    err,
    humidity
  } = props.weather;

  let content = null;

  if (!err && city) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

    content = (
      <div className="result-content">
        <h2>
          <b className="capitalization">{city}</b> - pogoda na dziś
        </h2>

        <div className="resultWeatherDiv">
          <h3>Aktualna temperatura: </h3>
          <div>{temp} &#176;C</div>
        </div>
        <div className="resultWeatherDiv">
          <h3>Wschód słońca o godzinie:</h3>
          <div>{sunriseTime}</div>
        </div>
        <div className="resultWeatherDiv">
          <h3>Zachód słońca o godzinie:</h3>
          <div> {sunsetTime}</div>
        </div>
        <div className="resultWeatherDiv">
          <h3>Wiatr </h3>
          <div>{wind} m/s</div>
        </div>
        <div className="resultWeatherDiv">
          <h3>Ciśnienie </h3>
          <div>{preassure} hPa </div>
        </div>
        <div className="resultWeatherDiv">
          <h3>Wigotność powietrza: </h3>
          <div>{humidity} %</div>
        </div>
      </div>
    );
  }

  return (
    <div className="result">{err ? `Nie mamy ${city} w bazie` : content}</div>
  );
};
export default Result;
