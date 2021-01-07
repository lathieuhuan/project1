import React from 'react'
import '../assets/css/Functions.css'

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

function Card(props) {
  return (
    <div className={props.done ? props.size + " invis" : props.size}
    onClick={() => {
      props.setAnimation(props.index, "true");
    }}>
      <img className={props.back} src={props.imageBck} animated={props.animated}
      onAnimationEnd={() => {
        props.flip(props.index);
        props.setAnimation(props.index, "false");
        props.process(props.index);
    }} alt="" />
      <img className={props.front} src={props.imageFrt} animated={props.animated} alt="" />
    </div>
  );
}

function Message(props) {
  let mess;
  if (props.gameState === "Won") {
    mess = "YOU WON!";
  } else if (props.gameState === "Lost") {
    mess = "GAME OVER!";
  } else if (props.gameState === "Paused") {
    mess = "PAUSED";
  }
  return (
    <div id="message">
      <h1>{mess}</h1>
    </div>
  );
}

export { shuffleDouble, Card, Message }