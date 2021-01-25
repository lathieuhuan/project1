import "../assets/css/CardMemoryGame.css";
import React from 'react';
import { LeftCol } from "./cmgComps/LeftCol";
import { RightCol } from "./cmgComps/RightCol";
import { Playground } from "./cmgComps/Playground";
import { Message } from "./cmgComps/Message";

export class CardMemoryGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: "Easy",
      type: "Classic",
      running: true,
      gameState: "Progressing",
      newRecord: false,
    };
  }
  switchPause = () => {
    if (this.state.gameState === "Progressing") {
      this.setState({ gameState: "Paused" });
    } else if (this.state.gameState === "Paused") {
      this.setState({ gameState: "Progressing" });
    }
  };
  stopGame = (gameState) => {
    this.setState({ running: false, gameState: gameState });
  }
  makeNewRecord = () => {
    this.setState({ newRecord: true });
  }
  render() {
    const { difficulty, type, running, gameState, newRecord } = this.state,
      playing = running && gameState === "Progressing" ? true : false;
    return (
      <div id="cmg-content">
        <LeftCol difficulty={difficulty} />
        <div className="flex-center center-col">
          <Playground
            difficulty={difficulty}
            type={type}
            display={playing ? "flex" : "none"}
            stopGame={this.stopGame}
          />
          <Message
            gameState={gameState}
            newRecord={newRecord}
            display={playing ? "none" : "flex"}/>
        </div>
        <RightCol
          running={running}
          gameState={gameState}
          switchPause={this.switchPause}
          stopGame={this.stopGame}
          makeNewRecord={this.makeNewRecord}
        />
      </div>
    );
  }
}