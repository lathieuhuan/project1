import "../../assets/css/cmgCss/Stats.css";
import React from 'react';
import { Timer } from "./Timer"

export class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 0, bestRecord: 1500 };
    this.timer = 0;
  }
  setNewRecord = () => {
    this.setState({ bestRecord: this.state.time });
  }
  componentDidMount() {
    if (this.props.running) {
      this.timer = setInterval(() => {
        const { time, bestRecord } = this.state,
          { running, gameState, stopGame, makeNewRecord } = this.props;
        if (time === 1500) {
          stopGame("Lost");
        } else if (gameState === "Paused") {
          this.setState({ time: time });
        } else {
          this.setState({ time: time + 1 });
        }
        if (!running) {
          clearInterval(this.timer);
          if (time < bestRecord) {
            this.setNewRecord();
            makeNewRecord();
          }
        }
      }, 10);
    }
  }
  render() {
    return (
      <div id="stats">
        <p className="desc">Time:</p>
        <p className="num" id="time">
          <Timer time={this.state.time} />
        </p>
        <p className="desc">Best Record:</p>
        <p className="num" id="record">
          <Timer time={this.state.bestRecord} />
        </p>
      </div>
    );
  }
}