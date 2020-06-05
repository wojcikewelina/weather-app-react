import React, { Component } from "react";

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
    err
  } = props.weather;

  let content = null;

  if (!err && city) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

    content = (
      <div>
        <h3>Wyszukiwanie danych pogodowych dla miasta {city} </h3>
        <h4>Dane są aktualne dla dnia i godziny: {date}</h4>
        <h4>Aktualna temperatura: {temp} &#176;C</h4>
        <h4>Wschód słońca dziś o godzinie: {sunriseTime}</h4>
        <h4>Zachód słońca dziś o godzinie: {sunsetTime}</h4>
        <h4>Wiatr {wind} m/s</h4>
        <h4>Ciśnienie {preassure} hPa</h4>
      </div>
    );
  }

  return (
    <div clasName="result">{err ? `Nie mamy ${city} w bazie` : content}</div>
  );
};
export default Result;
