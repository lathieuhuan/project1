import "./App.css";
import { Component } from "react";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: null, at: "Home" };
  }
  render() {
    const content = {
      "/": <Home />,
    };
    return (
      <div>
        <NavBar at={this.state.at} />
        <div id="app-body">{content[window.location.pathname]}</div>
      </div>
    );
  }
}

export default App;
