import "../assets/css/SignIU.css";
import React from 'react';
import { signIn } from "../ultis/ultis";

function isGood(str) {
  if (str.length < 8) {
    return false;
  }
  return !/[^a-zA-Z0-9]/.test(str);
}

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      warning: null,
      username: "",
      password: "",
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  trySignIn = () => {
    const { username, password } = this.state;
    if (!isGood(username)) {
      this.setState({
        warning: "Please enter a valid username."
      })
    } else if (!isGood(password)) {
      this.setState({
        warning: "Please enter a valid password."
      })
    } else {
      signIn({ username, password })
      .then((data) => {
        this.props.setAppState("None", data.username, username);
        localStorage.setItem("username", data.username);
        localStorage.setItem("userId", username);
      })
      .catch((err) => this.setState({ warning: err.message }));
    }
  }
  render() {
    const { setAppState } = this.props,
      { warning } = this.state;
    return (
      <div className="signIU-form border-3 radius-10 padding-20 flex-col">
        <div onClick={() => setAppState("None")} className="close-btn flex-center">
          <i className="fa fa-close"></i>
        </div>
        <h1 className="center-text">SIGN IN</h1>
        <p className="extra-line">
          Not a member yet? <span
            className="recommend pointer" onClick={() => setAppState("SignUp")}
          >Sign up</span> now!
        </p>
        <input
          className="line"
          type="text"
          name="username"
          placeholder="Enter your username"
          onChange={this.handleChange}
          onKeyDown={(e) => {
            if(e.key === "Enter") {
              this.trySignIn();
            }
          }}
        />
        <input
          className="line"
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={this.handleChange}
          onKeyDown={(e) => {
            if(e.key === "Enter") {
              this.trySignIn();
            }
          }}
        />
        {warning === null ? null
          : <p className="extra-line warning">{warning}</p>}
        <p className="extra-line">Forget your password? Click here.</p>
        <button className="line last-btn" onClick={this.trySignIn}>
          Confirm
        </button>
      </div>
    );
  }
}