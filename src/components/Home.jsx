import "../assets/css/Home.css";
import React from "react";
import { getGames } from "../ultis/ultis";
import { GameCard, GameTitle } from "./GameDisplayers";

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
    let topGames = [...this.state.games];
    topGames.sort((a, b) => b.totalPlayers - a.totalPlayers).splice(5);
    return (
      <div id="home">
        <div id="home-content">
          <div className="flex top-sec">
            <div className="flex-center" id="intro">
              <img src="https://wallpapercave.com/wp/wp4658650.jpg" alt=""/>
              <div className="flex-center flex-col wide-padding">
                <h1>WELCOME TO MINIGAME HUB</h1>
                <h3>We have the most interesting mini-games!</h3>
              </div>
            </div>
            <div className="flex-col wide-padding" id="top-games">
              <h2>TOP GAMES</h2>
              <div className="flex-col list">
                {topGames.map((val, i) =>
                  <GameTitle key={i} rank={i+1} info={val} />
                )}
              </div>
            </div>
          </div>
          <div className="flex mid-sec">
            <h2><a href="/Library">Game Library</a></h2>
          </div>
          <div className="flex btm-sec">
            {this.state.games.map((val, i) => <GameCard key={i} info={val} />)}
          </div>
        </div>
      </div>
    );
  }
}