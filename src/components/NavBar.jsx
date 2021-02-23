import "../assets/css/NavBar.css";
import React from 'react';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.typeRef = React.createRef();
  }
  toggleDropdown = () => {
    this.setState({ expanded: !this.state.expanded });
  }
  handleClickOutside = (e) => {
    if (this.state.expanded && !this.typeRef.current.contains(e.target)) {
      this.toggleDropdown();
    }
  }
  toSearchResult = () => {
    const searchTerm = document.getElementById("games-s-box").value;
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
    const accNav = userId === null ? (
      <div className="acc-nav">
        <button onClick={() => setAppState("SignIn")}>Sign In</button>
        <button onClick={() => setAppState("SignUp")}>Sign Up</button>
      </div>
    ) : (
      <div ref={this.typeRef} className="acc-nav">
        <button onClick={this.toggleDropdown}>
          <img
            id="acc-icon"
            // src="https://image.flaticon.com/icons/png/512/61/61205.png" denied
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlNyI5Bbsl1vq1BQjH9XA-Z4j0Kkk0cEpAnA"
            alt="avatar"
          />
          {username}
        </button>
        {this.state.expanded ? (
          <div className="acc-dropdown thinnest-border small-b-radius">
            <a href={"/Profile/" + userId}>My Profile</a>
            <button onClick={() => {
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