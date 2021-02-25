import "../assets/css/SignIU.css";
import React from "react";
import { signUp } from "../ultis/ultis";

function isGood(str) {
  if (str.length < 8) {
    return false;
  }
  return !/[^a-zA-Z0-9]/.test(str);
}

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      cf_password: "",
      email: "",
      nameWarning: null,
      passWarning: null,
      pwdConfirmed: false,
      tooltipOn: false,
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  trySignUp = () => {
    const { username, password, email, pwdConfirmed } = this.state,
      nameGood = isGood(username),
      passGood = isGood(password);
    this.setState({
      nameWarning: nameGood ? null : "Please enter a valid username.",
      passWarning: passGood ? null : "Please enter a valid password.",
    });
    if (nameGood && passGood && pwdConfirmed) {
      signUp({ username, password, email })
      .then(() => {
        this.props.setAppState("Redirecting", username);
      })
      .catch((err) => this.setState({ nameWarning: err.message }));
    }
  }
  comparePwd = (e) => {
    const { password, cf_password } = this.state,
      value = e.target.value;
    this.setState({
      [e.target.name]: value,
      pwdConfirmed: e.target.name === "password"
        ? (value !== "" && value === cf_password)
        : (password !== "" && password === value)
    });
  }
  toggleTooltip = () => {
    this.setState({ tooltipOn: !this.state.tooltipOn });
  }
  render() {
    const { setAppState } = this.props,
      { nameWarning, passWarning, pwdConfirmed, tooltipOn } = this.state;
    return (
      <div className="signIU-form border-3 radius-10 padding-20 flex-col">
        {tooltipOn ? <p className="tooltip radius-10 padding-10">
          Your username and password must contain atleast 8 characters, letters and numbers only.
        </p> : null}
        <div onClick={() => setAppState("None")} className="close-btn flex-center">
          <i className="fa fa-close"></i>
        </div>
        <h1 className="center-text">SIGN UP</h1>
        <p className="extra-line">
          Already a member? <span
            className="recommend pointer" onClick={() => setAppState("SignIn")}
          >Sign in</span>!
        </p>
        <input
          className="line"
          type="text"
          name="username"
          placeholder="Enter your username"
          onChange={this.handleChange}
          onKeyDown = {(e) => {
            if (e.key === "Enter") {
              this.trySignUp();
            }
          }}
          onFocus={this.toggleTooltip}
          onBlur={this.toggleTooltip}
        />
        {nameWarning === null ? null : (
          <p className="extra-line warning">{nameWarning}</p>
        )}
        <input
          className="line"
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={this.comparePwd}
          onKeyDown = {(e) => {
            if (e.key === "Enter") {
              this.trySignUp();
            }
          }}
          onFocus={this.toggleTooltip}
          onBlur={this.toggleTooltip}
        />
        {passWarning === null ? null : (
          <p className="extra-line warning">{passWarning}</p>
        )}
        <input
          className="line right-bg-img"
          type="password"
          name="cf_password"
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
          className="line"
          type="text"
          name="email"
          placeholder="Enter your email address"
          onChange={this.handleChange}
          onKeyDown = {(e) => {
            if (e.key === "Enter") {
              this.trySignUp();
            }
          }}
        />
        <button className="line last-btn" onClick={this.trySignUp}>
          Submit
        </button>
      </div>
    );
  }
}