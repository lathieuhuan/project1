import "../../assets/css/pfCss/PersonalInfo.css";
import React from 'react';

export class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidUpdate() {
    if (!this.props.editing &&
    JSON.stringify(this.state) !== JSON.stringify(this.props.info)) {
      this.setState({ ...this.props.info });
    }
  }
  render() {
    const { username, gender, dob, townOcity, email, about } = this.state,
      { editing, info, isOwner, toggleEdit, tryUpdate } = this.props;
    return editing && isOwner ? (
        <div className="left-col thin-border medium-b-radius flex-col">
        <img
          className="avatar"
          src="https://image.flaticon.com/icons/png/512/61/61205.png"
          alt=""
        />
        <input type="text" name="username" value={username}
          onChange={this.handleChange}
        />
        <div className="flex row">
          <p>Gender:</p>
          <div className="flex gender">
            <input type="radio" name="gender" value="Male"
              checked={gender === "Male"} onChange={this.handleChange}
            />
            <label>Male</label>
            <input type="radio" name="gender" value="Female"
              checked={gender === "Female"} onChange={this.handleChange}
            />
            <label>Female</label>
          </div>
        </div>
        <div className="flex row">
          <p>Date of Birth:</p>
          <input type="date" name="dob" value={dob || "2000-01-01"}
            min="1940-01-01" max="2015-12-31" onChange={this.handleChange}
          />
        </div>
        <div className="flex row">
          <p>Town/City:</p>
          <input type="text" name="townOcity" value={townOcity || ""} onChange={this.handleChange}/>
        </div>
        <div className="flex row">
          <p>Email address:</p>
          <input type="text" name="email" value={email} onChange={this.handleChange}/>
        </div>
        <p>About me:</p>
        <textarea
          className="thinner-border narrow-padding small-b-radius"
          id="about"
          name="about"
          value={about || ""}
          onChange={this.handleChange}
        />
        <div className="flex-center">
          <button style={{ marginRight: "15px" }}
            className="edit-btn thinnest-border smaller-b-radius"
            onClick={() => tryUpdate(this.state)}
          >
            Save
          </button>
          <button
            className="edit-btn thinnest-border smaller-b-radius"
            onClick={toggleEdit}
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
        <h1>{info.username}</h1>
        <p>Gender: {info.gender}</p>
        <p>Date of Birth: {info.dob}</p>
        <p>Town/City: {info.townOcity}</p>
        <p>Email address: {info.email}</p>
        <p>About me:</p>
        <p
          className="thinner-border narrow-padding small-b-radius"
          id="about"
        >
          {info.about}
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