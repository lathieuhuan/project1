import "../assets/css/Profile.css"
import React from "react";
import { EditPsnI } from "./profile/EditPsnI";
import { ShowPsnI } from "./profile/ShowPsnI";
import { Loading } from "./Loading";
import { NotFound } from "./NotFound";
import { getUserInfo, editUserInfo } from "../ultis/ultis";

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
    const isOwner = this.props.userId === this.idForInfo;
    return this.state.found ? this.state.loadingDone ? (
      <div className="flex" id="profile" >
        {isOwner && this.state.editing ? (
          <EditPsnI
            editing={this.state.editing}
            info={this.state.info}
            toggleEdit={this.toggleEdit}
            tryUpdate={this.tryUpdate}
          />
        ) : (
          <ShowPsnI
            info={this.state.info}
            isOwner={isOwner}
            toggleEdit={this.toggleEdit}
          />
        )}
        <div className="radius-10" id="achievements"></div>
      </div>
    ) : <Loading /> : <NotFound />;
  }
}