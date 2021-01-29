import {  } from "../assets/css/LeftCol.css";
import React from "react";

export class LeftCol extends React.Component {
  constructor(props) {
    super(props);
    this.state = { friends: ["A", "B", "C"] };
  }
  render() {
    return (
      <div className="left-col wide-padding">
        <h1>CHAT APP</h1>
        <div className="flex-between">
          <input type="text" placeholder="Search for friends..." id="fr-search-box"/>
          <button id="fr-search-btn">Search</button>
        </div>
        <div className="flex-col narrow-padding">
          {this.state.friends.map((name, i) => {
            return (
              <div key={i} className="narrow-padding pointer namecard"
                onClick={() => this.props.changeTarget(name)}
              >
                {name}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}