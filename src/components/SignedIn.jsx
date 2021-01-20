import "../assets/css/SignedIn.css";
import React from 'react';
import { Home } from "./Home";
import { Editing } from "./Editing";

export class SignedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { UIstate: "home" };
  }
  render() {
    let { UIstate } = this.state;
    return UIstate === "home" ? <Home /> : <Editing />;
  }
}