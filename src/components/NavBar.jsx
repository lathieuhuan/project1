import "../assets/css/NavBar.css";
import React from 'react';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false, searchTerm: "" };
    this.typeRef = React.createRef();
  }
  toggleDropdown = () => {
    this.setState({ expanded: !this.state.expanded });
  }
  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value })
  }
  handleClickOutside = (e) => {
    if (this.state.expanded && !this.typeRef.current.contains(e.target)) {
      this.toggleDropdown();
    }
  }
  toSearchResult = () => {
    const { searchTerm } = this.state;
    if (searchTerm.match(/([a-zA-Z0-9])+([ -~])*/)) {
      // true nếu searchTerm chứa ít nhất một chữ cái hoặc con số
      window.location.assign("/Library?search=" + searchTerm);
    }
  }
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }
  render() {
    const { setAppState, username, userId, avatar } = this.props;
    const menu = userId === null ? (
      <div id="nav_menu">
        <button className="menu-opt" onClick={() => setAppState("SignIn")}>
          Sign In
        </button>
        <button className="menu-opt" onClick={() => setAppState("SignUp")}>
          Sign Up
        </button>
      </div>
    ) : (
      <div ref={this.typeRef} id="nav_menu">
        <button className="menu-opt flex" onClick={this.toggleDropdown}>
          <img
            className="avatar"
            src={avatar}
            alt=""
          />
          <p className="username">{username}</p>
        </button>
        {this.state.expanded ? (
          <div className="dropdown radius-5 flex-col">
            <button className="acc-opt" onClick={() => {
              window.location.assign("/Profile/" + userId)
            }}>
              My Profile
            </button>
            <button className="acc-opt" onClick={() => {
              this.toggleDropdown();
              setAppState("None");
              localStorage.clear();
            }}>
              Sign out
            </button>
          </div>
        ) : null}
      </div>
    );
    return (
      <div id="nav">
        <div id="nav_inner">
          <a href="/" className="logo">MinigameHub</a>
          <div className="search-bar flex">
            <input
              className="search-box"
              type="text"
              spellCheck={false}
              placeholder="Enter some keywords to search for games..."
              onChange={this.handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.toSearchResult();
                }
              }}
            />
            <div className="search-btn flex-center">
              <img
                src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/search-512.png"
                className="search-icon" alt="search"
                onClick={this.toSearchResult}
              />
            </div>
          </div>
          {menu}
        </div>
      </div>
    );
  }
}