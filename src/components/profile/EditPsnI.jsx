import "../../assets/css/profile/PersonalInfo.css";
import React from 'react';

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
      { toggleEdit, tryUpdate } = this.props;
    return (
      <div className="border-3 radius-10 flex-col" id="psn-info">
        <img
          className="avatar"
          // src="https://image.flaticon.com/icons/png/512/61/61205.png" denied
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlNyI5Bbsl1vq1BQjH9XA-Z4j0Kkk0cEpAnA"
          alt=""
        />
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
    );
  }
}