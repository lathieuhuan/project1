import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

let difficulty = "easy",
  cardType = "Classic",
  dfctInputs = document.getElementsByClassName("difficulty"),
  types = document.getElementsByClassName("type"),
  root = document.getElementById("root");

for (let inp of dfctInputs) {
  inp.onclick = (e) => {
    difficulty = e.target.value;
  };
}
for (let type of types) {
  type.onclick = (e) => {
    document.getElementById("show-line").innerHTML = e.target.value;
    cardType = e.target.value;
  };
}
document.getElementById("card-type").onclick = () => {
  document.getElementById("dropdown").classList.toggle("hidden");
};

document.getElementById("submit").onclick = () => {
  ReactDOM.unmountComponentAtNode(root);
  ReactDOM.render(
    <React.StrictMode>
      <App difficulty={difficulty} type={cardType} />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
