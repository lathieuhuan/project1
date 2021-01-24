import "./App.css";
import { Component } from "react";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";
import { CardMemoryGame } from "./components/CardMemoryGame";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: null, at: "Home", modal: "None" };
  }
  toggleForm = (modal) => {
    this.setState({ modal: modal });
  };
  componentDidMount() {
    window.onclick = (e) => {
      if (e.target.matches("#home-modal")) {
        this.toggleForm("None");
      }
    };
  }
  render() {
    const content = {
      "/": <Home />,
      "/CardMemoryGame": <CardMemoryGame />,
    };
    let h1, subHeading, thirdLine;
    if (this.state.modal === "SignIn") {
      h1 = <h1>SIGN IN</h1>;
      subHeading = (
        <p className="sub-heading">
          Not a member yet? <span id="switch-form">Sign up</span> now!
        </p>
      );
      thirdLine = <p>Forget your password? Click here.</p>;
    } else {
      h1 = <h1>SIGN UP</h1>;
      subHeading = (
        <p className="sub-heading">
          Already a member? <span id="switch-form">Sign in</span>!
        </p>
      );
      thirdLine = <input type="text" placeholder="Enter your email" />;
    }
    const form = (
      <div id="signIU-form">
        <div onClick={() => this.toggleForm("None")} className="close center">
          <i className="fa fa-close"></i>
        </div>
        {h1}
        {subHeading}
        <input type="text" placeholder="Enter your username" />
        <input type="password" placeholder="Enter your password" />
        {thirdLine}
        <button>Confirm</button>
      </div>
    );
    return (
      <div>
        <NavBar at={this.state.at} toggleForm={this.toggleForm} />
        <div id="app-body">{content[window.location.pathname]}</div>
        <div id="footer"></div>
        <div
          id="home-modal"
          style={{ display: this.state.modal === "None" ? "none" : "block" }}
        >
          {this.state.modal === "None" ? null : form}
        </div>
      </div>
    );
  }
}

export default App;
