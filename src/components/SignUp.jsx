import "../assets/css/SignIU.css";
import React from "react";
import { signUp } from "../ultis/ultis";

function isGood(str) {
  if (str === "") {
    return false;
  }
  for (let char of str) {
    if (char === " ") {
      return false;
    }
  }
  return true;
}

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      nameWarning: null,
      passWarning: null,
      cfpassGood: false,
    };
  }
  trySignUp = () => {
    const name = document.getElementById("su-name").value,
      pass = document.getElementById("su-pass").value,
      email = document.getElementById("su-email").value;
    let nameWarning = null,
      passWarning = null;
    if (!isGood(name)) {
      nameWarning = "Please enter a valid username.";
    }
    if (!isGood(pass)) {
      passWarning = "Please enter a valid password.";
    }
    this.setState({
      nameWarning: nameWarning,
      passWarning: passWarning,
    });
    if (isGood(name) && isGood(pass) && this.state.cfpassGood) {
      signUp({
        userId: name,
        password: pass,
        email: email,
      })
      .then(() => {
        this.props.setAppState("Redirecting", name);
      })
      .catch((err) => this.setState({ nameWarning: err.message }));
    }
  }
  comparePwd = () => {
    const pass = document.getElementById("su-pass").value,
      cfpass = document.getElementById("cf-pass").value;
    if (pass === "") {
      this.setState({ cfpassGood: false });
    } else if (cfpass === pass) {
      this.setState({ cfpassGood: true })
    } else {
      this.setState({ cfpassGood: false });
    }
  }
  render() {
    const { setAppState } = this.props,
      { nameWarning, passWarning, cfpassGood } = this.state;
    return (
      <div className="signIU-form wide-padding thin-border small-b-radius flex-col">
        <div onClick={() => setAppState("None")} className="close flex-center">
          <i className="fa fa-close"></i>
        </div>
        <h1>SIGN UP</h1>
        <p>
          Already a member? <span
            className="warning-color pointer" onClick={() => setAppState("SignIn")}
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
          <p className="warning-color">{nameWarning}</p>
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
          <p className="warning-color">{passWarning}</p>
        )}
        <input
          id="cf-pass"
          type="password"
          placeholder="Confirm your password"
          style={{
            backgroundImage: cfpassGood
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