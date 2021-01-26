import "../assets/css/NavBar.css";
import React from 'react';
import { getUserInfo } from "../ultis/ultis"

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      username: "Guest",
      nickname: null,
    };
  }
  componentDidUpdate() {
    const { username } = this.props;
    if (username !== this.state.username) {
      getUserInfo(username).then((info) => {
        this.setState({ username: username, nickname: info.nickname });
      })
    }
  }
  render() {
    const { username, setModal } = this.props;
    const accNav = username === "Guest" ? (
      <ul>
        <li onClick={() => setModal("SignIn")}>Sign In</li>
        <li onClick={() => setModal("SignUp")}>Sign Up</li>
      </ul>
    ) : (
      <ul>
        <li>
          <img src="https://image.flaticon.com/icons/png/512/61/61205.png" id="acc-icon" alt=""/>
          {this.state.nickname}
          {/* <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-down-b-512.png" alt=""/> */}
        </li>
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