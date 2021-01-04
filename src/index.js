import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

let message = document.getElementById("message");

// STATS
let timer;
function runTimer() {
  let centisec = 0,
    sec = 0,
    min = 0;
  timer = setInterval(() => {
    centisec++;
    if (centisec === 100) {
      centisec = 0;
      sec++;
    }
    if (sec === 60) {
      sec = 0;
      min++;
    }
    let time = `${min}:${sec < 10 ? "0" + sec : sec}:${
      centisec < 10 ? "0" + centisec : centisec
    }`;
    if (sec === 30) {
      clearInterval(timer);
      message.innerHTML = `<h1>GAME OVER</h1>`;
      message.classList.remove("hidden");
      ReactDOM.unmountComponentAtNode(root);
    }
    document.getElementById("time").innerHTML = time;
  }, 10);
}

// SETUP
let difficulty = "easy",
  cardType = "Classic",
  dfcts = document.getElementsByClassName("difficulty"),
  types = document.getElementsByClassName("type"),
  root = document.getElementById("root"),
  showline = document.getElementById("show-line"),
  dropdown = document.getElementById("dropdown");

for (let dfct of dfcts) {
  dfct.onclick = (e) => {
    difficulty = e.target.value;
  };
}
for (let type of types) {
  type.onclick = (e) => {
    showline.innerHTML = e.target.value;
    cardType = e.target.value;
  };
}
showline.onclick = () => {
  dropdown.classList.toggle("hidden");
};
window.onclick = (e) => {
  if (
    !e.target.matches("#show-line") &&
    !dropdown.classList.contains("hidden")
  ) {
    dropdown.classList.toggle("hidden");
  }
};

document.getElementById("submit").onclick = () => {
  clearInterval(timer);
  if (!message.classList.contains("hidden")) {
    message.classList.add("hidden");
  }
  ReactDOM.unmountComponentAtNode(root);
  ReactDOM.render(
    <React.StrictMode>
      <App difficulty={difficulty} type={cardType} />
    </React.StrictMode>,
    root
  );
  runTimer();
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
