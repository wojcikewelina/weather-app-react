import React, { Component } from "react";
import { render } from "react-dom";
import Form from "./components/Form";
import Result from "./components/Result";
import "./index.css";

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
    rain: "",
    temp: "",
    preassure: "",
    wind: "",
    humidity: "",
    err: false
  };

  handleInputChange = e => {
    this.setState({
      value: e.target.value
    });
    console.log("stejt to: " + this.state.value);
  };

  handleCitySubmit = e => {
    //zatrzymanie działanie defaultowego - nie odświeży się już;
    e.preventDefault();
    console.log("potwierdzony formularz");
    const API = `https://danepubliczne.imgw.pl/api/data/synop/station/${this.state.value
      .escapeDiacritics()
      .toLowerCase()}`;
    console.log(API);
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

        console.log(data.data_pomiaru);

        this.setState(prevState => ({
          err: false,
          data: data.data_pomiaru,
          temp: data.temperatura,
          rain: data.suma_opadu,
          preassure: data.cisnienie,
          wind: data.predkosc_wiatru,
          humidity: data.wilgotnosc_wzgledna,
          city: data.stacja
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
        <div id="backgroundOfApp" />
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
