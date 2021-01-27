import "./App.css";
import { Component } from "react";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";
import { CardMemoryGame } from "./components/CardMemoryGame";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { Redirecting } from "./components/Redirecting";
import { Profile } from "./components/Profile";

class App extends Component {
  constructor(props) {
    super(props);
    const nickname = localStorage.getItem("nickname"),
      username = localStorage.getItem("username");
    this.state = {
      modal: "None",
      nickname: nickname === null ? "Guest" : nickname,
      username: username === null ? "Guest" : username,
    };
  }
  setAppState = (modal, nickname = "Guest", username = "Guest") => {
    this.setState({ modal: modal, nickname: nickname, username: username });
  };
  componentDidMount() {
    window.onclick = (e) => {
      if (e.target.matches("#modal")) {
        this.setAppState("None");
      }
    };
    window.onkeydown = (e) => {
      if (e.key === "Escape" && this.state.modal !== "None") {
        this.setAppState("None");
      }
    };
  }
  render() {
    const { modal, nickname, username } = this.state,
      bodyContent = {
        "/": <Home />,
        "/card_memory_game": <CardMemoryGame />,
        "/my_profile": <Profile username={username} />,
      },
      modalContent = {
        None: null,
        SignIn: <SignIn setAppState={this.setAppState} />,
        SignUp: <SignUp setAppState={this.setAppState} />,
        Redirecting: (
          <Redirecting nickname={nickname} setAppState={this.setAppState} />
        ),
      };
    return (
      <div>
        <NavBar
          nickname={nickname}
          username={username}
          setAppState={this.setAppState}
        />
        <div id="app-body">{bodyContent[window.location.pathname]}</div>
        <div id="footer"></div>
        <div
          id="modal"
          style={{ display: modal === "None" ? "none" : "block" }}
        >
          {modalContent[modal]}
        </div>
      </div>
    );
  }
}

export default App;
