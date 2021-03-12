import "./App.css";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { test: 0 };
  }
  handleClick = () => {
    this.setState();
  };
  render() {
    return (
      <div id="test">
        <p>Testing...</p>
        <button onClick={this.handleClick}>Click</button>
      </div>
    );
  }
}

export default App;
