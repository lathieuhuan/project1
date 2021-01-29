import "../assets/css/SignIU.css";
import React from 'react';
import { signIn } from "../ultis/ultis";

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

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { warning: null };
  }
  trySignIn = () => {
    const name = document.getElementById("si-name").value,
      pass = document.getElementById("si-pass").value;
    if (!isGood(name)) {
      this.setState({
        warning: "Please enter a valid username."
      })
    } else if (!isGood(pass)) {
      this.setState({
        warning: "Please enter a valid password."
      })
    } else {
      signIn({ userId: name, password: pass })
      .then((data) => {
        this.props.setAppState("None", data.username, name);
        localStorage.setItem("username", data.username);
        localStorage.setItem("userId", name);
      })
      .catch((err) => {
        this.setState({ warning: err.message });
      });
    }
  }
  render() {
    const { setAppState } = this.props,
      { warning } = this.state;
    return (
      <div className="signIU-form wide-padding thin-border small-b-radius flex-col">
        <div onClick={() => setAppState("None")} className="close flex-center">
          <i className="fa fa-close"></i>
        </div>
        <h1>SIGN IN</h1>
        <p>
          Not a member yet? <span
            className="warning-color pointer" onClick={() => setAppState("SignUp")}
          >Sign up</span> now!
        </p>
        <input
          type="text"
          id="si-name"
          placeholder="Enter your username"
          onKeyDown={(e) => {
            if(e.key === "Enter") {
              this.trySignIn();
            }
          }}
        />
        <input
          type="password"
          id="si-pass"
          placeholder="Enter your password"
          onKeyDown={(e) => {
            if(e.key === "Enter") {
              this.trySignIn();
            }
          }}
        />
        {warning === null ? null : <p className="warning-color">{warning}</p>}
        <p style={{ textAlign: "left", paddingLeft: "5px" }}>
          Forget your password? Click here.
        </p>
        <button onClick={this.trySignIn}>Confirm</button>
      </div>
    );
  }
}