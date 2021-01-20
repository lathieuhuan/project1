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
    let name = document.getElementById("acc-name"),
      pass = document.getElementById("acc-pass");
    return (<div id="nav-bar">
      <input type="button"
        onClick={() => {
          if (UIstate === "signed-in") {
            changeUI("intro");
            name.value = "";
            pass.value = "";
          } else {
            this.toggleForm();
          }
        }}
        value={UIstate === "signed-in" ? "Sign out" : "Sign in"} />
      <input type="button" value="About" />
      <div id="signing-in" style={{display: signingIn ? "flex" : "none"}}>
        <input type="text" id="acc-name" placeholder="Username" />
        <input type="text" id="acc-pass" placeholder="Password" />
        <button onClick={() => {
          signIn({
            username: name.value,
            password: pass.value,
          })
          .then((userId) => {
            changeId(userId);
            changeUI("signed-in");
            this.toggleForm();
          })
          .catch((err) => {
            console.log(err.message); // error need handling
          });
        }}>
          Confirm
        </button>
      </div>
    </div>);
  }
}