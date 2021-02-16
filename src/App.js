import "./App.css";
// import { signIn } from "./ultis/ultis";
import { Component } from "react";
import { LeftCol } from "./components/LeftCol";
import { RightCol } from "./components/RightCol";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: "nNgjPz58plLZNnI9pVim" };
  }
  render() {
    return (
      <div className="flex" id="chat-app">
        <LeftCol userId={this.state.userId} />
        <RightCol />
      </div>
    );
  }
}

export default App;
