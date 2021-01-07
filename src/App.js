import { Component } from "react";
import { Card, Message, shuffleDouble } from "./components/Functions";
import { Timer, PauseBtn, Portal } from "./components/Children";
import "./App.css";

let cardImgs = {
  Classic: {
    front: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Playing_card_heart_2.svg/819px-Playing_card_heart_2.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Playing_card_heart_6.svg/1200px-Playing_card_heart_6.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Playing_card_diamond_3.svg/1200px-Playing_card_diamond_3.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Playing_card_diamond_8.svg/1200px-Playing_card_diamond_8.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Playing_card_club_4.svg/819px-Playing_card_club_4.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Playing_card_club_9.svg/819px-Playing_card_club_9.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Playing_card_diamond_A.svg/1200px-Playing_card_diamond_A.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Playing_card_spade_5.svg/1200px-Playing_card_spade_5.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Playing_card_spade_10.svg/1200px-Playing_card_spade_10.svg.png",
    ],
    back:
      "https://previews.123rf.com/images/bobyramone/bobyramone1206/bobyramone120600016/14167526-playing-card-back-side-60x90-mm.jpg",
  },
  "LoL Champions": {
    front: [
      "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg",
      "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Ahri_0.jpg",
      "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Akali_0.jpg",
      "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Alistar_0.jpg",
      "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Amumu_0.jpg",
      "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Anivia_0.jpg",
      "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Annie_0.jpg",
      "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Ashe_0.jpg",
      "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Azir_0.jpg",
    ],
    back:
      "https://static.wikia.nocookie.net/leagueoflegends/images/2/2d/LoR_Summoner%27s_Rift_Order_Card_Back.png",
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    let cards,
      score = localStorage.getItem("score"),
      imgI =
        props.difficulty === "Easy"
          ? [0, 1, 2, 3, 4]
          : [0, 1, 2, 3, 4, 5, 6, 7, 8];
    imgI = shuffleDouble(imgI);
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
      running: true,
      gameState: "Progressing",
      time: 0,
      bestRecord: score === null ? 1500 : score,
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
      // dành cho TH: thẻ 1 = thẻ 2, nhấn nhanh thẻ 1-2-1 hoặc 1-2-2,
      // thẻ 1 & 2 done nhưng thẻ 1 hoặc 2 vẫn được chọn
      while (this.chosen.length > 0 && this.state.cards[this.chosen[0]].done) {
        this.chosen.shift();
      }
      let length = this.chosen.length;
      if (length % 2 === 0 || i !== this.chosen[length - 1]) {
        this.chosen.push(i);
      } else {
        this.chosen.splice(-1);
      }
      // console.log(this.chosen, "before");
      let data = this.state.cards;
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
      // console.log(this.chosen, "after");
      let run = this.state.running,
        state = this.state.gameState,
        newRecord = this.state.bestRecord;
      if (this.cardLeft === 0) {
        run = false;
        state = "Won";
        if (this.state.time < this.state.bestRecord) {
          newRecord = this.state.time;
        }
      }
      this.setState({
        cards: data,
        running: run,
        gameState: state,
        bestRecord: newRecord,
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
    this.timer = setInterval(() => {
      if (this.state.time === 1500) {
        this.setState({ running: false, gameState: "Lost" });
      } else if (this.state.gameState === "Paused") {
        this.setState({ time: this.state.time });
      } else {
        this.setState({ time: this.state.time + 1 });
      }
    }, 10);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    localStorage.setItem("score", this.state.bestRecord);
  }
  render() {
    let content;
    if (this.state.running && this.state.gameState === "Progressing") {
      content = this.state.cards.map((val, i) => {
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
      });
    } else if (!this.state.running || this.state.gameState === "Paused") {
      if (!this.state.running) {
        clearInterval(this.timer);
      }
      content = <Message gameState={this.state.gameState} />;
    }
    return (
      <div id="playground">
        {content}
        <Portal child={<Timer time={this.state.time} />} container={"time"} />
        <Portal
          child={<Timer time={this.state.bestRecord} />}
          container={"record"}
        />
        <Portal
          child={
            <PauseBtn
              state={this.state.gameState}
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
