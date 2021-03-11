import "../assets/css/Home.css";
import React from "react";
import { getGames } from "../ultis/firestoreUltis";
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
        <div id="home_inner">
          <div className="top-sec">
            <div id="main-banner">
              <img
                className="parent-size"
                src="https://image.freepik.com/free-photo/white-dominoes-yellow-background-top-view-board-game-place-text_153325-295.jpg"
                alt=""
              />
              <div className="main-banner_inner">
                <h1>WELCOME TO MINIGAME HUB</h1>
                <h3>We have the most interesting mini-games!</h3>
              </div>
            </div>
            <div className="flex-col padding-20" id="top-games">
              <h2 id="top-games_heading">TOP GAMES</h2>
              <div id="top-games_list">
                {topGames.map((val, i) =>
                  <GameTitle key={i} rank={i+1} info={val} />
                )}
              </div>
            </div>
          </div>
          <div className="mid-sec flex">
            <a href="/Library">
              <h2 className="mid-sec_heading">Game Library</h2>
            </a>
          </div>
          <div className="btm-sec radius-5 flex">
            {this.state.games.map((val, i) => <GameCard key={i} info={val} />)}
          </div>
        </div>
      </div>
    );
  }
}