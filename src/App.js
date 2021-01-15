import "./App.css";
import { Component } from "react";
import { SideCol } from "./components/SideCol";
import { Cell } from "./components/Cell";
import { Message } from "./components/Message";

function divideShuffle(total) {
  let arr = [],
    result = [[], []];
  for (let i = 1; i <= total; i++) {
    // ko cần if nếu ko cho hint
    if (i !== 1 && i !== 9 && i !== 46 && i !== 54) {
      arr.push(i);
    }
  }
  total -= 4; // ko cần giảm nếu ko cho hint
  for (let i = 0; i < total / 2; i++) {
    for (let j = 0; j < 2; j++) {
      let random = Math.floor(Math.random() * arr.length);
      result[j].push(arr.splice(random, 1)[0]);
    }
  }
  return result;
}

class App extends Component {
  constructor(props) {
    super(props);
    let shuffledI = divideShuffle(54),
      indexes = [];
    for (let i = 1; i <= 54; i++) {
      if (i === 1 || i === 9 || i === 46 || i === 54) {
        indexes.push(i);
      } else {
        indexes.push(0); // chỉ cần dòng này nếu ko cho hint
      }
    }
    this.state = {
      leftCol: shuffledI[0],
      rightCol: shuffledI[1],
      platform: indexes,
      done: false,
      hiliPiece: 0,
    };
  }
  restart = () => {
    this.setState(() => {
      let shuffledI = divideShuffle(54),
        indexes = [];
      for (let i = 1; i <= 54; i++) {
        if (i === 1 || i === 9 || i === 46 || i === 54) {
          indexes.push(i);
        } else {
          indexes.push(0); // chỉ cần dòng này nếu ko cho hint
        }
      }
      return {
        leftCol: shuffledI[0],
        rightCol: shuffledI[1],
        platform: indexes,
        done: false,
      };
    });
  };
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
