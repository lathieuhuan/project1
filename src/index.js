import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

document.getElementById("change-color").onclick = () => {
  let r = document.querySelector(":root"),
    primaColor = prompt("Enter Primary Color:"),
    seconColor = prompt("Enter Secondary Color:"),
    accenColor = prompt("Enter Accent Color:");
  r.style.setProperty("--primary", primaColor);
  r.style.setProperty("--secondary", seconColor);
  r.style.setProperty("--accent", accenColor);
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
