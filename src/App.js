import { Component } from "react";
import { Card, Message, RandomShuffleDouble } from "./components/Functions";
import { Timer, PauseBtn, Portal } from "./components/Children";
import "./App.css";

let classicURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/",
  lolURL = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/",
  classicImgs = [
    "d/d5/Playing_card_heart_2.svg/819px-Playing_card_heart_2.svg.png",
    "5/59/Playing_card_diamond_2.svg/819px-Playing_card_diamond_2.svg.png",
    "5/52/Playing_card_spade_3.svg/1200px-Playing_card_spade_3.svg.png",
    "6/6b/Playing_card_club_3.svg/819px-Playing_card_club_3.svg.png",
    "a/a2/Playing_card_heart_4.svg/819px-Playing_card_heart_4.svg.png",
    "2/2c/Playing_card_spade_4.svg/1200px-Playing_card_spade_4.svg.png",
    "9/94/Playing_card_spade_5.svg/1200px-Playing_card_spade_5.svg.png",
    "5/50/Playing_card_club_5.svg/1200px-Playing_card_club_5.svg.png",
    "8/80/Playing_card_diamond_6.svg/819px-Playing_card_diamond_6.svg.png",
    "d/d2/Playing_card_spade_6.svg/1200px-Playing_card_spade_6.svg.png",
    "9/94/Playing_card_heart_7.svg/819px-Playing_card_heart_7.svg.png",
    "4/4b/Playing_card_club_7.svg/819px-Playing_card_club_7.svg.png",
    "5/50/Playing_card_heart_8.svg/1200px-Playing_card_heart_8.svg.png",
    "7/78/Playing_card_diamond_8.svg/1200px-Playing_card_diamond_8.svg.png",
    "e/e0/Playing_card_spade_9.svg/1200px-Playing_card_spade_9.svg.png",
    "2/27/Playing_card_club_9.svg/819px-Playing_card_club_9.svg.png",
    "d/d3/Playing_card_diamond_A.svg/1200px-Playing_card_diamond_A.svg.png",
    "5/57/Playing_card_heart_A.svg/1200px-Playing_card_heart_A.svg.png",
  ],
  lolImgs = [
    "Annie",
    "Braum",
    "Corki",
    "Diana",
    "Fizz",
    "Gnar",
    "Heimerdinger",
    "Irelia",
    "Jax",
    "Katarina",
    "Leona",
    "Neeko",
    "Rammus",
    "Syndra",
    "Teemo",
    "Vayne",
    "Yasuo",
    "Zoe",
  ];

let cardImgs = {
  Classic: {
    front: classicImgs.map((val) => {
      return classicURL + val;
    }),
    back:
      "https://previews.123rf.com/images/bobyramone/bobyramone1206/bobyramone120600016/14167526-playing-card-back-side-60x90-mm.jpg",
  },
  "LoL Champions": {
    front: lolImgs.map((val) => {
      return lolURL + val + "_0.jpg";
    }),
    back:
      "https://static.wikia.nocookie.net/leagueoflegends/images/2/2d/LoR_Summoner%27s_Rift_Order_Card_Back.png",
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    let score = localStorage.getItem("score"),
      imgI = RandomShuffleDouble(props.difficulty === "Easy" ? 5 : 9, 18),
      cards = imgI.map((i) => {
        return {
          imageFrt: cardImgs[props.type].front[i],
          imageBck: cardImgs[props.type].back,
          front: "bottom",
          back: "top",
          animated: "false",
          size: props.difficulty === "Easy" ? "card-large" : "card-small",
          done: false,
        };
      });
    // SETUP APP HERE
    this.state = {
      cards,
      running: this.props.running,
      gameState: this.props.gameState,
      time: 0,
      bestRecord: score < this.props.timeLimit ? score : this.props.timeLimit,
      newRecord: false,
    };
    this.chosen = [];
    this.cardLeft = imgI.length;
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
        let temp = data[i].front;
        data[i].front = data[i].back;
        data[i].back = temp;
        return { cards: data };
      }
    });
  };
  process = (i) => {
    setTimeout(() => {
      let data = this.state.cards,
        length = this.chosen.length;
      if (
        !data[i].done &&
        (length % 2 === 0 || i !== this.chosen[length - 1])
      ) {
        this.chosen.push(i);
      } else if (length % 2 === 1 && i === this.chosen[length - 1]) {
        this.chosen.splice(-1);
      }
      if (this.chosen.length > 1) {
        let cardX = data[this.chosen[0]],
          cardY = data[this.chosen[1]];
        if (cardX.imageFrt === cardY.imageFrt) {
          cardX.done = cardY.done = true;
          this.cardLeft -= 2;
        } else {
          cardX.front = cardY.front = "bottom";
          cardX.back = cardY.back = "top";
        }
        this.chosen.splice(0, 2);
      }
      let run = this.state.running,
        state = this.state.gameState,
        record = this.state.bestRecord,
        newRecord = this.state.newRecord;
      if (this.cardLeft === 0) {
        run = false;
        state = "Won";
        if (this.state.time < this.state.bestRecord) {
          record = this.state.time;
          newRecord = true;
          localStorage.setItem("score", record);
        }
      }
      this.setState({
        cards: data,
        running: run,
        gameState: state,
        bestRecord: record,
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
    let content;
    if (this.state.running && this.state.gameState === "Progressing") {
      content = (
        <div id="playground">
          {this.state.cards.map((val, i) => {
            return (
              <Card
                key={i}
                index={i}
                chosen={this.chosen}
                {...val}
                flip={this.flip}
                setAnimation={this.setAnimation}
                process={this.process}
              />
            );
          })}
        </div>
      );
    } else if (!this.state.running || this.state.gameState === "Paused") {
      if (!this.state.running) {
        clearInterval(this.timer);
      }
      content = (
        <Message
          gameState={this.state.gameState}
          newRecord={this.state.newRecord}
        />
      );
    }
    return (
      <div id="app-container">
        {content}
        <Portal child={<Timer time={this.state.time} />} container={"time"} />
        <Portal
          child={<Timer time={this.state.bestRecord} />}
          container={"record"}
        />
        <Portal
          child={
            <PauseBtn
              gameState={this.state.gameState}
              switchPause={this.switchPause}
            />
          }
          container={"pause"}
        />
      </div>
    );
  }
}

export default App;
