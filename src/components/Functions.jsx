import React from 'react'
import ReactDOM from 'react-dom';
import '../assets/css/Functions.css'

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

function Card(props) {
  const { imageFrt, imageBck, front, back, animated, size, done, index } = props;
  return (
    <div className={done ? size + " invis" : size}
    onClick={() => {
      props.setAnimation(index, "true");
    }}>
      <img className={back} src={imageBck} animated={animated}
      onAnimationEnd={() => {
        props.flip(index);
        props.setAnimation(index, "false");
        props.process(index);
    }} alt="" />
      <img className={front} src={imageFrt} animated={animated} alt="" />
    </div>
  );
}

function Message(props) {
  let mess, extraMess;
  if (props.gameState === "Won") {
    mess = "YOU WON!";
    if (props.newRecord) {
      extraMess = <p>New Record!</p>
    }
  } else if (props.gameState === "Lost") {
    mess = "GAME OVER!";
  } else if (props.gameState === "Paused") {
    mess = "PAUSED";
  } else {
    mess = "WELCOME";
  }
  return (
    <div id="message">
      <h1>{mess}</h1>
      {extraMess}
    </div>
  );
}

function Timer(props) {
  const centis = props.time % 100,
    sec = (props.time - centis) / 100 % 60;
    // min = Math.floor(props.time / 6000);
  return <span>
    {(sec < 10 ? "0" + sec : sec) + ":" + 
    (centis < 10 ? "0" + centis : centis)}
  </span>;
}

function PauseBtn(props) {
  return <div id="pause-btn" onClick={() => props.switchPause()}>
    <i className={
      props.gameState === "Paused" ? "fa fa-play" : "fa fa-pause"
    }></i>
  </div>;
}

function Portal(props) {
  return ReactDOM.createPortal(
    props.child,
    document.getElementById(props.container)
  );
}

export { RandomShuffleDouble, Card, Message, Timer, PauseBtn, Portal }