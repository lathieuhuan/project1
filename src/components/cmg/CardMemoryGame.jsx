import "../../assets/css/cmg/CardMemoryGame.css";
import React from 'react';
import { Introduction } from "./Introduction";
import { TopBar } from "./TopBar";
import { Menu } from "./Menu";
import { Playground } from "./Playground";
import { cardImgs } from "../cmgData";
import { HighScores } from "../HighScores";
import { subscribeHighscores, addHighscore, updateHighscore } from "../../ultis/ultis";

export class CardMemoryGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: "easy",
      type: "classic",
      running: false,
      gameState: "welcome",
      cards: [],
      time: 0,
      highScores: { easy: [], hard: [] },
      newHS: false,
      fullscreen: false,
    };
    this.chosen = [];
    this.left = 0;
    this.limit = 1200;
    this.timer = 0;
  }
  toggleFullscreen = () => {
    this.setState({ fullscreen: !this.state.fullscreen });
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
    this.chosen = [];
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
    let flag = false;
    for (let i = 0; i < len; i++) {
      if (time < highScores[i].value) {
        flag = true;
      }
      if (userId === highScores[i].userId && flag) {
        updateHighscore(highScores[i].id, { value: time });
        return true;
      } else if (userId === highScores[i].userId && !flag) {
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
    if (flag) {
      updateHighscore(highScores[len - 1].id, { userId, value: time });
      return true;
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
    if ((this.props.userId === null) && (localStorage.getItem("doAsk") !== "false")) {
      this.props.setAppState("Ask user to sign in");
    }
  }
  render() {
    const { difficulty, running, gameState, highScores } = this.state;
    let content;
    if (running && gameState === "progressing") {
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
      content = (
        <Menu
          gameState={gameState}
          newHS={this.state.newHS}
          startGame={this.startGame}
          difficulty={difficulty}
          type={this.state.type}
          fullscreen={this.state.fullscreen}
          toggleFullscreen={this.toggleFullscreen}
        />
      );
      if (!running) {
        clearInterval(this.timer);
      }
    }
    return (
      <div id="cmg">
        <div id="cmg_inner">
          <Introduction />
          <p id="cmg_filler">
            <b>Note:</b> Consider opening the game in <span className="pointer
            recommend" onClick={openFullscreen}>Full screen</span> if you
            cannot see the timer.
          </p>
          <div className="border-3 radius-10" id="cmg_app">
            <TopBar
              limit={this.limit}
              time={this.state.time}
              gameState={gameState}
              switchPause={this.switchPause}
            />
            <div id="cmg_content">
              {content}
            </div>
          </div>
        </div>
        <div id="cmg_hs-wrapper">
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

function openFullscreen() {
  let elm = document.getElementById("cmg_app");
  if (elm.requestFullscreen) {
    elm.requestFullscreen();
  } else if (elm.webkitRequestFullscreen) { // Safari
    elm.webkitRequestFullscreen();
  } else if (elm.msRequestFullscreen) { // IE11
    elm.msRequestFullscreen();
  }
}
