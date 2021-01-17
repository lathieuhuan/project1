import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

let changeColor = document.getElementById("change-color"),
  colorInp = document.getElementById("color-inp"),
  colorVals = document.getElementsByClassName("color-val"),
  colors = document.getElementsByClassName("color"),
  confirm = document.getElementById("confirm");
changeColor.onclick = () => {
  if (getComputedStyle(colorInp).display === "none") {
    colorInp.style.display = "flex";
  } else {
    colorInp.style.display = "none";
  }
};
for (let i = 0; i < colorVals.length; i++) {
  colorVals[i].oninput = (e) => {
    colors[i].style.backgroundColor = e.target.value;
  };
}
confirm.onclick = () => {
  let r = document.querySelector(":root");
  r.style.setProperty("--primary", colorVals[0].value);
  r.style.setProperty("--secondary", colorVals[1].value);
  r.style.setProperty("--accent", colorVals[2].value);
  r.style.setProperty("--hover", colorVals[3].value);
};

let topTopBtn = document.getElementById("to-top-btn");

window.onscroll = () => {
  if (document.documentElement.scrollTop > 130) {
    topTopBtn.style.display = "block";
  } else {
    topTopBtn.style.display = "none";
  }
};

topTopBtn.onclick = () => {
  document.documentElement.scrollTop = 0;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
