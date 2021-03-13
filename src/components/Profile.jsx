import "../assets/css/Profile.css"
import React from "react";
import { EditPsnI } from "./profile/EditPsnI";
import { ShowPsnI } from "./profile/ShowPsnI";
import { Loading } from "./Loading";
import { NotFound } from "../components/accessories/NotFound";
import { getUserInfo, editUserInfo } from "../ultis/firestoreUltis";
import { OtherInfo } from "./profile/OtherInfo";

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
        if (info.username !== newInfo.username || info.avatar !== newInfo.avatar) {
          this.props.setAppState("None", newInfo.username, userId, newInfo.avatar);
          localStorage.setItem("username", newInfo.username);
          localStorage.setItem("avatar", newInfo.avatar);
        }
        this.setState({ editing: false, info: { ...newInfo } });
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
      <div id="profile" >
        {isOwner && this.state.editing ? (
          <EditPsnI
            editing={this.state.editing}
            info={this.state.info}
            toggleEdit={this.toggleEdit}
            tryUpdate={this.tryUpdate}
            userId={this.props.userId}
          />
        ) : (
          <ShowPsnI
            info={this.state.info}
            isOwner={isOwner}
            toggleEdit={this.toggleEdit}
          />
        )}
        <OtherInfo />
      </div>
    ) : <Loading /> : <NotFound />;
  }
}