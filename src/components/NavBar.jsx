import "../assets/css/NavBar.css";
import React from 'react';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }
  render() {
    const { nickname, setModal } = this.props;
    let accNav = nickname === undefined ? (
      <ul>
          <li onClick={() => setModal("SignIn")}>Sign In</li>
          <li onClick={() => setModal("SignUp")}>Sign Up</li>
      </ul>
    ) : (
      <ul>
          <li>{nickname}</li>
      </ul>
    );
    return (
      <div id="head">
        <div id="nav-bar">
          <a href="/" id="logo-head">MinigameHub</a>
          <div id="search-bar">
            <input type="text" id="search-box" placeholder="Search for minigames..."/>
            <div id="search-btn">
              <img
                src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/search-512.png"
                id="search-icon" alt=""/>
            </div>
          </div>
          {accNav}
        </div>
      </div>
    );
  }
}