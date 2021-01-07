import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// SETTING TOOLS
let timeLimit = 1500;
if (+localStorage.getItem("score") == false) {
  localStorage.setItem("score", timeLimit);
}
document.getElementById("time-limit").innerHTML = `${timeLimit / 100} seconds!`;

document.getElementById("change-time-limit").onclick = () => {
  timeLimit = parseInt(prompt("Set time limit:"));
  document.getElementById("time-limit").innerHTML = `${
    timeLimit / 100
  } seconds!`;
};
document.getElementById("delete-record").onclick = () => {
  localStorage.setItem("score", timeLimit);
  alert("Best record deleted!");
};

document.getElementById("change-color").onclick = () => {
  let r = document.querySelector(":root"),
    primaColor = prompt("Enter Primary Color:"),
    seconColor = prompt("Enter Secondary Color:"),
    accenColor = prompt("Enter Accent Color:");
  r.style.setProperty("--primary", primaColor);
  r.style.setProperty("--secondary", seconColor);
  r.style.setProperty("--accent", accenColor);
};

// APP INITIATION
let difficulty = "Easy",
  cardType = "Classic",
  dfcts = document.getElementsByClassName("difficulty"),
  types = document.getElementsByClassName("type"),
  showline = document.getElementById("show-line"),
  dropdown = document.getElementById("dropdown"),
  root = document.getElementById("root");

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
    dropdown.classList.add("hidden");
  }
};

ReactDOM.render(
  <React.StrictMode>
    <App
      running={false}
      gameState="NYS"
      difficulty={difficulty}
      type={cardType}
      timeLimit={timeLimit}
    />
  </React.StrictMode>,
  root
);

document.getElementById("start").onclick = () => {
  ReactDOM.unmountComponentAtNode(root);
  ReactDOM.render(
    <React.StrictMode>
      <App
        running={true}
        gameState="Progressing"
        difficulty={difficulty}
        type={cardType}
        timeLimit={timeLimit}
      />
    </React.StrictMode>,
    root
  );
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
