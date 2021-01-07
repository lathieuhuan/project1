import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

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

document.getElementById("submit").onclick = () => {
  ReactDOM.unmountComponentAtNode(root);
  ReactDOM.render(
    <React.StrictMode>
      <App difficulty={difficulty} type={cardType} />
    </React.StrictMode>,
    root
  );
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
