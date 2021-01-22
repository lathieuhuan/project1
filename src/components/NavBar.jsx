import "../assets/css/NavBar.css";
import React from 'react';
import { signIn } from "../ultis/ultis";

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { signingIn: false, warning: null };
  }
  tryLogIn = () => {
    const name = document.getElementById("acc-name"),
      pass = document.getElementById("acc-pass");
    signIn({
      username: name.value,
      password: pass.value,
    })
    .then((userId) => {
      this.props.signIO(userId, "signed-in");
      name.value = "";
      pass.value = "";
      this.toggleForm();
    })
    .catch((err) => {
      this.setWarning(err.message);
    });
  }
  setWarning = (err) => {
    this.setState({ warning: err });
  }
  toggleForm = () => {
    this.setState({ signingIn: !this.state.signingIn });
  }
  render() {
    const { UIstate, signIO } = this.props,
      { signingIn, warning } = this.state;
    return (<div id="nav-bar">
      <input type="button"
        onClick={() => {
          if (UIstate === "signed-in") {
            signIO(null, "intro");
            this.setWarning(null);
          } else {
            this.toggleForm();
          }
        }}
        value={UIstate === "signed-in" ? "Sign out" : "Sign in"} />
      <input type="button" value="About" />
      <div id="signing-in" style={{display: signingIn ? "flex" : "none"}}>
        <input type="text" id="acc-name" placeholder="Username"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              this.tryLogIn();
            }
          }} />
        <input type="text" id="acc-pass" placeholder="Password"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              this.tryLogIn();
            }
          }} />
        {warning === null ? null : <p className="warning">{warning}</p>}
        <button onClick={this.tryLogIn}>
          Confirm
        </button>
      </div>
    </div>);
  }
}