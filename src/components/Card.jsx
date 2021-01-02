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
let cards = [
  "club8.jpg",
  "diamond6.jpg",
  "heart2.jpg",
  "spade5.jpg",
  "heart10.jpg"
];
cards = imgI.map((i) => {return {
  image: cards[i],
  front: "bottom",
  back: "top",
  animated: "false",
  done: false
}});

class Playground extends React.Component {
  constructor(props) {
    super(props);
    this.chosen = [];
    this.state = {cards};
    this.flip = this.flip.bind(this);
    this.setAnimation = this.setAnimation.bind(this);
  }
  setAnimation(i, val) {
    this.setState((prevS) => {
      let data = prevS.cards;
      data[i].animated = val;
      return data[i].animated;
    });
  }
  flip(i) {
    this.setState((prevS) => {
      let data= JSON.parse(JSON.stringify(prevS.cards));
      if (!data[i].done) {
        let temp = data[i].front;
        data[i].front = data[i].back;
        data[i].back = temp;
        return {cards: data};
      }
    });
  }
  componentDidUpdate() {
    if (this.chosen.length > 1) {
      setTimeout(() => {
        console.log("after update", this.chosen); //
        let data = this.state.cards;
        while (this.chosen.length > 1) {
          let cardX = data[this.chosen[0]],
            cardY = data[this.chosen[1]];
          if (cardX.image === cardY.image) {
            cardX.done = cardY.done = true;
          } else {
            cardX.front = cardY.front = "bottom";
            cardX.back = cardY.back = "top";
          }
          this.chosen.splice(0, 2);
        }
        this.setState({cards: data});
      }, 600);
    }
  }
  render() {
    return (
      <div id="playground">
        {this.state.cards.map((val, i) => {
          return (
            <Card key={i} index={i} chosen={this.chosen} {...val}
              flip={this.flip} setAnimation={this.setAnimation}
            />
          );
        })}
      </div>
    );
  }
}

function Card(props) {
  return (
    <div className={props.done ? "card invis" : "card"}
    onClick={() => {
      props.setAnimation(props.index, "true");
      let pos = props.chosen.indexOf(props.index);
      if (pos === -1) {
        props.chosen.push(props.index);
      } else {
        props.chosen.splice(pos, 1);
      }
      console.log(props.chosen, "in func card"); //
    }}>
      <img className={props.back} src="cardback.jpg" animated={props.animated}
      onAnimationEnd={() => {
        props.setAnimation(props.index, "false");
        props.flip(props.index);
      }} alt="" />
      <img className={props.front} src={props.image} animated={props.animated} alt="" />
    </div>
  )
}

export {Playground}