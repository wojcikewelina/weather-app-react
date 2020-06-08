import React, { Component } from "react";
import { render } from "react-dom";
import Form from "./components/Form";
import Result from "./components/Result";
const API_KEY = "b78b7348c5d427499d13f6efb383f10b";
import "./index.css";
import CITY_PL from "./services/listOfCities";
let cityWithoutPlLetter = [];


String.prototype.escapeDiacritics = function() {
  return this.replace(/ą/g, "a")
    .replace(/Ą/g, "A")
    .replace(/ć/g, "c")
    .replace(/Ć/g, "C")
    .replace(/ę/g, "e")
    .replace(/Ę/g, "E")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
    .replace(/ń/g, "n")
    .replace(/Ń/g, "N")
    .replace(/ó/g, "o")
    .replace(/Ó/g, "O")
    .replace(/ś/g, "s")
    .replace(/Ś/g, "S")
    .replace(/ż/g, "z")
    .replace(/Ż/g, "Z")
    .replace(/ź/g, "z")
    .replace(/Ź/g, "Z");
};

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
    err: false
  };

  componentDidMount() {
    for (var i = 0; i < CITY_PL.length; i++) {
      cityWithoutPlLetter[i] = CITY_PL[i].escapeDiacritics();
    }
    var aa = "źżbul";

    console.log(aa.escapeDiacritics());
    console.log(CITY_PL[41]);
    console.log(cityWithoutPlLetter[41]);
  }

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
      <div id="backgroundOfApp"/>
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
