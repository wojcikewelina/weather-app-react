import React, { Component } from "react";
import "./Result.css"

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
    err, humidity
  } = props.weather;

  let content = null;

  if (!err && city) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

    content = (
      <div className="result-content">
        
          <h3> {city} - pogoda na dziś</h3>
        
        <div>
          <h4>Aktualna temperatura: {temp} &#176;C</h4>
        </div>
        <div>
          <h4>Wschód słońca dziś o godzinie: {sunriseTime}</h4>
        </div>
        <div>
          <h4>Zachód słońca dziś o godzinie: {sunsetTime}</h4>
        </div>
        <div>
          <h4>Wiatr {wind} m/s</h4>
        </div>
        <div>
          <h4>Ciśnienie {preassure} hPa</h4>
        </div>
        <div>
          <h4>Wigotność powietrza: {humidity}</h4>
        </div>
      </div>
    );
  }

  return (
    <div clasName="result">{err ? `Nie mamy ${city} w bazie` : content}</div>
  );
};
export default Result;
