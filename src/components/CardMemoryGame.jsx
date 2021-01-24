import "../assets/css/CardMemoryGame.css";
import React from 'react';
import { LeftCol } from "./cmgComps/LeftCol";
import { CenterCol } from "./cmgComps/CenterCol";
import { RightCol } from "./cmgComps/RightCol";
import { cardImgs } from "../cmgData.js";

export class CardMemoryGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: "Easy",
      type: "Classic",
      cards: null, //
      running: false,
      gameState: "NYS",
      time: 0,
      bestRecord: 1500,
      newRecord: false,
    };
  }
  render() {
    return (
      <div id="cmg-content">
        <LeftCol />
        <CenterCol />
        <RightCol />
      </div>
    );
  }
}