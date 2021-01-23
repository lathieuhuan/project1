import "../assets/css/NavBar.css";
import React from 'react';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { signedIn: false };
  }
  render() {
    return (
      <div id="head">
        <div id="nav-bar">
          <div id="logo-head">
            {this.props.at === "Home"
              ? <p>Minigame Hub</p>
              : <a href="/home">Minigame Hub</a>
            }
          </div>
          <div id="search-bar">
            <input type="text" id="search-box" placeholder="Search for minigames..."/>
            <div id="search-btn">
              <img
                src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/search-512.png"
                id="search-icon" alt=""/>
            </div>
          </div>
          <ul>
            <li>Sign In</li>
            <li>Sign Up</li>
          </ul>
        </div>
      </div>
    );
  }
}