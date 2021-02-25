import "../assets/css/Profile.css"
import React from "react";
import { PersonalInfo } from "./profile/PersonalInfo";
import { getUserInfo, editUserInfo } from "../ultis/ultis";
import { Loading } from "./Loading";
import { NotFound } from "./NotFound";

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      found: true,
      loadingDone: false,
      editing: false,
      info: {},
    };
    this.idForInfo = window.location.pathname.slice(9);
  }
  tryUpdate = (newInfo) => {
    const { info } = this.state,
      { userId } = this.props;
    for (let key in newInfo) {
      newInfo[key] = newInfo[key].trim();
    }
    if (JSON.stringify(info) !== JSON.stringify(newInfo)) {
      editUserInfo(userId, newInfo)
      .then(() => {
        if (info.username !== newInfo.username) {
          this.props.setAppState("None", newInfo.username, userId);
          localStorage.setItem("username", newInfo.username);
        }
        this.setState({
          editing: false,
          info: { ...newInfo }
        });
      });    
    } else {
      this.setState({ editing: false });
    }
  }
  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  }
  componentDidMount() {
    getUserInfo(this.idForInfo).then((info) => {
      this.setState({ info, loadingDone: true });
    })
    .catch(() => this.setState({ found: false }));
  }
  render() {
    return this.state.found ? this.state.loadingDone ? (
      <div className="flex" id="profile" >
        <PersonalInfo
          editing={this.state.editing}
          info={this.state.info}
          isOwner={this.props.userId === this.idForInfo}
          toggleEdit={this.toggleEdit}
          tryUpdate={this.tryUpdate}
        />
        <div className="radius-10" id="achievements"></div>
      </div>
    ) : <Loading /> : <NotFound />;
  }
}