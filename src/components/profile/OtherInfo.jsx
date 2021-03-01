import "../../assets/css/profile/OtherInfo.css";
import React from "react";
import { Achievements } from "./Achievements";

export class OtherInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { atTab: "achievements" };
  }
  render() {
    const content = {
      achievements: <Achievements />,
    }
    return (
      <div id="other-info">
        <div className="padding-5-10" id="oi_nav">
          <h2 className="oi_tab">Achievements</h2>
        </div>
        {content[this.state.atTab]}
      </div>
    );
  }
}