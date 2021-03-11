import "./App.css";
import "./assets/css/Others.css";
import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";
import { Library } from "./components/Library";
import { Modal } from "./components/Modal";
import { Profile } from "./components/Profile";
import { ConstructionSite } from "./components/accessories/ConstructionSite";
import { NotFound } from "./components/accessories/NotFound";
import { FillerPage } from "./components/accessories/FillerPage";
import { CardMemoryGame } from "./components/cmg/CardMemoryGame";
import { Game2048 } from "./components/2048/Game2048";
import { Footer } from "./components/Footer";
// Dont create child components with the same first letters
// the existing ones have those letters combined as their id

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: "None",
      username: localStorage.getItem("username"),
      userId: localStorage.getItem("userId"),
      avatar: localStorage.getItem("avatar"),
    };
  }
  setAppState = (modal, username = null, userId = null, avatar = null) => {
    this.setState({ modal, username, userId, avatar });
  };
  componentDidMount() {
    // window.onclick = (e) => {
    //   if (e.target.matches("#modal")) {
    //     this.setAppState("None");
    //   }
    // };
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.state.modal !== "None") {
        this.setAppState("None");
      }
    });
  }
  render() {
    const { modal, username, userId, avatar } = this.state;
    return (
      <div>
        <NavBar
          username={username}
          userId={userId}
          avatar={avatar}
          setAppState={this.setAppState}
        />
        <div id="app-content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/Library">
              <Library />
            </Route>
            <Route exact path="/Card_Memory_Game">
              <CardMemoryGame userId={userId} setAppState={this.setAppState} />
            </Route>
            <Route exact path="/2048">
              <Game2048 userId={userId} setAppState={this.setAppState} />
            </Route>
            <Route
              exact
              path={["/Users", "/Chess", "/Bulls_and_Cows", "/Picture_Puzzle"]}
            >
              <ConstructionSite />
            </Route>
            <Route
              exact
              path={[
                "/Dota_2",
                "/Fortnite",
                "/Genshin_Impact",
                "/League_of_Legends",
                "/Overwatch",
                "/World_of_Warcraft",
              ]}
            >
              <FillerPage />
            </Route>
            <Route path="/Profile">
              <Profile userId={userId} setAppState={this.setAppState} />
            </Route>
            <Route path="/Page_Not_Found" component={NotFound} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        <Footer />
        {modal === "None" ? null : (
          <Modal
            modal={modal}
            username={username}
            setAppState={this.setAppState}
          />
        )}
      </div>
    );
  }
}

export default App;
