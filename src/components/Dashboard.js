import React, { Component } from "react";
import ResultsTable from "./ResultsTable";

export default class Dashboard extends Component {
  state = {
    restaurantData: [],
    sortedAlphabetically: false,
    searchInput: "",
  };

  async componentDidMount() {
    const url = "https://code-challenge.spectrumtoolbox.com/api/restaurants";
    await fetch(url, {
      headers: {
        Authorization: "Api-Key q3MNxtfep8Gt ",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          restaurantData: result.slice(0, 10),
        });
      });
  }

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
        <input className="input-wrapper" placeholder="search"></input>
        <button onClick={this.sortAlphabetically}>Sort Alphabetically</button>
        <ResultsTable restaurantData={this.state.restaurantData} />
      </div>
    );
  }
}
