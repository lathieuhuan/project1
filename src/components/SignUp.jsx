import "../assets/css/SignIU.css";
import React from 'react';

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temp: 0 };
  }
  render() {
    const { setModal } = this.props;
    return (
      <div className="signIU-form">
        <div onClick={() => setModal("None")} className="close center">
          <i className="fa fa-close"></i>
        </div>
        <h1>SIGN UP</h1>
        <p>
          Already a member? <span
            className="warning pointer" onClick={() => setModal("SignIn")}
          >Sign in</span>!
        </p>
        <input type="text" placeholder="Enter your username" />
        <input type="password" placeholder="Enter your password" />
        <input type="password" placeholder="Re-enter your password" />
        <input type="text" placeholder="Enter your email" />
        <button>Confirm</button>
      </div>
    );
  }
}