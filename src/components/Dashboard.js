import React, { Component } from "react";
import ResultsTable from "./ResultsTable";

export default class Dashboard extends Component {
  state = {
    restaurantData: [],
    sortedAlphabetically: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const url = "https://code-challenge.spectrumtoolbox.com/api/restaurants";
    fetch(url, {
      headers: {
        Authorization: "Api-Key q3MNxtfep8Gt ",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          restaurantData: result.slice(0, 20),
        });
      });
  };

  handleSearch = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      this.fetchData();
    }
    let filteredArray = this.state.restaurantData.filter((o) =>
      Object.keys(o).some((k) =>
        o[k].toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    this.setState({
      restaurantData: filteredArray,
    });
  };

  sortAlphabetically = () => {
    let sortedData = this.state.restaurantData;
    if (this.state.sortedAlphabetically) {
      sortedData.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
    } else {
      sortedData.sort((a, b) =>
        a.name < b.name ? 1 : b.name < a.name ? -1 : 0
      );
    }
    this.setState({
      restaurantData: sortedData,
      sortedAlphabetically: !this.state.sortedAlphabetically,
    });
  };

  render() {
    return (
      <div className="container">
        <input
          className="input-wrapper"
          placeholder="search"
          onChange={this.handleSearch}
        ></input>
        <button onClick={this.sortAlphabetically}>Sort Alphabetically</button>
        <label for="cars">Choose a car:</label>
        <select name="cars" id="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <ResultsTable restaurantData={this.state.restaurantData} />
      </div>
    );
  }
}
