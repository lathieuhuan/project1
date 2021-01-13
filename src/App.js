import { Component } from "react";
import {
  RandomShuffleDouble,
  Card,
  Message,
  Timer,
  PauseBtn,
  Portal,
} from "./components/Functions";
import { cardImgs } from "./data";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    const { running, gameState, difficulty, type, timeLimit } = props,
      score = localStorage.getItem("score"),
      imgI = RandomShuffleDouble(
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
          size: difficulty === "Easy" ? "card-large" : "card-small",
          done: false,
        };
      });
    // SETUP APP HERE
    this.state = {
      cards,
      running: running,
      gameState: gameState,
      time: 0,
      bestRecord: score < timeLimit ? score : timeLimit,
      newRecord: false,
    };
    this.chosen = [];
    this.left = imgI.length;
    this.timer = 0;
  }
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
          localStorage.setItem("score", bestRecord);
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
  switchPause = () => {
    if (this.state.gameState === "Progressing") {
      this.setState({ gameState: "Paused" });
    } else if (this.state.gameState === "Paused") {
      this.setState({ gameState: "Progressing" });
    }
  };
  componentDidMount() {
    if (this.state.running) {
      this.timer = setInterval(() => {
        if (this.state.time === this.props.timeLimit) {
          this.setState({ running: false, gameState: "Lost" });
        } else if (this.state.gameState === "Paused") {
          this.setState({ time: this.state.time });
        } else {
          this.setState({ time: this.state.time + 1 });
        }
      }, 10);
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { running, gameState, time, bestRecord, newRecord } = this.state;
    let content;
    if (running && gameState === "Progressing") {
      content = (
        <div id="playground">
          {this.state.cards.map((val, i) => {
            return (
              <Card
                key={i}
                index={i}
                {...val}
                flip={this.flip}
                setAnimation={this.setAnimation}
                process={this.process}
              />
            );
          })}
        </div>
      );
    } else {
      if (!running) {
        clearInterval(this.timer);
      }
      content = <Message gameState={gameState} newRecord={newRecord} />;
    }
    return (
      <div id="app-container">
        {content}
        <Portal child={<Timer time={time} />} container={"time"} />
        <Portal child={<Timer time={bestRecord} />} container={"record"} />
        <Portal
          child={
            <PauseBtn gameState={gameState} switchPause={this.switchPause} />
          }
          container={"pause"}
        />
      </div>
    );
  }
}

export default App;
