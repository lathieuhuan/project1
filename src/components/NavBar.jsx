import "../assets/css/NavBar.css";
import React from 'react';
import { signIn } from "../ultis/ultis";

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { signingIn: false, nameGood: true, passGood: true };
  }
  toggleForm = () => {
    this.setState({ signingIn: !this.state.signingIn })
  }
  render() {
    const { UIstate, changeUI, changeId } = this.props,
      { signingIn } = this.state;
    return (<div id="nav-bar">
      <input type="button"
        onClick={this.toggleForm}
        value={UIstate === "signed-in" ? "Sign out" : "Sign in"} />
      <input type="button" value="About" />
      <div id="signing-in" style={{display: signingIn ? "flex" : "none"}}>
        <input type="text" id="acc-name" placeholder="Username" />
        <input type="text" id="acc-pass" placeholder="Password" />
        <button onClick={() => {
          signIn({
            username: document.getElementById("acc-name").value,
            password: document.getElementById("acc-pass").value,
          })
          .then((userId) => {
            changeId(userId);
          })
          .catch((err) => {
            console.log(err.message); // error need handling
          });
          changeUI(UIstate === "signed-in" ? "intro" : "signed-in")
        }}>
          Confirm
        </button>
      </div>
    </div>);
  }
}