import "./App.css";
import { Component } from "react";
import { NavBar } from "./components/NavBar";
import { Intro } from "./components/Intro";
import { SigningUp } from "./components/SigningUp";
import { Redirecting } from "./components/Redirecting";
import { SignedIn } from "./components/SignedIn";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: null, UIstate: "intro" };
  }
  signIO = (id, UIstate) => {
    this.setState({ userId: id, UIstate: UIstate });
  };
  changeUI = (UIstate) => {
    this.setState({ UIstate: UIstate });
  };
  changeId = (id) => {
    this.setState({ userId: id });
  };
  render() {
    const { userId, UIstate } = this.state,
      content = {
        intro: <Intro changeUI={this.changeUI} />,
        "signing-up": <SigningUp signIO={this.signIO} />,
        "signed-in": <SignedIn userId={userId} changeUI={this.changeUI} />,
      };
    return (
      <div id="app-con">
        <NavBar UIstate={UIstate} signIO={this.signIO} />
        <div id="content">
          {content[UIstate] === undefined ? (
            <Redirecting UIstate={UIstate} changeUI={this.changeUI} />
          ) : (
            content[UIstate]
          )}
        </div>
      </div>
    );
  }
}

export default App;
