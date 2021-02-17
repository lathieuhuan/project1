import "../assets/css/SigningIn.css"
import React from "react";
import { signIn } from "../ultis/ultis";

export class SigningIn extends React.Component {
  trySignIn = () => {
    signIn({
      username: document.getElementById("acc-name").value,
      password: document.getElementById("acc-pass").value,
    })
    .then((userInfo) => {
      this.props.signIn(userInfo);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    });
  }
  render() {
    return (
      <div className="flex-center">
        <div className="flex-col wide-padding" id="signing-in">
          <h1>SIGN IN</h1>
          <input id="acc-name" type="text" placeholder="Enter your username"
            onKeyDown={(e) => {
              if (e.key === "Enter") this.trySignIn();
            }}
          />
          <input id="acc-pass" type="text" placeholder="Enter your password"
            onKeyDown={(e) => {
              if (e.key === "Enter") this.trySignIn();
            }}
          />
          <button onClick={this.trySignIn}>Confirm</button>
        </div>
      </div>
    );
  }
}