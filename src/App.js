import "./App.css";
import { signIn } from "./ultis/ultis";
import { Component } from "react";
import { LeftCol } from "./components/LeftCol";
import { RightCol } from "./components/RightCol";

signIn({ username: "userA", password: "A123" });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { target: "A" };
  }
  changeTarget = (txt) => {
    this.setState({ target: txt });
  };
  render() {
    return (
      <div className="flex" id="chat-app">
        <LeftCol changeTarget={this.changeTarget} />
        <RightCol target={this.state.target} />
      </div>
    );
  }
}

export default App;
