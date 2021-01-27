import "../../assets/css/pfCss/PersonalInfo.css";
import React from 'react';
import { getUserInfo } from "../../ultis/ultis";

export class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      gender: "",
      dob: "",
      townOcity: "",
      email: "",
      about: "",
    }
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    getUserInfo(this.props.username).then((data) => {
      this.setState({
        nickname: data.nickname,
        gender: data.gender,
        dob: data.dob,
        townOcity: data.townOcity,
        email: data.email,
        about: data.about,
      })
    })
  }
  render() {
    const { nickname, gender, dob, townOcity, email, about } = this.state,
      { toggleEdit } = this.props;
    return this.props.editing ? (
        <div className="left-col thin-border medium-b-radius flex-col">
        <img
          className="avatar"
          src="https://image.flaticon.com/icons/png/512/61/61205.png"
          alt=""
        />
        <input name="nickname" value={nickname} onChange={this.handleChange}/>
        <div className="flex row">
          <p>Gender:</p>  
          <input name="gender" value={gender} onChange={this.handleChange}/>
        </div>
        <div className="flex row">
          <p>Date of Birth:</p>  
          <input name="dob" value={dob} onChange={this.handleChange}/>
        </div>
        <div className="flex row">
          <p>Current Town/City:</p>  
          <input name="townOcity" value={townOcity} onChange={this.handleChange}/>
        </div>
        <div className="flex row">
          <p>Email address:</p>  
          <input name="email" value={email} onChange={this.handleChange}/>
        </div>
        <p>About me:</p>
        <textarea
          className="thinner-border narrow-padding small-b-radius"
          id="about"
          name="about"
          value={about}
          onChange={this.handleChange}
        />
        <div className="flex row">
          <button className="edit-btn thinnest-border smaller-b-radius">
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
        <h1>{nickname}</h1>
        <p>Gender: {gender}</p>
        <p>Date of Birth: {dob}</p>
        <p>Current Town/City: {townOcity}</p>
        <p>Email address: {email}</p>
        <p>About me:</p>
        <p
          className="thinner-border narrow-padding small-b-radius"
          id="about"
        >
          {about}
        </p>
        <button
          className="edit-btn thinnest-border smaller-b-radius"
          onClick={toggleEdit}
        >
          Edit Profile
        </button>
      </div>
    );
  }
}