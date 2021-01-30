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
  toSearchResult = () => {
    const searchTerm = document.getElementById("games-s-box").value;
    if (searchTerm.match(/([a-zA-Z0-9])+([ -~])*/)) {
      // true nếu searchTerm chứa ít nhất một chữ cái hoặc con số
      window.location.assign("/Library?search=" + searchTerm);
    }
  }
  render() {
    const { username, userId, setAppState } = this.props;
    const accNav = userId === null ? (
      <div className="acc-nav">
        <button onClick={() => setAppState("SignIn")}>Sign In</button>
        <button onClick={() => setAppState("SignUp")}>Sign Up</button>
      </div>
    ) : (
      <div className="acc-nav" id="acc-btn">
        <button onClick={this.toggleDropdown}>
          <img src="https://image.flaticon.com/icons/png/512/61/61205.png" id="acc-icon" alt=""/>
          {username}
        </button>
        {!this.state.expanded ? null : (
          <div className="acc-dropdown thinnest-border small-b-radius">
            <a href={"/Profile/" + userId}>
              My Profile
            </a>
            <button onClick={() => {
              this.toggleDropdown();
              setAppState("None");
              localStorage.removeItem("username");
              localStorage.removeItem("userId");
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
          <div className="flex" id="games-s-bar">
            <input
              className="narrow-padding" type="text" id="games-s-box"
              placeholder="Enter some keywords to search for games..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.toSearchResult();
                }
              }}
            />
            <div className="pointer" id="games-s-btn">
              <img
                src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/search-512.png"
                id="games-s-icon" alt=""
                onClick={this.toSearchResult}
              />
            </div>
          </div>
          {accNav}
        </div>
      </div>
    );
  }
}