import { Component } from "react";
import { Card, Congratulation, shuffleDouble } from "./components/Functions";
import { Timer, Portal } from "./components/Timer";
import "./App.css";

let classicCards = [
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
  lolCards = [
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
  classicBck =
    "https://previews.123rf.com/images/bobyramone/bobyramone1206/bobyramone120600016/14167526-playing-card-back-side-60x90-mm.jpg",
  lolBck =
    "https://static.wikia.nocookie.net/leagueoflegends/images/2/2d/LoR_Summoner%27s_Rift_Order_Card_Back.png";

class App extends Component {
  constructor(props) {
    super(props);
    let cards,
      imgI =
        props.difficulty === "Easy"
          ? [0, 1, 2, 3, 4]
          : [0, 1, 2, 3, 4, 5, 6, 7, 8];
    imgI = shuffleDouble(imgI);
    // if (props.difficulty === "Easy") {
    //   imgI = shuffleDouble([0, 1, 2, 3, 4]);
    // } else {
    //   imgI = shuffleDouble([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    // }
    if (props.type === "Classic") {
      cards = imgI.map((i) => {
        return {
          imageFrt: classicCards[i],
          imageBck: classicBck,
          front: "bottom",
          back: "top",
          animated: "false",
          size: props.difficulty === "Easy" ? "card-large" : "card-small",
          done: false,
        };
      });
    } else {
      cards = imgI.map((i) => {
        return {
          imageFrt: lolCards[i],
          imageBck: lolBck,
          front: "bottom",
          back: "top",
          animated: "false",
          size: props.difficulty === "Easy" ? "card-large" : "card-small",
          done: false,
        };
      });
    }
    this.state = { cards, gameWon: false };
    this.chosen = [];
    this.left = [];
    this.run = true; //
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
    if (this.chosen.length > 1) {
      // dành cho TH: thẻ 1 = thẻ 2, nhấn nhanh thẻ 1-2-1 hoặc 1-2-2,
      // thẻ 1 & 2 done nhưng thẻ 1 hoặc 2 vẫn được chọn
      // while (this.chosen.length > 0 && this.state.cards[this.chosen[0]].done) {
      //   this.chosen.shift();
      // }
      // let length = this.chosen.length;
      // if (length % 2 === 0 || i !== this.chosen[length - 1]) {
      //   this.chosen.push(i);
      // } else {
      //   this.chosen.splice(-1);
      // }
      // console.log(this.chosen, "before");
      setTimeout(() => {
        let data = this.state.cards;
        if (this.chosen.length > 1) {
          let cardX = data[this.chosen[0]],
            cardY = data[this.chosen[1]];
          if (cardX.imageFrt === cardY.imageFrt) {
            cardX.done = cardY.done = true;
          }
          this.chosen.splice(0, 2);
        }
        console.log(this.chosen, "after");
        for (let j = 0; j < data.length; j++) {
          if (
            (data[j].front === "top" && this.chosen.indexOf(j) === -1) ||
            (data[j].front === "bottom" && this.chosen.indexOf(j) !== -1)
          ) {
            let temp = data[j].front;
            data[j].front = data[j].back;
            data[j].back = temp;
          }
        }
        // check game won
        let result = true;
        for (let i = 0; i < this.state.cards.length; i++) {
          if (!this.state.cards[i].done) {
            result = false;
            break;
          }
        }
        this.run = !result; //
        this.setState({ cards: data, gameWon: result });
      }, 300);
    }
  };
  test = (i) => {
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
    console.log(this.chosen, "before");
  };
  render() {
    let content;
    if (this.state.gameWon) {
      content = <Congratulation />;
    } else {
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
            test={this.test}
          />
        );
      });
    }
    return (
      <div id="playground">
        {content}
        <Portal child={<Timer />} container={"time"} run={this.run} />
      </div>
    );
  }
}

export default App;
