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
      <div>
        <div>
          <h1>SIGN IN</h1>
          <input id="acc-name" type="text" placeholder="Enter your username" />
          <input id="acc-pass" type="text" placeholder="Enter your password" />
          <button onClick={this.trySignIn}>Confirm</button>
        </div>
      </div>
    );
  }
}