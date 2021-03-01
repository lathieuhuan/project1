import "../../assets/css/profile/Achievements.css";
import React from "react";

export class Achievements extends React.Component {
  constructor(props) {
    super(props);
    this.state = { achievements: [] };
  }
  render() {
    return (
      <div id="achievements">
        {this.state.achievements.map((acm, i) => {
          return (
            <div key={i}>
              <p>Title: {acm.gameTitle}</p>
              <p>Best Record: {acm.bestRecord}</p>
            </div>
          );
        })}
      </div>
    );
  }
}