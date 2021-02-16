import "./App.css";
// import { signIn } from "./ultis/ultis";
import { Component } from "react";
import { LeftCol } from "./components/LeftCol";
import { RightCol } from "./components/RightCol";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: "nNgjPz58plLZNnI9pVim", currentConver: null };
  }
  changeConver = (conver) => {
    this.setState({ currentConver: conver });
  };
  render() {
    return (
      <div className="flex" id="chat-app">
        <LeftCol userId={this.state.userId} changeConver={this.changeConver} />
        <RightCol
          userId={this.state.userId}
          conver={this.state.currentConver}
        />
      </div>
    );
  }
}

export default App;
