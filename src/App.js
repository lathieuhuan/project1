import "./App.css";
import { Component } from "react";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";
import { CardMemoryGame } from "./components/CardMemoryGame";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: "None", userData: undefined };
  }
  setModal = (modal, data) => {
    this.setState({ modal: modal, userData: data });
  };
  componentDidMount() {
    window.onclick = (e) => {
      if (e.target.matches("#modal")) {
        this.setModal("None");
      }
    };
  }
  render() {
    const bodyContent = {
        "/": <Home />,
        "/Card_Memory_Game": <CardMemoryGame />,
      },
      modalContent = {
        None: null,
        SignIn: <SignIn setModal={this.setModal} />,
        SignUp: <SignUp setModal={this.setModal} />,
      },
      { modal, userData } = this.state;
    return (
      <div>
        <NavBar nickname={userData?.nickname} setModal={this.setModal} />
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
