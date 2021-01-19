import "../assets/css/SigningUp.css";
import React from 'react';

function isGood(id) {
  if (document.getElementById(id).value.length < 4) {
    return false;
  }
  return true;
}

export class SigningUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { accOk: true, pasOk: true };
  }
  handleAcc = (boo) => {
    this.setState({ accOk: boo });
  }
  handlePas = (boo) => {
    this.setState({ pasOk: boo });
  }
  render() {
    return (<div id="signup-form">
      <h3>SIGN UP</h3>
      <p>Your account:</p>
      <input type="text" id="account"
        placeholder="Enter atleast 4 characters" />
      {this.state.accOk === true ? null :
        <p className="warning">
          Your account must contains atlest 4 characters.
        </p>}
      <p>Your password:</p>
      <input type="text" id="password"
        placeholder="Enter atleast 4 characters" />
      {this.state.pasOk === true ? null :
        <p className="warning">
          Your password must contains atlest 4 characters.
        </p>}
      <button id="submit"
        onClick={() => {
          this.handleAcc(isGood("account"));
          this.handlePas(isGood("password"));
          // if (isGood("account")) {
          //   this.handleAcc(true);
          // } else {
          //   this.handleAcc(false);
          // }
          // if (isGood("password")) {
          //   this.handlePas(true);
          // } else {
          //   this.handlePas(false);
          // }
          if (isGood("account") && isGood("password")) {
            this.props.changeUI("signed-in");
          }
        }}>
          Submit
      </button>
    </div>);
  }
}