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
      <div className="left-col thin-border medium-b-radius flex-col">
        <img
          className="avatar"
          // src="https://image.flaticon.com/icons/png/512/61/61205.png" denied
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlNyI5Bbsl1vq1BQjH9XA-Z4j0Kkk0cEpAnA"
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
          <input type="date" name="dob" value={infoDup.dob}
            min="1940-01-01" max="2015-12-31" onChange={this.handleChange}
          />
        </div>
        <div className="flex row">
          <p>Town/City:</p>
          <input
            type="text"
            name="townOcity"
            value={infoDup.townOcity}
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
          value={infoDup.about}
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
              if (nameGood) tryUpdate(infoDup);
              this.setNewNameGood(nameGood);
            }}
          >
            Save
          </button>
          <button
            className="edit-btn thinnest-border smaller-b-radius"
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