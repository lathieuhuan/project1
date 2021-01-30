import "../assets/css/Home.css";
import React from "react";
import { getGames } from "../ultis/ultis";
import { GameCard } from "./GameCard";

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { games: [] };
  }
  componentDidMount() {
    getGames("all").then((data) => {
      this.setState({ games: data });
    });
  }
  render() {
    return (
      <div id="home">
        <div className="flex top-sec">
          <div className="flex-center" id="intro">
            <h1>WELCOME TO MINIGAME HUB</h1>
            <h3>We have the most enteresting mind games!</h3>
          </div>
          <div id="top-games"></div>
        </div>
        <div className="flex mid-sec">
          <h2><a href="/Library">Game Library</a></h2>
        </div>
        <div className="flex wide-padding btm-sec">
          {this.state.games.map((val, i) => <GameCard key={i} info={val} />)}
        </div>
      </div>
    );
  }
}