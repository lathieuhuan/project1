import "../assets/css/NavBar.css";
import React from 'react';
import { signIn } from "../ultis/ultis";

function isGood(str) {
  if (str.length < 4) {
    return false;
  }
  // need more restrictions
  return true;
}

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { signingIn: false, warning: null };
  }
  tryLogin = () => {
    let name = document.getElementById("acc-name").value,
      pass = document.getElementById("acc-pass").value;
    if (!isGood(name)) {
      this.setWarning("Please enter a valid username.");
    } else if (!isGood(pass)) {
      this.setWarning("Please enter a valid password.");
    } else {
      signIn({ username: name, password: pass })
      .then((userId) => {
        name = pass = "";
        this.toggleForm();
        this.props.signIO(userId);
        window.location.pathname = "/tasks";
      })
      .catch((err) => {
        this.setWarning(err.message);
      });
    }
  }
  setWarning = (ms) => {
    this.setState({ warning: <p className="warning">{ms}</p> });
  }
  toggleForm = () => {
    this.setState({ signingIn: !this.state.signingIn });
  }
  render() {
    const { signedIn, signIO } = this.props,
      { signingIn, warning } = this.state;
    return (
      <div id="nav-bar">
        <input type="button"
          onClick={() => {
            if (signedIn) {
              this.setWarning(null);
              signIO();
              window.location.pathname = "/";
            } else {
              this.toggleForm();
            }
          }}
          value={signedIn ? "Sign out" : "Sign in"} />
        <input type="button" value="About" />
        {signingIn ? (
          <div id="signing-in">
            <input type="text" id="acc-name" placeholder="Username"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.tryLogin();
                }
              }} />
            <input type="password" id="acc-pass" placeholder="Password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.tryLogin();
                }
              }} />
            {warning}
            <button onClick={this.tryLogin}>Confirm</button>
          </div>
        ) : null}
      </div>
    );
  }
}