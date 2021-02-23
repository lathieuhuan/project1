import "../assets/css/SignIU.css";
import React from "react";
import { signUp } from "../ultis/ultis";

function isGood(str) {
  return str.match(/([a-zA-Z0-9])+([ -~])*/);
}

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      nameWarning: null,
      passWarning: null,
      pwdConfirmed: false,
    };
  }
  trySignUp = () => {
    const username = document.getElementById("su-name").value,
      password = document.getElementById("su-pass").value,
      email = document.getElementById("su-email").value,
      nameGood = isGood(username),
      passGood = isGood(password);
    this.setState({
      nameWarning: nameGood ? null : "Please enter a valid username.",
      passWarning: passGood ? null : "Please enter a valid password.",
    });
    if (nameGood && passGood && this.state.pwdConfirmed) {
      signUp({ username, password, email })
      .then(() => {
        this.props.setAppState("Redirecting", username);
      })
      .catch((err) => this.setState({ nameWarning: err.message }));
    }
  }
  comparePwd = () => {
    const pass = document.getElementById("su-pass").value,
      cfpass = document.getElementById("cf-pass").value;
    this.setState({ pwdConfirmed: pass !== "" && cfpass === pass });
  }
  render() {
    const { setAppState } = this.props,
      { nameWarning, passWarning, pwdConfirmed } = this.state;
    return (
      <div className="signIU-form flex-col wide-padding thin-border small-b-radius">
        <div onClick={() => setAppState("None")} className="close flex-center">
          <i className="fa fa-close"></i>
        </div>
        <h1>SIGN UP</h1>
        <p>
          Already a member? <span
            className="warning pointer" onClick={() => setAppState("SignIn")}
          >Sign in</span>!
        </p>
        <input
          id="su-name"
          type="text"
          placeholder="Enter your username"
          onKeyDown = {(e) => {
            if (e.key === "Enter") {
              this.trySignUp();
            }
          }}
        />
        {nameWarning === null ? null : (
          <p className="warning">{nameWarning}</p>
        )}
        <input
          id="su-pass"
          type="password"
          placeholder="Enter your password"
          onChange={this.comparePwd}
          onKeyDown = {(e) => {
            if (e.key === "Enter") {
              this.trySignUp();
            }
          }}
        />
        {passWarning === null ? null : (
          <p className="warning">{passWarning}</p>
        )}
        <input
          id="cf-pass"
          type="password"
          placeholder="Confirm your password"
          style={{
            backgroundImage: pwdConfirmed
              ? "url(https://www.pngitem.com/pimgs/m/508-5084657_green-check-mark-icon-free-check-icon-hd.png)"
              : "url(https://png.pngitem.com/pimgs/s/4-46202_red-cross-transparent-png-red-transparent-background-cross.png)"
          }}
          onChange={this.comparePwd}
          onKeyDown = {(e) => {
            if (e.key === "Enter") {
              this.trySignUp();
            }
          }}
        />
        <input
          id="su-email"
          type="text"
          placeholder="Enter your email address"
          onKeyDown = {(e) => {
            if (e.key === "Enter") {
              this.trySignUp();
            }
          }}
        />
        <button onClick={this.trySignUp}>Submit</button>
      </div>
    );
  }
}