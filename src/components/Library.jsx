import "../assets/css/Library.css";
import React from "react";
import { GameCard } from "./GameDisplayers";
import { getGames } from "../ultis/ultis";
import { Loading } from "./Loading";

export class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      found: true,
      loadingDone: false,
      games: [],
    };
    this.keywords = new URLSearchParams(window.location.search).get("search");
  }
  componentDidMount() {
    // let keywords = new URLSearchParams(window.location.search).get("search");
    if (this.keywords === "") {
      // TH "/Games?search=" do user tự nhấn
      this.setState({ found: false });
    } else {
      this.keywords = this.keywords === null
        // TH "/Games" => keywords = "all"
        ? "all"
        // TH "/Games?search=..." => tách keywords thành arr
        : this.keywords.toLowerCase().split(" ");
      getGames(this.keywords)
      .then((games) => {
        this.setState({ loadingDone: true, games });
      })
      .catch(() => {
        this.setState({ found: false });
      });
    }
  }
  render() {
    return this.state.found ? this.state.loadingDone ? (
      <div className="cover-body" id="library">
        <h1>GAME LIBRARY</h1>
        <div className="list flex">
          {this.state.games.map((val, i) => <GameCard key={i} info={val} />)}
        </div>
      </div>
    ) : <Loading /> : (
      <div className="flex-center cover-body">
        <h1>No games found with the keywords "{
          this.keywords === "" ? null : this.keywords.join(" ")
        }".</h1>
      </div>
    );
  }
}