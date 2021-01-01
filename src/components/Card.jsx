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
let cards = imgI.map((i) => {return {
  image: imgs[i],
  faceUp: false,
  isDone: false,
  needFlip: "false"
}});

class Playground extends React.Component {
  constructor(props) {
    super(props);
    this.temp = []; //
    this.state = {
      cards,
      chosen: []
    };
    this.choose = this.choose.bind(this);
    this.flip = this.flip.bind(this);
  }
  flip(i, val) {
    this.setState((prevS) => {
      let data = prevS.cards;
      data[i].needFlip = val;
      return data[i].needFlip;
    });
  }
  choose(i) {
    this.setState((prevS) => {
      let data = JSON.parse(JSON.stringify(prevS.cards));
      if (!data[i].isDone) {
        data[i].faceUp = !data[i].faceUp;
        return {
          cards: data,
          // chosen: prevS.chosen.indexOf(i) === -1 ? prevS.chosen.concat([i]) : []
        };
      }
    });
  }
  componentDidUpdate() {
    if (this.temp.length > 1) {
      setTimeout(() => {
        console.log("after update", this.temp);
        let data = this.state.cards;
        while (this.temp.length > 1) {
          let cardX = data[this.temp[0]],
            cardY = data[this.temp[1]];
          if (cardX.image === cardY.image) {
            cardX.isDone = cardY.isDone = true;
          } else {
            cardX.faceUp = cardY.faceUp = false;
          }
          this.temp.splice(0, 2);
        }
        this.setState({cards: data});
      }, 1000);
    }
    // let chosen = this.state.chosen;
    // if (chosen.length >= 2) {
    //   let data = this.state.cards,
    //     cardX = data[this.state.chosen[0]],
    //     cardY = data[this.state.chosen[1]];
    //   setTimeout(() => {
    //     if (cardX.image === cardY.image) {
    //       cardX.isDone = cardY.isDone = true;
    //     } else {
    //       cardX.faceUp = cardY.faceUp = false;
    //     }
    //     this.setState({
    //       cardX,
    //       cardY,
    //       chosen: chosen.length === 2 ? [] : chosen.slice(2)
    //     });
    //   }, 500);
    // }
  }
  render() {
    return (
      <div id="playground">
        {this.state.cards.map((val, i) => {
          return (
            <Card key={i}
              {...val}
              index={i}
              choose={this.choose}
              flip={this.flip}
              temp={this.temp}
            />
          );
        })}
      </div>
    );
  }
}
function Card(props) {
  return (
    <div className={props.isDone ? "card invis" : "card"}
    onClick={() => {
      props.flip(props.index, "true");
      // start here
      let pos = props.temp.indexOf(props.index);
      if (pos === -1) {
        props.temp.push(props.index);
      } else {
        props.temp.splice(pos, 1);
      }
      console.log(props.temp, "in func card");
      // end
    }}>
      <img src={props.faceUp ? props.image : "cardback.jpg"}
      flip={props.needFlip}
      onAnimationEnd={() => {
        props.flip(props.index, "false");
        props.choose(props.index);
      }}
      alt="card"/>
    </div>
  )
}

export {Playground}