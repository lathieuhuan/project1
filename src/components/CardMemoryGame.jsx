import "../assets/css/CardMemoryGame.css";
import React from 'react';
import { LeftCol } from "./cmgComps/LeftCol";
import { RightCol } from "./cmgComps/RightCol";
import { Playground } from "./cmgComps/Playground";
import { Message } from "./cmgComps/Message";
import { cardImgs } from "./cmgData";

function RandomShuffleDouble(limit, max) {
  let arr = [];
  while (arr.length < limit) {
    let random = Math.floor(Math.random() * max);
    if (arr.indexOf(random) === -1) {
      arr.push(random);
    }
  }
  let result = [];
  while (arr.length > 0) {
    let random = Math.floor(Math.random() * arr.length);
    if (result.indexOf(arr[random]) === -1) {
      result.push(arr[random]);
    } else if (arr.length === 1 ||
      (result.indexOf(arr[random]) !== -1 &&
      arr[random] !== result[result.length - 1])) {
        result.push(arr[random]);
        arr.splice(random, 1);
    }
  }
  return result;
}

export class CardMemoryGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: "",
      type: "",
      running: false,
      gameState: "NYS",
      cards: [],
      time: 0,
      bestRecord: 1500,
      newRecord: false,
    };
    this.chosen = [];
    this.left = 0;
    this.limit = 1500;
    this.timer = 0;
  }
  startGame = (difficulty, type) => {
    clearInterval(this.timer);
    const imgI = RandomShuffleDouble(
      difficulty === "Easy" ? 5 : 9,
      cardImgs[type].front.length
    ),
      cards = imgI.map((i) => {
        return {
          imageFrt: cardImgs[type].front[i],
          imageBck: cardImgs[type].back,
          front: "bottom",
          back: "top",
          animated: "false",
          done: false,
        };
      });
    this.setState({
      difficulty: difficulty,
      type: type,
      running: true,
      gameState: "Progressing",
      cards,
      time: 0,
      newRecord: false,
    })
    this.left = imgI.length;
    this.limit = difficulty === "Easy" ? 1500 : 2500;
    this.timer = setInterval(this.countUp, 10);
  }
  countUp = () => {
    if (this.state.time === this.limit) {
      this.setState({ running: false, gameState: "Lost" });
    } else {
      this.setState({ time: this.state.time + 1 });
    }
  }
  switchPause = () => {
    if (this.state.gameState === "Progressing") {
      clearInterval(this.timer);
      this.setState({ gameState: "Paused" });
    } else if (this.state.gameState === "Paused") {
      this.timer = setInterval(this.countUp, 10);
      this.setState({ gameState: "Progressing" });
    }
  };
  setAnimation = (i, val) => {
    this.setState((prevS) => {
      let data = prevS.cards;
      data[i].animated = val;
      return data[i].animated;
    });
  };
  flip = (i) => {
    this.setState((prevS) => {
      let data = JSON.parse(JSON.stringify(prevS.cards));
      if (!data[i].done) {
        [data[i].front, data[i].back] = [data[i].back, data[i].front];
        return { cards: data };
      }
    });
  };
  process = (i) => {
    setTimeout(() => {
      let data = this.state.cards;
      if (!data[i].done && i !== this.chosen[0]) {
        this.chosen.push(i);
      } else if (i === this.chosen[0]) {
        this.chosen.splice(-1);
      }
      if (this.chosen.length === 2) {
        let cardX = data[this.chosen[0]],
          cardY = data[this.chosen[1]];
        if (cardX.imageFrt === cardY.imageFrt) {
          cardX.done = cardY.done = true;
          this.left -= 2;
        } else {
          cardX.front = cardY.front = "bottom";
          cardX.back = cardY.back = "top";
        }
        this.chosen = [];
      }
      let { running, gameState, bestRecord, newRecord, time } = this.state;
      if (!this.left) {
        running = false;
        gameState = "Won";
        if (time < bestRecord) {
          bestRecord = time;
          newRecord = true;
        }
      }
      this.setState({
        cards: data,
        running: running,
        gameState: gameState,
        bestRecord: bestRecord,
        newRecord: newRecord,
      });
    }, 300);
  };
  render() {
    const { difficulty, running, gameState } = this.state;
    let content;
    if (running && gameState === "Progressing") {
      content = (
        <Playground
            cards={this.state.cards}
            difficulty={difficulty}
            setAnimation={this.setAnimation}
            flip={this.flip}
            process={this.process}
          />
      );
    } else {
      content = <Message gameState={gameState} newRecord={this.state.newRecord} />;
      if (!running) {
        clearInterval(this.timer);
      }
    }
    return (
      <div className="flex" id="cmg-content">
        <LeftCol />
        <div className="flex-center center-col">
          {content}
        </div>
        <RightCol
          limit={this.limit}
          time={this.state.time}
          gameState={gameState}
          switchPause={this.switchPause}
          startGame={this.startGame}
        />
      </div>
    );
  }
}