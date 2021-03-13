import "../../assets/css/2048/Game2048.css";
import React from "react";
import { Introduction } from "./Introduction";
import { Playground } from "./Playground";
import { HighScores } from "../HighScores";
import { TopBar } from "./TopBar";
import { subscribeHighscores, addHighscore, updateHighscore } from "../../ultis/firestoreUltis";

export class Game2048 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullscreen: false,
      gameState: "running",
      tiles: [],
      movements: [],
      points: 0,
      plus: 0,
      highScores: [],
      newHS: false,
    };
    this.moving = false;
    this.delay = null;
    this.dup = [];
  }
  toggleFullscreen = () => {
    this.setState({ fullscreen: !this.state.fullscreen });
  }
  nullifyPlus = () => {
    this.setState({ plus: 0 });
  }
  nullifyType = (i) => {
    let tile = this.state.tiles[i];
    tile.type = this.dup[i].type = null;
    this.setState({ tile });
  }
  startGame = () => {
    if (this.moving) {
      clearTimeout(this.delay);
      this.moving = false;
    }
    let { tiles, movements } = this.state,
      pos = [];
    this.dup = [];
    tiles = [];
    movements = [];
    for (let i = 0; i < 16; i++) {
      pos.push(i);
      this.dup.push({ value: 0 });
      tiles.push({ value: 0 });
      movements.push(null);
    }
    let random1 = Math.floor(Math.random() * 16);
    tiles[random1].value = this.dup[random1].value = 2;
    tiles[random1].type = " new-tile";
    pos.splice(random1, 1);
    let random2 = pos[Math.floor(Math.random() * pos.length)];
    tiles[random2].value = this.dup[random2].value = Math.random() < 0.2 ? 4 : 2;
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
    let { points, highScores } = this.state,
      { userId } = this.props,
      len = highScores.length;
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
      addHighscore({ gameTitle: "2048", userId, value: points });
      return true;
    }
    if (flag) {
      updateHighscore(highScores[len - 1].id, { userId, value: points });
      return true;
    }
    return false;
  }
  adjustTiles = () => {
    let { gameState, tiles, movements, newHS } = this.state,
      empty = [];
    for (let i = 0; i < 16; i++) {
      movements[i] = null;
      if (tiles[i].value !== this.dup[i].value) {
        tiles[i].value = this.dup[i].value;
        tiles[i].type = this.dup[i].type;
      }
      if (tiles[i].value === 0) {
        empty.push(i);
      }
      if (tiles[i].value === 2048) {
        gameState = "you won!";
        if (this.props.userId !== null) {
          newHS = this.madeHS("won");
        }
      }
    }
    if (gameState !== "you won!") {
      let random = empty[Math.floor(Math.random() * empty.length)];
      tiles[random].value = this.dup[random].value = Math.random() < 0.2 ? 4 : 2;
      tiles[random].type = " new-tile";
      gameState = this.getGS(tiles);
      if (gameState === "game over" && this.props.userId !== null) {
        newHS = this.madeHS("lost");
      }
    }
    this.moving = false;
    this.setState({ gameState, tiles, movements, newHS });
  }
  moveLeft = () => {
    let { movements, points, plus } = this.state,
      didMove = false;
    for (let row = 0; row < 4; row++) {
      let aim = 0;
      for (let col = 0; col < 4; col++) {
        const here = row * 4 + col,
          goal = row * 4 + aim, 
          { value } = this.dup[here];
        if (value !== 0) {
          if (col !== aim) {
            movements[here] = " left-" + (col - aim);
            this.dup[here].value = 0;
            this.dup[goal].value = value;
            didMove = true;
          }
          for (let i = 1; i < 4 - col; i++) {
            if (this.dup[here + i].value !== 0) {
              if (this.dup[here + i].value === value) {
                movements[here + i] = " left-" + (col - aim + i);
                this.dup[here + i].value = 0;
                this.dup[goal].value *= 2;
                this.dup[goal].type = " merged-tile";
                plus += value * 2;
                didMove = true;
                col += i;
              } else {
                col += i - 1;
              }
              break;
            }
          }
          aim++;
        }
      }
    }
    if (didMove) {
      this.moving = true;
      this.setState({ movements, points: points + plus, plus });
      this.delay = setTimeout(this.adjustTiles, 180);
    }
  }
  moveRight = () => {
    let { movements, points, plus } = this.state,
      didMove = false;
    for (let row = 0; row < 4; row++) {
      let aim = 3;
      for (let col = 3; col >= 0; col--) {
        const here = row * 4 + col,
          goal = row * 4 + aim,
          { value } = this.dup[here];
        if (value !== 0) {
          if (col !== aim) {
            movements[here] = " right-" + (aim - col);
            this.dup[here].value = 0;
            this.dup[goal].value = value;
            didMove = true;
          }
          for (let i = 1; i < col + 1; i++) {
            if (this.dup[here - i].value !== 0) {
              if (this.dup[here - i].value === value) {
                movements[here - i] = " right-" + (aim - col + i);
                this.dup[here - i].value = 0;
                this.dup[goal].value *= 2;
                this.dup[goal].type = " merged-tile";
                plus += value * 2;
                didMove = true;
                col -= i;
              } else {
                col -= i - 1;
              }
              break;
            }
          }
          aim--;
        }
      }
    }
    if (didMove) {
      this.moving = true;
      this.setState({ movements, points: points + plus, plus });
      this.delay = setTimeout(this.adjustTiles, 180);
    }
  }
  moveUp = () => {
    let { movements, points, plus } = this.state,
      didMove = false;
    for (let col = 0; col < 4; col++) {
      let aim = 0;
      for (let row = 0; row < 4; row++) {
        const here = row * 4 + col,
          goal = aim * 4 + col,
          { value } = this.dup[here];
        if (value !== 0) {
          if (row !== aim) {
            movements[here] = " up-" + (row - aim);
            this.dup[here].value = 0;
            this.dup[goal].value = value;
            didMove = true;
          }
          for (let i = 4; i < 16 - row * 4; i += 4) {
            if (this.dup[here + i].value !== 0) {
              if (this.dup[here + i].value === value) {
                movements[here + i] = " up-" + Math.floor(row - aim + i / 4);
                this.dup[here + i].value = 0;
                this.dup[goal].value *= 2;
                this.dup[goal].type = " merged-tile";
                plus += value * 2;
                didMove = true;
                row += i / 4;
              } else {
                row += i / 4 - 1;
              }
              break;
            }
          }
          aim++;
        }
      }
    }
    if (didMove) {
      this.moving = true;
      this.setState({ movements, points: points + plus, plus });
      this.delay = setTimeout(this.adjustTiles, 180);
    }
  }
  moveDown = () => {
    let { movements, points, plus } = this.state,
      didMove = false;
    for (let col = 0; col < 4; col++) {
      let aim = 3;
      for (let row = 3; row >= 0; row--) {
        const here = row * 4 + col,
          goal = aim * 4 + col,
          { value } = this.dup[here];
        if (value !== 0) {
          if (row !== aim) {
            movements[here] = " down-" + (aim - row);
            this.dup[here].value = 0;
            this.dup[goal].value = value;
            didMove = true;
          }
          for (let i = 4; i < row * 4 + 4; i += 4) {
            if (this.dup[here - i].value !== 0) {
              if (this.dup[here - i].value === value) {
                movements[here - i] = " down-" + Math.floor(aim - row + i / 4);
                this.dup[here - i].value = 0;
                this.dup[goal].value *= 2;
                this.dup[goal].type = " merged-tile";
                plus += value * 2;
                didMove = true;
                row -= i / 4;
              } else {
                row -= i / 4 - 1;
              }
              break;
            }
          }
          aim--;
        }
      }
    }
    if (didMove) {
      this.moving = true;
      this.setState({ movements, points: points + plus, plus });
      this.delay = setTimeout(this.adjustTiles, 180);
    }
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
                movements={this.state.movements}
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