import "../../assets/css/cmgCss/Playground.css";
import React from 'react';
import { cardImgs } from "./cmgData";
import { Card } from "./Card";

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

export class Playground extends React.Component {
  constructor(props) {
    super(props);
    const { difficulty, type } = props,
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
          done: false,
        };
      });
    this.state = { cards: cards };
    this.chosen = [];
    this.left = imgI.length;
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
      if (!this.left) {
        this.props.stopGame("Won");
      }
      this.setState({ cards: data });
    }, 300);
  };
  render() {
    const { difficulty, display } = this.props;
    return (
      <div id="playground" style={{ display: display }}>
        {this.state.cards.map((val, i) => {
          return (
            <Card
              key={i}
              index={i}
              size={difficulty === "Easy" ? "card-large" : "card-small"}
              {...val}
              setAnimation={this.setAnimation}
              flip={this.flip}
              process={this.process}
            />
          );
        })}
      </div>
    );
  }
}