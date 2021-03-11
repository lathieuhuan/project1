import React from "react";
import { signIn } from "../../ultis/firestoreUltis";

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
        this.props.setAppState("None", data.username, username, data.avatar);
        localStorage.setItem("username", data.username);
        localStorage.setItem("userId", username);
        localStorage.setItem("avatar", data.avatar);
      })
      .catch((err) => this.setState({ warning: err.message }));
    }
  }
  render() {
    const { setAppState } = this.props,
      { warning } = this.state;
    return (
      <div className="modal_inner border-3 radius-10 padding-20 flex-col">
        <div onClick={() => setAppState("None")} className="close-btn flex-center">
          <i className="fa fa-close"></i>
        </div>
        <h1 id="modal_heading">SIGN IN</h1>
        <p className="modal_sub-line">
          Not a member yet? <span
            className="recommend pointer" onClick={() => setAppState("SignUp")}
          >Sign up</span> now!
        </p>
        <input
          className="modal_main-line"
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
          className="modal_main-line"
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
          : <p className="modal_sub-line warning">{warning}</p>}
        <p className="modal_sub-line">Forget your password? Click here.</p>
        <button className="modal_main-line last-btn" onClick={this.trySignIn}>
          Confirm
        </button>
      </div>
    );
  }
}