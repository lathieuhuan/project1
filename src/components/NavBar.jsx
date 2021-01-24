import "../assets/css/NavBar.css";
import React from 'react';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { signedIn: false };
  }
  render() {
    const { toggleForm } = this.props;
    return (
      <div id="head">
        <div id="nav-bar">
          {this.state.signedIn
            ? <a href="/home" id="logo-head">Minigame Hub</a>
            : <p id="logo-head">Minigame Hub</p>
          }
          <div id="search-bar">
            <input type="text" id="search-box" placeholder="Search for minigames..."/>
            <div id="search-btn">
              <img
                src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/search-512.png"
                id="search-icon" alt=""/>
            </div>
          </div>
          <ul>
            <li onClick={() => toggleForm("SignIn")}>Sign In</li>
            <li onClick={() => toggleForm("SignUp")}>Sign Up</li>
          </ul>
        </div>
      </div>
    );
  }
}