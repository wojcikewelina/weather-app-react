import React, { Component } from "react";
import "./Result.css";

const Result = props => {
  const {
    err,
    city,
    rain,
    temp,
    preassure,
    wind,
    err,
    humidity
  } = props.weather;

  let content = null;

  if (!err && city) {

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
          <h3>Suma opadów:</h3>
          <div>{rain}</div>
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
