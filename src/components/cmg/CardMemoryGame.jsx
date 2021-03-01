import "../../assets/css/cmg/CardMemoryGame.css";
import React from 'react';
import { LeftCol } from "./LeftCol";
import { RightCol } from "./RightCol";
import { Playground } from "./Playground";
import { Message } from "./Message";
import { cardImgs } from "../cmgData";
import { HighScores } from "../HighScores";
import { subscribeHighscores, addHighscore, updateHighscore } from "../../ultis/ultis";

export class CardMemoryGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: "",
      type: "",
      running: false,
      gameState: "welcome",
      cards: [],
      time: 0,
      highScores: { easy: [], hard: [] },
      newHS: false,
    };
    this.chosen = [];
    this.left = 0;
    this.limit = 1200;
    this.timer = 0;
  }
  startGame = (difficulty, type) => {
    clearInterval(this.timer);
    const imgI = RandomShuffleDouble(
      difficulty === "easy" ? 5 : 9,
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
      difficulty,
      type,
      running: true,
      gameState: "progressing",
      cards,
      time: 0,
      newHS: false,
    })
    this.left = imgI.length;
    this.limit = difficulty === "easy" ? 1200 : 2000;
    this.timer = setInterval(this.countUp, 10);
  }
  countUp = () => {
    if (this.state.time === this.limit) {
      this.setState({ running: false, gameState: "game over!" });
    } else {
      this.setState({ time: this.state.time + 1 });
    }
  }
  switchPause = () => {
    if (this.state.gameState === "progressing") {
      clearInterval(this.timer);
      this.setState({ gameState: "paused" });
    } else if (this.state.gameState === "paused") {
      this.timer = setInterval(this.countUp, 10);
      this.setState({ gameState: "progressing" });
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
      let { running, gameState, newHS } = this.state;
      if (!this.left) {
        running = false;
        gameState = "you won!";
        if (this.props.userId !== null) {
          newHS = this.madeHS();
        }
      }
      this.setState({ cards: data, running, gameState, newHS });
    }, 300);
  };
  madeHS() {
    const { time, difficulty } = this.state,
      { userId } = this.props,
      highScores = this.state.highScores[difficulty],
      len = highScores.length;
    for (let i = 0; i < len; i++) {
      if (userId === highScores[i].userId) {
        for (let j = 0; j <= i; j++) {
          if (time < highScores[j].value) {
            updateHighscore(highScores[i].id, { value: time });
            return true;
          }
        }
        return false;
      }
    }
    if (len < 10) {
      addHighscore({
        gameTitle: "Card Memory Game",
        userId,
        value: time,
        mode: difficulty,
      });
      return true;
    }
    for (let score in highScores) {
      if (time < score.value) {
        updateHighscore(highScores[len].id, { userId, value: time });
        return true;
      }
    }
    return false;
  }
  componentDidMount() {
    subscribeHighscores("Card Memory Game", (highScores) => {
      let refinedHS = { easy: [], hard: [] };
      highScores.forEach((score) => {
        refinedHS[score.mode].push(score);
      });
      refinedHS.easy.sort((a, b) => a.value - b.value);
      refinedHS.hard.sort((a, b) => a.value - b.value);
      this.setState({ highScores: refinedHS });
    });
    if (this.props.userId === null) {
      this.props.setAppState("Ask to sign in");
    }
  }
  render() {
    const { difficulty, running, gameState, highScores } = this.state;
    let centerCol;
    if (running && gameState === "progressing") {
      centerCol = (
        <Playground
          cards={this.state.cards}
          difficulty={difficulty}
          setAnimation={this.setAnimation}
          flip={this.flip}
          process={this.process}
        />
      );
    } else {
      centerCol = <Message gameState={gameState} newHS={this.state.newHS} />;
      if (!running) {
        clearInterval(this.timer);
      }
    }
    return (
      <div>
        <div id="cmg-content">
          <LeftCol />
          <div className="flex-center" id="cmg_center-col">
            {centerCol}
          </div>
          <RightCol
            limit={this.limit}
            time={this.state.time}
            gameState={gameState}
            switchPause={this.switchPause}
            startGame={this.startGame}
          />
        </div>
        <div className="flex">
          <HighScores
            highScores={highScores.easy.map((score) => {
              return {
                username: score.username,
                value: score.value / 100,
              }
            })}
            unit="seconds"
            mode="easy"
          />
          <div className="vertical-separator"></div>
          <HighScores
            highScores={highScores.hard.map((score) => {
              return {
                username: score.username,
                value: score.value / 100,
              }
            })}
            unit="seconds"
            mode="hard"
          />
        </div>
      </div>
    );
  }
}

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