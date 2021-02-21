import "./App.css";
import { Component } from "react";
import { NavBar } from "./components/NavBar";
import { Intro } from "./components/Intro";
import { SigningUp } from "./components/SigningUp";
import { SignedIn } from "./components/SignedIn";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: localStorage.getItem("userId") };
  }
  signIO = (userId) => {
    if (userId === undefined) {
      localStorage.removeItem("userId");
      this.setState({ userId: null });
    } else {
      localStorage.setItem("userId", userId);
      this.setState({ userId });
    }
  };
  render() {
    const { userId } = this.state;
    return (
      <div id="app-con">
        <NavBar signedIn={userId !== null} signIO={this.signIO} />
        <div id="content">
          <Switch>
            <Route exact path="/">
              <Intro />
            </Route>
            <Route path="/sign-up">
              <SigningUp userId={userId} signIO={this.signIO} />
            </Route>
            <Route path="/tasks">
              <SignedIn userId={userId} />
            </Route>
            <Route path="*">
              <h1>This page does not exist</h1>
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
