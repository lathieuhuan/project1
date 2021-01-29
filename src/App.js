import "./App.css";
import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";
import { CardMemoryGame } from "./components/CardMemoryGame";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { Redirecting } from "./components/Redirecting";
import { ProfileList } from "./components/ProfileList";
import { Profile } from "./components/Profile";
import { NotFound } from "./components/NotFound";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: "None",
      nickname: localStorage.getItem("nickname"),
      username: localStorage.getItem("username"),
    };
  }
  setAppState = (modal, nickname = null, username = null) => {
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
      modalContent = {
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
        <div id="app-body">
          <Switch>
            <Route exact path="/">
              {/* <Home /> */}
              <div>Home</div>
            </Route>
            <Route exact path="/Card_Memory_Game">
              <CardMemoryGame />
            </Route>
            <Route path="/Profile">
              <Profile username={username} setAppState={this.setAppState} />
            </Route>
            <Route path="/Profiles">
              <ProfileList />
            </Route>
            <Route path="/Page_Not_Found" component={NotFound} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        <div id="footer"></div>
        {modal === "None" ? null : <div id="modal">{modalContent[modal]}</div>}
      </div>
    );
  }
}

export default App;
