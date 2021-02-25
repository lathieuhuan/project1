import "../../assets/css/profile/PersonalInfo.css";
import React from 'react';
import { ShowInfo } from "./ShowInfo";

function isGood(str) {
  return str.match(/([a-zA-Z0-9])+([ -~])*/);
}

export class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newNameGood: true,
      infoDup: { ...props.info },
    };
  }
  handleChange = (e) => {
    let { infoDup } = this.state;
    infoDup[e.target.name] = e.target.value;
    this.setState({ infoDup });
  }
  setNewNameGood = (boo) => {
    this.setState({ newNameGood: boo });
  }
  componentDidUpdate() {
    if (!this.props.editing &&
    JSON.stringify(this.state.infoDup) !== JSON.stringify(this.props.info)) {
      this.setState({ infoDup: { ...this.props.info } });
    }
  }
  render() {
    const { newNameGood, infoDup } = this.state,
      { editing, info, isOwner, toggleEdit, tryUpdate } = this.props;
    return editing && isOwner ? (
      <div className="border-3 radius-10 flex-col" id="psn-info">
        <img
          className="avatar"
          // src="https://image.flaticon.com/icons/png/512/61/61205.png" denied
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlNyI5Bbsl1vq1BQjH9XA-Z4j0Kkk0cEpAnA"
          alt=""
        />
        <input
          id="psn-username"
          type="text"
          name="username"
          spellCheck={false}
          value={infoDup.username}
          onChange={this.handleChange}
        />
        <div className="row">
          <p className="psni-type">Gender:</p>
          <div className="flex psni-val">
            <input
              className="psn-gender"
              type="radio"
              name="gender"
              value="Male"
              checked={infoDup.gender === "Male"}
              onChange={this.handleChange}
            />
            <label>Male</label>
            <input
              className="psn-gender"
              type="radio"
              name="gender"
              value="Female"
              checked={infoDup.gender === "Female"}
              onChange={this.handleChange}
            />
            <label>Female</label>
          </div>
        </div>
        <div className="row">
          <p className="psni-type">Date of Birth:</p>
          <input
            className="psni-val"
            type="date"
            name="dob"
            value={infoDup.dob}
            min="1940-01-01" max="2015-12-31"
            onChange={this.handleChange}
          />
        </div>
        <div className="row">
          <p className="psni-type">Town/City:</p>
          <input
            className="psni-val"
            type="text"
            name="townOcity"
            value={infoDup.townOcity}
            onChange={this.handleChange}
          />
        </div>
        <div className="row">
          <p className="psni-type">Email address:</p>
          <input
            className="psni-val"
            type="text"
            name="email"
            value={infoDup.email}
            onChange={this.handleChange}
          />
        </div>
        <p className="psni-type">About me:</p>
        <textarea
          id="about"
          name="about"
          spellCheck={false}
          value={infoDup.about}
          onChange={this.handleChange}
        />
        {newNameGood ? null : <p className="warning-color center-align">
          Your new name is not valid.
        </p>}
        <div className="flex-center">
          <button
            className="last-btn"
            onClick={() => {
              const nameGood = isGood(infoDup.username);
              if (nameGood) tryUpdate(infoDup);
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
    ) : <ShowInfo info={info} isOwner={isOwner} toggleEdit={toggleEdit} />;
  }
}