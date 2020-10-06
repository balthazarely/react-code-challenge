import React from "react";
import "./../App.css";
import Result from "./Result";

export default function ResultsTable(data) {
  let results = data.restaurantData;
  // console.log(results);

  return (
    <div>
      <table className="results-table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Genres</th>
            <th>Phone</th>
          </tr>
          {results &&
            results.map((restaurant) => {
              return <Result data={restaurant} key={restaurant.id} />;
            })}
        </tbody>
      </table>
    </div>
  );
}
