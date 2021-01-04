import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

let difficulty = "easy",
  cardType = "Classic",
  dfct = document.getElementsByClassName("difficulty"),
  types = document.getElementsByClassName("type"),
  root = document.getElementById("root"),
  dropdown = document.getElementById("dropdown");

for (let inp of dfct) {
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
  dropdown.classList.toggle("hidden");
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
