import "../assets/css/NavBar.css";
import React from 'react';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  toggleDropdown = () => {
    this.setState({ expanded: !this.state.expanded });
  }
  render() {
    const { username, nickname, setAppState } = this.props;
    const accNav = username === "Guest" ? (
      <div className="acc-nav">
        <button onClick={() => setAppState("SignIn")}>Sign In</button>
        <button onClick={() => setAppState("SignUp")}>Sign Up</button>
      </div>
    ) : (
      <div className="acc-nav" id="acc-btn">
        <button onClick={this.toggleDropdown}>
          <img src="https://image.flaticon.com/icons/png/512/61/61205.png" id="acc-icon" alt=""/>
          {nickname}
        </button>
        {!this.state.expanded ? null : (
          <div className="acc-dropdown thinnest-border small-b-radius">
            <a href="/my_profile">
              My Profile
            </a>
            <button onClick={() => {
              this.toggleDropdown();
              setAppState("None");
              localStorage.removeItem("nickname");
              localStorage.removeItem("username");
              if (window.location.pathname === "/my_profile") {
                window.location.assign(`/profile?user=${username}`);
              }
            }}>
              Sign out
            </button>
          </div>
        )}
      </div>
    );
    return (
      <div id="head">
        <div className="flex" id="nav-bar">
          <a href="/" id="logo-head">MinigameHub</a>
          <div className="flex" id="search-bar">
            <input
              className="narrow-padding" type="text"
              id="search-box" placeholder="Search for minigames..."
            />
            <div className="pointer" id="search-btn">
              <img
                src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/search-512.png"
                id="search-icon" alt=""
              />
            </div>
          </div>
          {accNav}
        </div>
      </div>
    );
  }
}