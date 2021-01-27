import "../assets/css/Profile.css"
import React from 'react';
import { PersonalInfo } from "./pfComps/PersonalInfo";

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }
  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  }
  render() {
    return (
      <div className="flex" id="profile">
        <PersonalInfo
          username={this.props.username}
          editing={this.state.editing}
          toggleEdit={this.toggleEdit}
        />
        <div className="right-col medium-b-radius"></div>
      </div>
    );
  }
}