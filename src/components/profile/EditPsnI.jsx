import "../../assets/css/profile/PersonalInfo.css";
import React from 'react';
import { uploadAvatar } from "../../ultis/gcloudUltis";

function isGood(str) {
  return str.match(/([a-zA-Z0-9])+([ -~])*/);
}

export class EditPsnI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newNameGood: true,
      infoDup: { ...props.info },
    };
    this.avatarFile = null;
  }
  handleChange = (e) => {
    let { infoDup } = this.state;
    infoDup[e.target.name] = e.target.value;
    this.setState({ infoDup });
  }
  setNewNameGood = (boo) => {
    this.setState({ newNameGood: boo });
  }
  getAvatarUrl = () => {
    let { infoDup } = this.state;
    if (this.avatarFile !== null) {
      uploadAvatar(this.avatarFile, this.props.userId)
      .then((url) => {
        infoDup.avatar = url;
        this.props.tryUpdate(infoDup);
        this.avatarFile = null;
      })
      .catch(() => {
        alert("Some error has occurred, please try again later.");
      });
    } else {
      this.props.tryUpdate(infoDup);
    }
  }
  // componentDidUpdate() {
  //   if (!this.props.editing &&
  //   JSON.stringify(this.state.infoDup) !== JSON.stringify(this.props.info)) {
  //     this.setState({ infoDup: { ...this.props.info } });
  //   }
  // }
  render() {
    const { newNameGood, infoDup } = this.state,
      { toggleEdit } = this.props;
    return (
      <div className="flex-col" id="psn-info">
        <div className="avatar">
          <img
            id="avatar-preview"
            className="parent-size"
            src={infoDup.avatar}
            alt=""
          />
          <input id="choose-file" type="file" accept="image/*" onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              this.avatarFile = e.target.files[0];
              let reader = new FileReader();
              reader.onload = (ev) => {
                document.getElementById("avatar-preview").src = ev.target.result;
              }
              reader.readAsDataURL(e.target.files[0]);
            }
          }} />
          <button id="change-avatar" onClick={() => {
            document.getElementById("choose-file").click();
          }}><i className="fa fa-photo"></i></button>
        </div>
        <input
          id="psni_username"
          type="text"
          name="username"
          spellCheck={false}
          value={infoDup.username}
          onChange={this.handleChange}
        />
        <div className="psni_row">
          <p className="psni_type">Gender:</p>
          <div className="flex psni_val">
            <input
              className="psni_gender"
              type="radio"
              name="gender"
              value="Male"
              checked={infoDup.gender === "Male"}
              onChange={this.handleChange}
            />
            <label>Male</label>
            <input
              className="psni_gender"
              type="radio"
              name="gender"
              value="Female"
              checked={infoDup.gender === "Female"}
              onChange={this.handleChange}
            />
            <label>Female</label>
          </div>
        </div>
        <div className="psni_row">
          <p className="psni_type">Date of Birth:</p>
          <input
            className="psni_val"
            type="date"
            name="dob"
            value={infoDup.dob}
            min="1940-01-01" max="2015-12-31"
            onChange={this.handleChange}
          />
        </div>
        <div className="psni_row">
          <p className="psni_type">Town/City:</p>
          <input
            className="psni_val"
            type="text"
            name="townOcity"
            value={infoDup.townOcity}
            onChange={this.handleChange}
          />
        </div>
        <div className="psni_row">
          <p className="psni_type">Email address:</p>
          <input
            className="psni_val"
            type="text"
            name="email"
            value={infoDup.email}
            onChange={this.handleChange}
          />
        </div>
        <p className="psni_type">About me:</p>
        <textarea
          id="psni_about-editing"
          name="about"
          spellCheck={false}
          value={infoDup.about}
          onChange={this.handleChange}
        />
        {newNameGood ? null : <p className="mgtop-10 warning center-text">
          Your new name is not valid.
        </p>}
        <div className="flex-center">
          <button
            className="last-btn"
            onClick={() => {
              const nameGood = isGood(infoDup.username);
              if (nameGood) this.getAvatarUrl();
              this.setNewNameGood(nameGood);
            }}
          >
            Save
          </button>
          <button
            className="last-btn"
            onClick={() => {
              this.setNewNameGood(true);
              toggleEdit();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}