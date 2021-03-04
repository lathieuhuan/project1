import "../../assets/css/2048/Game2048.css";
import React from "react";
import { Introduction } from "./Introduction";
import { Playground } from "./Playground";
import { HighScores } from "../HighScores";
import { TopBar } from "./TopBar";

export class Game2048 extends React.Component {
  constructor(props) {
    super(props);
    let tiles = [
      0, 2, 4, 2,
      2, 0, 2, 4,
      0, 2, 2, 2,
      4, 2, 2, 0,
    ];
    tiles = tiles.map((tile, i) => {
      return { value: tile, move: null, index: i }
    });
    this.state = {
      tiles,
      points: 0,
      plus: null,
      fullscreen: false,
    };
  }
  toggleFullscreen = () => {
    this.setState({ fullscreen: !this.state.fullscreen });
  }
  nullifyPlus = () => {
    this.setState({ plus: null });
  }
  tilesOnRow = (row) => {
    let result = [];
    for (let col = 0; col < 4; col++) {
      const tile = this.state.tiles[row * 4 + col];
      if (tile.value !== 0) {
        result.push(tile);
      }
    }
    return result;
  }
  moveLeft = () => {
    let { tiles } = this.state,
      values = [],
      score = 0;
    for (let row = 0; row < 4; row++) {
      let aim = 0;
      let realTiles = this.tilesOnRow(row);
      for (let i = 0; i < realTiles.length; i++, aim++) {
        realTiles[i].move = " left-" + ((realTiles[i].index % 4) - aim);
        if (i === realTiles.length - 1) {
          values.push(realTiles[i].value);
          break;
        }
        if (realTiles[i].value === realTiles[i + 1].value) {
          values.push(realTiles[i].value * 2);
          score += realTiles[i].value * 2;
          realTiles[i + 1].move = " left-" + ((realTiles[i + 1].index % 4) - aim);
          i++;
        } else {
          values.push(realTiles[i].value);
        }
      }
      for (let j = values.length; j < row * 4 + 4; j++) {
        values.push(0);
      }
      realTiles.forEach((tile) => {
        tiles[tile.index].move = tile.move;
      });
    }
    this.setState({
      tiles,
      plus: !score ? null : "+" + score,
    });
    for (let k = 0; k < tiles.length; k++) {
      tiles[k].value = values[k];
      tiles[k].move = null;
    }
    setTimeout(() => {
      this.setState({ tiles });
    }, 900);
  }
  moveRight = () => {
    let { tiles } = this.state,
      values = [],
      score = 0;
    for (let row = 3; row >= 0; row--) {
      let aim = 3;
      let realTiles = this.tilesOnRow(row);
      for (let i = realTiles.length - 1; i >= 0; i--, aim--) {
        realTiles[i].move = " right-" + (aim - (realTiles[i].index % 4));
        if (i === 0) {
          values.push(realTiles[i].value);
          break;
        }
        if (realTiles[i].value === realTiles[i - 1].value) {
          values.push(realTiles[i].value * 2);
          score += realTiles[i].value * 2;
          realTiles[i - 1].move = " right-" + (aim - (realTiles[i - 1].index % 4));
          i--;
        } else {
          values.push(realTiles[i].value);
        }
      }
      for (let j = values.length; j < row * 4 + 4; j++) {
        values.push(0);
      }
      realTiles.forEach((tile) => {
        tiles[tile.index].move = tile.move;
      });
    }
    this.setState({
      tiles,
      plus: !score ? null : "+" + score,
    });
    for (let k = tiles.length - 1 ; k >= 0; k--) {
      tiles[k].value = values[tiles.length - k - 1];
      tiles[k].move = null;
    }
    setTimeout(() => {
      console.log("?");
    //   this.setState({ tiles });
    }, 90000);
  }
  preventScroll = (e) => {
    if (e.key.slice(0, 5) === "Arrow") {
      e.preventDefault();
    }
  }
  componentDidMount() {
    window.addEventListener("keydown", this.preventScroll, false);
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.moveLeft();
      } else if (e.key === "ArrowRight") {
        this.moveRight();
      }
    });
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
            Note: Your score will be doubled when you finish the game.
          </p>
          <div id="g2048_app">
            <TopBar
              fullscreen={this.state.fullscreen}
              toggleFullscreen={this.toggleFullscreen}
              plus={this.state.plus}
              nullifyPlus={this.nullifyPlus}
            />
            <div id="g2048_content">
              <Playground tiles={this.state.tiles} adjust={this.adjust} />
            </div>
          </div>
        </div>
        <HighScores highScores={[]} unit="points" />
      </div>
    );
  }
}