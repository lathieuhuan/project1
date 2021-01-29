import "../assets/css/Profile.css"
import React from "react";
import { PersonalInfo } from "./pfComps/PersonalInfo";
import { getUserInfo, editUserInfo } from "../ultis/ultis";

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      info: {},
    };
    this.nameForInfo = window.location.pathname.slice(9);
  }
  tryUpdate = (newInfo) => {
    const { info } = this.state,
      { userId } = this.props;
    if (JSON.stringify(info) !== JSON.stringify(newInfo)) {
      editUserInfo(userId, newInfo);
      this.setState({ editing: false, info: newInfo });
      // if (info.username !== newInfo.username) {
      this.props.setAppState("None", newInfo.username, userId);
      localStorage.setItem("username", newInfo.username);
      // }
    }
  }
  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  }
  componentDidMount() {
    getUserInfo(this.nameForInfo).then((data) => {
      this.setState({ info: { ...data } });
    })
    .catch(() => {
      window.location.assign("/Page_Not_Found");
    });
  }
  render() {
    return (
      <div className="flex" id="profile">
        <PersonalInfo
          {...this.state}
          isOwner={this.props.userId === this.nameForInfo}
          toggleEdit={this.toggleEdit}
          tryUpdate={this.tryUpdate}
        />
        <div className="right-col medium-b-radius"></div>
      </div>
    );
  }
}