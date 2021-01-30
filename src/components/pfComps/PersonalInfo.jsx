import "../../assets/css/pfCss/PersonalInfo.css";
import React from 'react';

function isGood(str) {
  if (str === "") {
    return false;
  }
  for (let char of str) {
    if (char === " ") {
      return false;
    }
  }
  return true;
}

export class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newNameGood: true,
      infoDup: {},
    };
  }
  handleChange = (e) => {
    let infoDup = this.state.infoDup;
    infoDup[e.target.name] = e.target.value;
    this.setState({ infoDup: infoDup });
  }
  setNewNameGood = (boo) => {
    this.setState({ newNameGood: boo });
  }
  componentDidUpdate() {
    if (!this.props.editing &&
    JSON.stringify(this.state.infoDup) !== JSON.stringify(this.props.info)) {
      this.setState({ infoDup: {...this.props.info} });
    }
  }
  render() {
    const { infoDup, newNameGood } = this.state,
      { editing, info, isOwner, toggleEdit, tryUpdate } = this.props;
    return editing && isOwner ? (
        <div className="left-col thin-border medium-b-radius flex-col">
        <img
          className="avatar"
          src="https://image.flaticon.com/icons/png/512/61/61205.png"
          alt=""
        />
        <input type="text" name="username" value={infoDup.username}
          onChange={this.handleChange}
        />
        <div className="flex row">
          <p>Gender:</p>
          <div className="flex gender">
            <input type="radio" name="gender" value="Male"
              checked={infoDup.gender === "Male"} onChange={this.handleChange}
            />
            <label>Male</label>
            <input type="radio" name="gender" value="Female"
              checked={infoDup.gender === "Female"} onChange={this.handleChange}
            />
            <label>Female</label>
          </div>
        </div>
        <div className="flex row">
          <p>Date of Birth:</p>
          <input type="date" name="dob" value={infoDup.dob || "2000-01-01"}
            min="1940-01-01" max="2015-12-31" onChange={this.handleChange}
          />
        </div>
        <div className="flex row">
          <p>Town/City:</p>
          <input
            type="text"
            name="townOcity"
            value={infoDup.townOcity || ""}
            onChange={this.handleChange}
          />
        </div>
        <div className="flex row">
          <p>Email address:</p>
          <input
            type="text"
            name="email"
            value={infoDup.email}
            onChange={this.handleChange}
          />
        </div>
        <p>About me:</p>
        <textarea
          className="thinner-border narrow-padding small-b-radius"
          id="about"
          name="about"
          value={infoDup.about || ""}
          onChange={this.handleChange}
        />
        {newNameGood ? null : <p className="warning-color center-align">
          Your new name is not valid.
        </p>}
        <div className="flex-center">
          <button style={{ marginRight: "15px" }}
            className="edit-btn thinnest-border smaller-b-radius"
            onClick={() => {
              const nameGood = isGood(infoDup.username);
              if (nameGood) {
                tryUpdate(this.state.infoDup);
              }
              this.setNewNameGood(nameGood);
            }}
          >
            Save
          </button>
          <button
            className="edit-btn thinnest-border smaller-b-radius"
            onClick={() => {
              toggleEdit();
              this.setNewNameGood(true);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    ) : (
      <div className="left-col thin-border medium-b-radius flex-col">
        <img
          className="avatar"
          src="https://image.flaticon.com/icons/png/512/61/61205.png"
          alt=""
        />
        <h1><span>{info.username}</span></h1>
        <p>Gender: <span>{info.gender}</span></p>
        <p>Date of Birth: <span>{info.dob}</span></p>
        <p>Town/City: <span>{info.townOcity}</span></p>
        <p>Email address: <span>{info.email}</span></p>
        <p>About me:</p>
        <p
          className="thinner-border narrow-padding small-b-radius"
          id="about"
        >
          <span>{info.about}</span>
        </p>
        {!isOwner ? null : (
          <button
            className="edit-btn thinnest-border smaller-b-radius"
            onClick={toggleEdit}
          >
            Edit Profile
          </button>
        )}
      </div>
    );
  }
}