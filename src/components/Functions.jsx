import React from 'react'
import '../assets/css/Functions.css'

// let message = document.getElementById("message");

// function runTimer(timer) {
//   let centisec = 0,
//     sec = 0,
//     min = 0;
//   timer = setInterval(() => {
//     centisec++;
//     if (centisec === 100) {
//       centisec = 0;
//       sec++;
//     }
//     if (sec === 60) {
//       sec = 0;
//       min++;
//     }
//     let time = `${min}:${sec < 10 ? "0" + sec : sec}:${
//       centisec < 10 ? "0" + centisec : centisec
//     }`;
//     if (sec === 30) {
//       clearInterval(timer);
//       message.innerHTML = `<h1>GAME OVER</h1>`;
//       message.classList.remove("hidden");
//     }
//     document.getElementById("time").innerHTML = time;
//   }, 10);
// }

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
      props.setAnimation(props.index, props.animated === "false" ? "true" : "false");
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

function Congratulation() {
  return (
    <div>
      <h1>YOU WON!</h1>
    </div>
  );
}

export { shuffleDouble, Card, Congratulation }