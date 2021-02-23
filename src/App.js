import "./App.css";
import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";
import { Library } from "./components/Library";
import { CardMemoryGame } from "./components/CardMemoryGame";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { Redirecting } from "./components/Redirecting";
import { Profile } from "./components/Profile";
import { Users } from "./components/Users";
import { NotFound } from "./components/NotFound";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: "None",
      username: localStorage.getItem("username"),
      userId: localStorage.getItem("userId"),
    };
  }
  setAppState = (modal, username = null, userId = null) => {
    this.setState({ modal, username, userId });
  };
  componentDidMount() {
    // window.onclick = (e) => {
    //   if (e.target.matches("#modal")) {
    //     this.setAppState("None");
    //   }
    // };
    window.onkeydown = (e) => {
      if (e.key === "Escape" && this.state.modal !== "None") {
        this.setAppState("None");
      }
    };
  }
  render() {
    const { modal, username, userId } = this.state,
      modalContent = {
        SignIn: <SignIn setAppState={this.setAppState} />,
        SignUp: <SignUp setAppState={this.setAppState} />,
        Redirecting: (
          <Redirecting username={username} setAppState={this.setAppState} />
        ),
      };
    return (
      <div>
        <NavBar
          username={username}
          userId={userId}
          setAppState={this.setAppState}
        />
        <div id="app-body">
          <Switch>
            <Route exact path="/">
              <Home />
              {/* <div>Home</div> */}
            </Route>
            <Route path="/Library">
              <Library />
            </Route>
            <Route exact path="/Card_Memory_Game">
              <CardMemoryGame />
            </Route>
            <Route path="/Profile">
              <Profile userId={userId} setAppState={this.setAppState} />
            </Route>
            <Route path="/Users">
              <Users />
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
