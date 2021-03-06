import "../../assets/css/2048/Game2048.css";
import React from "react";
import { Introduction } from "./Introduction";
import { Playground } from "./Playground";
import { HighScores } from "../HighScores";
import { TopBar } from "./TopBar";
import { subscribeHighscores, addHighscore, updateHighscore } from "../../ultis/ultis";

export class Game2048 extends React.Component {
  constructor(props) {
    super(props);
    let tiles = [];
    for (let i = 0; i < 16; i++) {
      tiles.push({
        value: 0,
        move: null,
        type: null,
      });
    }
    this.state = {
      gameState: "running",
      tiles,
      points: 0,
      plus: 0,
      fullscreen: false,
      highScores: [],
      newHS: false,
    };
    this.moving = false;
    this.delay = null;
    this.tileVals = [];
  }
  toggleFullscreen = () => {
    this.setState({ fullscreen: !this.state.fullscreen });
  }
  nullifyPlus = () => {
    this.setState({ plus: 0 });
  }
  nullifyType = (i) => {
    let tile = this.state.tiles[i];
    tile.type = null;
    this.setState({ tile });
  }
  startGame = () => {
    if (this.moving) {
      clearTimeout(this.delay);
      this.moving = false;
    }
    let { tiles } = this.state,
      pos = [];
    for (let i = 0; i < 16; i++) {
      tiles[i].value = 0;
      pos.push(i);
    }
    let random1 = Math.floor(Math.random() * 16);
    tiles[random1].value = 2;
    tiles[random1].type = " new-tile";
    pos.splice(random1, 1);
    let random2 = pos[Math.floor(Math.random() * pos.length)];
    tiles[random2].value = Math.random() < 0.2 ? 4 : 2;
    tiles[random2].type = " new-tile";
    this.setState({
      gameState: "running",
      tiles,
      points: 0,
    });
  }
  getGS = (tiles) => {
    for (let tile of tiles) {
      if (tile.value === 0) {
        return "running";
      }
    }
    for (let row = 0; row < 4; row++) {
      const pos = row * 4 + 1;
      if (
        tiles[pos].value === tiles[pos - 1].value ||
        tiles[pos].value === tiles[pos + 1].value ||
        tiles[pos + 1].value === tiles[pos + 2].value
      ) {
        return "running";
      }
    }
    for (let col = 0; col < 4; col++) {
      const pos = 4 + col;
      if (
        tiles[pos].value === tiles[pos - 4].value ||
        tiles[pos].value === tiles[pos + 4].value ||
        tiles[pos + 4].value === tiles[pos + 8].value
      ) {
        return "running";
      }
    }
    return "game over";
  }
  madeHS(hsType) {
    const { highScores } = this.state,
      { userId } = this.props,
      len = highScores.length;
    let { points } = this.state;
    if (hsType === "won") {
      points *= 2;
    }
    let flag = false;
    for (let i = 0; i < len; i++) {
      if (points > highScores[i].value) {
        flag = true;
      }
      if (userId === highScores[i].userId && flag) {
        updateHighscore(highScores[i].id, { value: points });
        return true;
      } else if (userId === highScores[i].userId && !flag) {
        return false;
      }
    }
    if (len < 10) {
      addHighscore({
        gameTitle: "2048",
        userId,
        value: points,
      });
      return true;
    }
    if (flag) {
      updateHighscore(highScores[len - 1].id, { userId, value: points });
      return true;
    }
    return false;
  }
  adjustTiles = () => {
    let { gameState, tiles, newHS } = this.state,
      didMove = false,
      posAdjust = [],
      empty = [];
    this.tileVals.forEach((val) => {
      if (tiles[val.index].value !== val.value) {
        tiles[val.index].value = val.value;
        tiles[val.index].type = val.type;
        didMove = true;
        if (val.value === 2048) {
          gameState = "you won!";
          if (this.props.userId !== null) {
            newHS = this.madeHS("won");
          }
        }
      }
      posAdjust.push(val.index);
    });
    for (let i = 0; i < tiles.length; i++) {
      if (posAdjust.indexOf(i) === -1) {
        tiles[i].value = 0;
        empty.push(i);
      }
      tiles[i].move = null;
    }
    if (didMove) {
      let random = empty[Math.floor(Math.random() * empty.length)];
      tiles[random].value = Math.random() < 0.2 ? 4 : 2;
      tiles[random].type = " new-tile";
    }
    if (gameState !== "you won!") {
      gameState = this.getGS(tiles);
      if (gameState === "game over" && this.props.userId !== null) {
        newHS = this.madeHS("lost");
      }
    }
    this.tileVals = [];
    this.moving = false;
    this.setState({ gameState, tiles, newHS });
  }
  getRealTiles = (type, num) => {
    let result = [];
    for (let i = 0; i < 4; i++) {
      const index = type === "row" ? (num * 4 + i) : (i * 4 + num),
        { value } = this.state.tiles[index];
      if (value !== 0) {
        result.push({ value, index });
      }
    }
    return result;
  }
  moveLeft = () => {
    let { tiles, points, plus } = this.state;
    for (let row = 0; row < 4; row++) {
      let realTiles = this.getRealTiles("row", row),
        aim = 0;
      for (let i = 0; i < realTiles.length; i++, aim++) {
        let { value } = realTiles[i],
          index = row * 4 + aim;
        realTiles[i].move = " left-" + (realTiles[i].index % 4 - aim);
        if (value === realTiles[i + 1]?.value) {
          realTiles[i + 1].move = " left-" + (realTiles[i + 1].index % 4 - aim);
          i++;
          plus += value * 2;
          this.tileVals.push({ value: value * 2, index, type: " merged-tile" });
        } else {
          this.tileVals.push({ value, index });
        }
      }
      realTiles.forEach((realTile) => {
        tiles[realTile.index].move = realTile.move;
      });
    }
    this.setState({ tiles, points: points + plus, plus });
    this.moving = true;
    this.delay = setTimeout(this.adjustTiles, 180);
  }
  moveRight = () => {
    let { tiles, points, plus } = this.state;
    for (let row = 0; row < 4; row++) {
      let aim = 3;
      let realTiles = this.getRealTiles("row", row);
      for (let i = realTiles.length - 1; i >= 0; i--, aim--) {
        let { value } = realTiles[i],
          index = row * 4 + aim;
        realTiles[i].move = " right-" + (aim - realTiles[i].index % 4);
        if (value === realTiles[i - 1]?.value) {
          realTiles[i - 1].move = " right-" + (aim - realTiles[i - 1].index % 4);
          i--;
          plus += value * 2;
          this.tileVals.push({ value: value * 2, index, type: " merged-tile" });
        } else {
          this.tileVals.push({ value, index });
        }
      }
      realTiles.forEach((tile) => {
        tiles[tile.index].move = tile.move;
      });
    }
    this.setState({ tiles, points: points + plus, plus });
    this.moving = true;
    this.delay = setTimeout(this.adjustTiles, 180);
  }
  moveUp = () => {
    let { tiles, points, plus } = this.state;
    for (let col = 0; col < 4; col++) {
      let aim = 0;
      let realTiles = this.getRealTiles("col", col);
      for (let i = 0; i < realTiles.length; i++, aim++) {
        let { value } = realTiles[i],
          index = aim * 4 + col;
        realTiles[i].move = " up-" + Math.floor(realTiles[i].index / 4 - aim);
        if (value === realTiles[i + 1]?.value) {
          realTiles[i + 1].move = " up-" + Math.floor(realTiles[i + 1].index / 4 - aim);
          i++;
          plus += value * 2;
          this.tileVals.push({ value: value * 2, index, type: " merged-tile" });
        } else {
          this.tileVals.push({ value, index });
        }
      }
      realTiles.forEach((tile) => {
        tiles[tile.index].move = tile.move;
      });
    }
    this.setState({ tiles, points: points + plus, plus });
    this.moving = true;
    this.delay = setTimeout(this.adjustTiles, 180);
  }
  moveDown = () => {
    let { tiles, points, plus } = this.state;
    for (let col = 0; col < 4; col++) {
      let aim = 3;
      let realTiles = this.getRealTiles("col", col);
      for (let i = realTiles.length - 1; i >= 0; i--, aim--) {
        let { value } = realTiles[i],
          index = aim * 4 + col;
        realTiles[i].move = " down-" + (aim - Math.floor(realTiles[i].index / 4));
        if (value === realTiles[i - 1]?.value) {
          realTiles[i - 1].move = " down-" + Math.floor(aim - realTiles[i - 1].index / 4);
          i--;
          plus += value * 2;
          this.tileVals.push({ value: value * 2, index, type: " merged-tile" });
        } else {
          this.tileVals.push({ value, index });
        }
      }
      realTiles.forEach((tile) => {
        tiles[tile.index].move = tile.move;
      });
    }
    this.setState({ tiles, points: points + plus, plus });
    this.moving = true;
    this.delay = setTimeout(this.adjustTiles, 180);
  }
  preventScroll = (e) => {
    if (e.key.slice(0, 5) === "Arrow") {
      e.preventDefault();
    }
  }
  componentDidMount() {
    this.startGame();
    window.addEventListener("keydown", this.preventScroll, false);
    window.addEventListener("keydown", (e) => {
      if (this.state.gameState === "running") {
        if (e.key.slice(0, 5) === "Arrow" && this.moving) {
          clearTimeout(this.delay);
          this.adjustTiles();
        }
        if (e.key === "ArrowLeft") {
          this.moveLeft();
        } else if (e.key === "ArrowRight") {
          this.moveRight();
        } else if (e.key === "ArrowUp") {
          this.moveUp();
        } else if (e.key === "ArrowDown") {
          this.moveDown();
        }
      }
    });
    subscribeHighscores("2048", (highScores) => {
      highScores.sort((a, b) => b.value - a.value);
      this.setState({ highScores });
    });
    if ((this.props.userId === null) && (localStorage.getItem("doAsk") !== "false")) {
      this.props.setAppState("Ask user to sign in");
    }
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.preventScroll);
  }
  render() {
    return (
      <div id="game-2048">
        <div id="g2048_inner">
          <Introduction />
          <p id="g2048_filler">
            <b>Note:</b> Your score will be <b>doubled</b> when you finish
            the game.
          </p>
          <div id="g2048_app">
            <TopBar
              fullscreen={this.state.fullscreen}
              toggleFullscreen={this.toggleFullscreen}
              startGame={this.startGame}
              points={this.state.points}
              plus={this.state.plus}
              nullifyPlus={this.nullifyPlus}
            />
            <div id="g2048_content">
              <Playground
                gameState={this.state.gameState}
                tiles={this.state.tiles}
                newHS={this.state.newHS}
                nullifyType={this.nullifyType}
              />
            </div>
          </div>
        </div>
        <HighScores highScores={this.state.highScores} unit="points" />
      </div>
    );
  }
}