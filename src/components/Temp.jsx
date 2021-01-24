import "../assets/css/Home.css";
import React from 'react';
import { getGames } from "../ultis/ultis";
import { GameCard } from "./GameCard";

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { games: [] };
  }
  componentDidMount() {
    getGames().then((data) => {
      this.setState({ games: data });
    })
  }
  render() {
    return (
      <div id="home">
        <div id="top-sec">
          <div className="center" id="intro">
            <h1>WELCOME TO MINIGAME HUB</h1>
            <h3>We have the most enteresting mind games!</h3>
          </div>
          <div id="top-games"></div>
        </div>
        <div id="mid-sec">
          <h2>Game List</h2>
        </div>
        <div id="btm-sec">
          {this.state.games.map((val, i) => {
            return <GameCard key={i} info={val} />
          })}
        </div>
      </div>
    );
  }
}