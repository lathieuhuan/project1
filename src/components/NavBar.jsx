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
    const { username, userId, setAppState } = this.props;
    const menu = userId === null ? (
      <div className="menu">
        <button className="menu-opt" onClick={() => setAppState("SignIn")}>
          Sign In
        </button>
        <button className="menu-opt" onClick={() => setAppState("SignUp")}>
          Sign Up
        </button>
      </div>
    ) : (
      <div ref={this.typeRef} className="menu">
        <button className="menu-opt flex" onClick={this.toggleDropdown}>
          <img
            className="avatar"
            // src="https://image.flaticon.com/icons/png/512/61/61205.png" denied
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlNyI5Bbsl1vq1BQjH9XA-Z4j0Kkk0cEpAnA"
            alt="avatar"
          />
          <p className="username">{username}</p>
        </button>
        {this.state.expanded ? (
          <div className="dropdown flex-col radius-5 padding-10">
            <button className="acc-opt" onClick={() => {
              window.location.assign("/Profile/" + userId)
            }}>
              My Profile
            </button>
            <button className="acc-opt" onClick={() => {
              this.toggleDropdown();
              setAppState("None");
              localStorage.removeItem("username");
              localStorage.removeItem("userId");
            }}>
              Sign out
            </button>
          </div>
        ) : null}
      </div>
    );
    return (
      <div id="nav">
        <div id="nav-inner">
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
            <div className="search-btn flex-center pointer">
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