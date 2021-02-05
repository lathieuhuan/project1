import "../assets/css/Library.css";
import React from "react";
import { GameCard } from "./GameCard";
import { getGames } from "../ultis/ultis";

export class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = { found: true, games: [] };
  }
  componentDidMount() {
    let keywords = new URLSearchParams(window.location.search).get("search");
    if (keywords === "") {
      // TH "/Games?search=" do user tự nhấn
      this.setState({ found: false });
    } else {
      keywords = keywords === null ? "all" : keywords.toLowerCase().split(" ");
      // TH "/Games" => keywords = "all"
      // TH "/Games?search=..." => tách keywords thành arr
      getGames(keywords)
      .then((data) => {
        this.setState({ found: true, games: data });
      })
      .catch(() => {
        this.setState({ found: false });
      });
    }
  }
  render() {
    return this.state.found ? (
      <div id="library">
        <h1>GAME LIBRARY</h1>
        <div className="list flex">
          {this.state.games.map((val, i) => <GameCard key={i} info={val} />)}
        </div>
      </div>
    ) : (
      <div>
        <p>No games found.</p>
      </div>
    );
  }
}