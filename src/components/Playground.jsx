import React from 'react'
import '../assets/css/Playground.css'

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

let classicCards = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Playing_card_heart_2.svg/819px-Playing_card_heart_2.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Playing_card_heart_6.svg/1200px-Playing_card_heart_6.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Playing_card_diamond_3.svg/1200px-Playing_card_diamond_3.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Playing_card_diamond_8.svg/1200px-Playing_card_diamond_8.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Playing_card_club_4.svg/819px-Playing_card_club_4.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Playing_card_club_9.svg/819px-Playing_card_club_9.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Playing_card_diamond_A.svg/1200px-Playing_card_diamond_A.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Playing_card_spade_5.svg/1200px-Playing_card_spade_5.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Playing_card_spade_10.svg/1200px-Playing_card_spade_10.svg.png"
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
  classicBck = "https://previews.123rf.com/images/bobyramone/bobyramone1206/bobyramone120600016/14167526-playing-card-back-side-60x90-mm.jpg",
  lolBck = "https://static.wikia.nocookie.net/leagueoflegends/images/2/2d/LoR_Summoner%27s_Rift_Order_Card_Back.png";

class Playground extends React.Component {
  constructor(props) {
    super(props);
    let imgI, cards;
    if (props.difficulty === "easy") {
      imgI = shuffleDouble([0, 1, 2, 3, 4]);
    } else {
      imgI = shuffleDouble([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    }
    if (props.type === "Classic") {
      cards = imgI.map((i) => {return {
        imageFrt: classicCards[i],
        imageBck: classicBck,
        front: "bottom",
        back: "top",
        animated: "false",
        size: props.difficulty === "easy" ? "card-large" : "card-small",
        done: false
      }});
    } else {
      cards = imgI.map((i) => {return {
        imageFrt: lolCards[i],
        imageBck: lolBck,
        front: "bottom",
        back: "top",
        animated: "false",
        size: props.difficulty === "easy" ? "card-large" : "card-small",
        done: false
      }});
    }
    this.chosen = [];
    this.state = {cards};
    this.flip = this.flip.bind(this);
    this.setAnimation = this.setAnimation.bind(this);
    this.forceFaceDown = this.forceFaceDown.bind(this);
    // this.test = this.test.bind(this);
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
      let data = JSON.parse(JSON.stringify(prevS.cards));
      if (!data[i].done) {
        let temp = data[i].front;
        data[i].front = data[i].back;
        data[i].back = temp;
        return {cards: data};
      }
    });
  }
  forceFaceDown() {
    setTimeout(() => {
      this.setState((prevS) => {
        let data = prevS.cards;
        for (let index in data) {
          if (data[index].front === "top" &&
            this.chosen.indexOf(parseInt(index)) === -1) {
            let temp = data[index].front;
            data[index].front = data[index].back;
            data[index].back = temp;
          }
        }
        return {cards: data};
      });
    }, 600);
  }
  componentDidUpdate() {
    if (this.chosen.length > 1) {
      setTimeout(() => {
        let data = this.state.cards;
        while (this.chosen.length > 1) {
          let cardX = data[this.chosen[0]],
            cardY = data[this.chosen[1]];
          if (cardX.imageFrt === cardY.imageFrt) {
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
  // test(done) {
  // }
  render() {
    return (
      <div id="playground">
        {this.state.cards.map((val, i) => {
          return (
            <Card key={i} index={i} chosen={this.chosen} {...val}
              flip={this.flip} setAnimation={this.setAnimation}
              forceFaceDown={this.forceFaceDown}
              // test={this.test}
            />
          );
        })}
      </div>
    );
  }
}
function Card(props) {
  // console.log(props.size);
  return (
    <div className={props.done ? props.size + " invis" : props.size}
    onClick={() => {
      props.setAnimation(props.index, "true");
      let pos = props.chosen.indexOf(props.index);
      if (pos === -1) {
        props.chosen.push(props.index);
      } else if (pos !== -1) {
        props.chosen.splice(0);
      }
    }}>
      <img className={props.back} src={props.imageBck} animated={props.animated}
      onAnimationEnd={() => {
        props.setAnimation(props.index, "false");
        props.flip(props.index);
        props.forceFaceDown();
      }} alt="" />
      <img className={props.front} src={props.imageFrt} animated={props.animated} alt="" />
    </div>
  )
}

export {Playground}