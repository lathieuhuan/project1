import "../assets/css/Profile.css"
import React from 'react';
import { PersonalInfo } from "./pfComps/PersonalInfo";
import { getUserInfo, editUserInfo } from "../ultis/ultis";

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      info: {},
    };
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
    if (this.props.username === "Guest") {
      window.location.assign("/");
    } else {
      getUserInfo(this.props.username).then((data) => {
        this.setState({ info: { ...data } });
      });
    }
  }
  render() {
    return (
      <div className="flex" id="profile">
        <PersonalInfo
          {...this.state}
          username={this.props.username}
          toggleEdit={this.toggleEdit}
          tryUpdate={this.tryUpdate}
        />
        <div className="right-col medium-b-radius"></div>
      </div>
    );
  }
}