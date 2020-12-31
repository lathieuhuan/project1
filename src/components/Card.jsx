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
  faceUp: true,
  isDone: false,
  needFlip: false
}});
// console.log(data);

class Playground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: data,
      chosen: []
    }
  }
  flip (i, val) {
    this.setState((state) => {
      let data = state.cards;
      data[i].needFlip = val;
      return {cards: data};
    });
  }
  render() {
    return <div id="playground">{
      this.state.cards.map((val, i) => {
        return <Card key={i}
          {...val}
          index={i}
          flip />; // here
      })
    }</div>
  }
}

function Card(props) {
    return (
      <div className="card" >
        <img src={props.faceUp ? props.image : "cardback.jpg"} alt="card"/>
      </div>
    )
}

export {Playground}