import "../assets/css/LeftCol.css";
import React from "react";
import { getConversOf } from "../ultis/ultis";
import { Conver } from "./Conver";

export class LeftCol extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chosen: 0, converList: [] };
  }
  choose = (index) => {
    this.props.changeConver(this.state.converList[index]);
    this.setState({ chosen: index });
  }
  componentDidMount() {
    getConversOf(this.props.userInfo.id)
    .then((convers) => {
      this.props.changeConver(convers[0]);
      this.setState({ converList: convers });
    });
  }
  render() {
    return (
      <div className="left-col wide-padding">
        <h1>CHAT APP</h1>
        <div className="flex">
          <img className="avatar" src={this.props.userInfo.avatar} alt=""/>
          <p>{this.props.userInfo.username}</p>
          <button>Sign out</button>
        </div>
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
                frInfo={conver.frInfo}
                choose={() => this.choose(i, conver.id)} />
            );
          })}
        </div>
      </div>
    );
  }
}