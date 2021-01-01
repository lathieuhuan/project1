import React from 'react'
import '../assets/css/Card.css'

function shuffleDouble(arr) {
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

let imgI = shuffleDouble([0, 1, 2, 3, 4]);
let imgs = [
  "club8.jpg",
  "diamond6.jpg",
  "heart2.jpg",
  "spade5.jpg",
  "heart10.jpg",
];
let data = imgI.map((i) => {return {
  image: imgs[i],
  back: "cardback.jpg",
  faceUp: false,
  isDone: false,
  needFlip: 0
}});
// console.log(data);

class Playground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: data,
      chosen: []
    }
    this.choose = this.choose.bind(this);
    this.flip = this.flip.bind(this);
    this.check = this.check.bind(this);
  }
  check() {
    let data = this.state.cards;
    let chosen = this.state.chosen;
    let a = chosen[0];
    let b = chosen[1];
    setTimeout(() => {
      if (data[a].image === data[b].image) {
        data[a].isDone = true;
        data[b].isDone = true;
      } else {
        data[a].faceUp = false;
        data[b].faceUp = false;
      }
      this.setState({
        cards: data,
        choose: [],
      });
    }, 500);
  }
  choose(i) {
    this.setState((state) => {
      let data = JSON.parse(JSON.stringify(state.cards));
      let chosen = JSON.parse(JSON.stringify(state.chosen));
      if (!data[i].isDone) {
        if (chosen.indexOf(i) === -1) {
          chosen.push(i);
        } else {
          chosen = [];
        }
        data[i].faceUp = !data[i].faceUp;
        return {
          ...state,
          data,
          chosen,
        };
      }
    });
  }
  flip (i, val) {
    console.log("flip");
    this.setState((state) => {
      let data = state.cards;
      data[i].needFlip = val;
      return {cards: data};
    });
  }
  componentDidUpdate() {
    if (this.state.chosen.length === 2) {
      this.check();
    }
  }
  render() {
    return <div id="playground">{
      this.state.cards.map((val, i) => {
        return <Card key={i}
          {...val}
          index={i}
          flip={this.flip}
          choose={this.choose} />;
      })
    }</div>
  }
}

function Card(props) {
    return (
      <div className={props.isDone ? "card invis" : "card"}
      onClick={() => props.flip(props.index, 1)}>
        <img src={props.faceUp ? props.image : props.back}
        flip={props.needFlip}
        onAnimationEnd={() => {props.flip(props.index, 0); props.choose(props.index)}}
        alt="card"/>
      </div>
    )
}

export {Playground}