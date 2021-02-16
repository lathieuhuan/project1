import "../assets/css/LeftCol.css";
import React from "react";
import { getConversOf } from "../ultis/ultis";
import { Conver } from "./Conver";

export class LeftCol extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chosen: 0, converList: [] };
  }
  choose = (i) => {
    this.props.changeConver(this.state.converList[i]);
    this.setState({ chosen: i });
  }
  componentDidMount() {
    getConversOf(this.props.userId)
    .then((convers) => {
      this.props.changeConver(convers[this.state.chosen]);
      this.setState({ converList: convers });
    });
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
          {this.state.converList.map((conver, i) => {
            return (
              <Conver
                key={i}
                isChosen={i === this.state.chosen}
                name={conver.FrInfo.username}
                avatar={conver.FrInfo.avatar}
                choose={() => this.choose(i)} />
            );
          })}
        </div>
      </div>
    );
  }
}