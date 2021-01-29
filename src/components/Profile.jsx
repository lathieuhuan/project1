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
  tryUpdate = (info) => {
    if (JSON.stringify(this.state.info) !== JSON.stringify(info)) {
      editUserInfo(this.props.username, info);
      this.setState({ editing: false, info: info });
      this.props.setAppState("None", info.nickname, this.props.username);
      localStorage.setItem("nickname", info.nickname);
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
          isOwner={this.props.username === this.nameForInfo}
          toggleEdit={this.toggleEdit}
          tryUpdate={this.tryUpdate}
        />
        <div className="right-col medium-b-radius"></div>
      </div>
    );
  }
}