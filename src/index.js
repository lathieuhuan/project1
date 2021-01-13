import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

let modal = document.getElementById("modal");
window.onclick = (e) => {
  if (
    !e.target.matches(".img-piece") &&
    !e.target.matches("#modal-img") &&
    getComputedStyle(modal).display === "flex"
  ) {
    modal.style.display = "none";
  }
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
