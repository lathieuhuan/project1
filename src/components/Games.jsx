import "../assets/css/Games.css";
import React from "react";
import { GameCard } from "./GameCard";
import { getGames } from "../ultis/ultis";

export class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = { found: true, games: [] };
    this.keyword = new URLSearchParams(window.location.search).get("search");
  }
  componentDidMount() {
    getGames(this.keyword)
    .then((data) => {
      this.setState({ found: true, games: data });
    })
    .catch(() => {
      this.setState({ found: false });
    });
  }
  render() {
    return (
      <div>
        {this.state.games.map((val, i) => <GameCard key={i} info={val} />)}
      </div>
    );
  }
}