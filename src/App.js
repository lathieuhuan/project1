import "./App.css";
import { Component } from "react";
import { SigningIn } from "./components/SigningIn";
import { SignedIn } from "./components/SignedIn";

class App extends Component {
  constructor(props) {
    super(props);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.state = { userInfo: userInfo };
  }
  signIn = (userInfo) => {
    this.setState({ userInfo: userInfo });
  };
  signOut = () => {
    localStorage.removeItem("userInfo");
    this.setState({ userInfo: null });
  };
  render() {
    return this.state.userInfo === null ? (
      <SigningIn signIn={this.signIn} />
    ) : (
      <SignedIn userInfo={this.state.userInfo} signOut={this.signOut} />
    );
  }
}

export default App;
