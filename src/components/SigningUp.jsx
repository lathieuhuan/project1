import "../assets/css/SigningUp.css";
import React from 'react';
import { signUp } from "../ultis/ultis";

function isGood(id) {
  if (document.getElementById(id).value.length < 4) {
    return false;
  }
  return true;
}

export class SigningUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nameExisted: false, nameGood: true, passGood: true };
  }
  handleAcc = (boo) => {
    this.setState({ nameGood: boo });
  }
  handlePwd = (boo) => {
    this.setState({ passGood: boo });
  }
  handleSubmit = () => {
    const nameGood = isGood("username"),
      passGood = isGood("password");
    this.handleAcc(nameGood);
    this.handlePwd(passGood);
    if (nameGood && passGood) {
      signUp({
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      })
      .then((userId) => {
        this.props.signIO(userId, "done-signing-up");
      })
      .catch(() => {
        this.setState({ nameExisted: true });
      });
    }
  }
  render() {
    return (<div id="signup-form">
      <h3>SIGN UP</h3>
      <p>Your username:</p>
      <input type="text" id="username"
        placeholder="Enter atleast 4 characters"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            this.handleSubmit();
          }
        }} />
      {this.state.nameGood ? null :
        <p className="warning">
          Your username must contains atlest 4 characters.
        </p>}
      {!this.state.nameExisted ? null :
        <p className="warning">
          This username has already existed.
        </p>}
      <p>Your password:</p>
      <input type="text" id="password"
        placeholder="Enter atleast 4 characters"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            this.handleSubmit();
          }
        }} />
      {this.state.passGood ? null :
        <p className="warning">
          Your password must contains atlest 4 characters.
        </p>}
      <div className="control-bar">
        <button onClick={this.handleSubmit}>Submit</button>
        <button onClick={() => this.props.signIO(null, "intro")}>Cancel</button>
      </div>
    </div>);
  }
}