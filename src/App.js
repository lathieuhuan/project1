import "./App.css";
import { Component } from "react";
import { SideCol } from "./components/SideCol";
import { Cell } from "./components/Cell";
import { Message } from "./components/Message";

function divideShuffle(total) {
  let arr = [],
    result = [[], []];
  for (let i = 1; i <= total; i++) {
    arr.push(i);
  }
  for (let i = 0; i < total / 2; i++) {
    for (let j = 0; j < 2; j++) {
      let random = Math.floor(Math.random() * arr.length);
      result[j].push(arr.splice(random, 1)[0]);
    }
  }
  return result;
}

function initGame(num) {
  let shuffledI = divideShuffle(num);
  return {
    leftCol: shuffledI[0],
    rightCol: shuffledI[1],
    platform: Array.from({ length: num }, () => 0),
    done: false,
    hiliPiece: -1,
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initGame(54);
  }
  restart = () => this.setState(() => initGame(54));
  showHint = (i) => {
    this.setState({ hiliPiece: i });
  };
  move = (start, pos, end) => {
    if (start !== end) {
      this.setState((prevS) => {
        let data = JSON.parse(JSON.stringify(prevS)),
          imgI,
          temp;
        if (start !== "leftCol" && start !== "rightCol") {
          imgI = data.platform[start];
          data.platform[start] = 0;
        } else {
          imgI = data[start].splice(pos, 1)[0];
        }
        if (end !== "leftCol" && end !== "rightCol") {
          if (!data.platform[end]) {
            data.platform[end] = imgI;
          } else {
            temp = data.platform[end];
            data.platform[end] = imgI;
            if (start !== "leftCol" && start !== "rightCol") {
              data.platform[start] = temp;
            } else {
              data[start].splice(pos, 0, temp);
            }
          }
        } else {
          data[end].push(imgI);
        }
        let done = true;
        for (let i in data.platform) {
          if (data.platform[i] !== parseInt(i) + 1) {
            done = false;
            break;
          }
        }
        data.done = done;
        return data;
      });
    }
  };
  render() {
    let { leftCol, rightCol, platform, done, hiliPiece } = this.state;
    return (
      <div id="app-con">
        <SideCol
          imgIs={leftCol}
          id="leftCol"
          move={this.move}
          hiliPiece={hiliPiece}
        />
        <div id="platform">
          {platform.map((val, i) => {
            return (
              <Cell
                key={i}
                imgI={val}
                index={i}
                move={this.move}
                hiliPiece={hiliPiece}
                showHint={this.showHint}
              />
            );
          })}
          {done ? <Message restart={this.restart} /> : null}
          <button id="reset" onClick={this.restart}>
            RESET
          </button>
        </div>
        <SideCol
          imgIs={rightCol}
          id="rightCol"
          move={this.move}
          hiliPiece={hiliPiece}
        />
      </div>
    );
  }
}

export default App;
