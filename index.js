import React, { Component } from "react";
import { render } from "react-dom";
import Form from "./components/Form";
import Result from "./components/Result";
const API_KEY = "b78b7348c5d427499d13f6efb383f10b";
import "./index.css";

class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    preassure: "",
    wind: "",
    humidity: "",
    err: false;
  };

  handleInputChange = e => {
    this.setState({
      value: e.target.value
    });
    console.log(this.state.value);
  };

  handleCitySubmit = e => {
    //zatrzymanie działanie defaultowego - nie odświeży się już;
    e.preventDefault();
    console.log("potwierdzony formularz");
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${
      this.state.value
    }&appid=${API_KEY}&units=metric`;

    fetch(API)
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error("Nie udało się");
      })
      .then(response => response.json())
      .then(data => {
        //Pobranie aktualnnej daty spoza API
        const time = new Date().toLocaleString();

        console.log(data.sys.sunrise);
        this.setState(prevState => ({
          err: false,
          date: time,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          preassure: data.main.pressure,
          wind: data.wind.speed,
          humidity: data.main.humidity,
          city: prevState.value
        }));
      })
      .catch(err => {
        console.log(err);
        this.setState(prevState => {
          return {
            err: true,
            city: prevState.value
          };
        });
      });
  };

  render() {
    return (
      <div className="weather-app">
        <header>
          <h1>Sprawdź aktualną pogodę w twoim mieście</h1>
        </header>
        <Form
          value={this.state.value}
          change={this.handleInputChange}
          submit={this.handleCitySubmit}
        />
        <Result weather={this.state} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
