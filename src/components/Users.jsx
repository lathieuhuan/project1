import "../assets/css/Users.css";
import React from "react";
// import { getUsers } from "../ultis/ultis";

export class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temp: null };
  }
  render() {
    return (
      <div>
        <p>This is the Users Page.</p>
      </div>
    );
  }
}