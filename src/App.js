import { Component } from "react";
import { SearchBox } from "./components/SearchBox";
import { Emoji } from "./components/Emoji";
import { emojis } from "./emojiList";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }
  changeInput = () => {
    let input = document.getElementById("search-box").value;
    this.setState({ input: input });
  };
  render() {
    let results = [];
    for (let mem of emojis) {
      if (mem.keywords.includes(this.state.input)) {
        results.push({ symbol: mem.symbol, title: mem.title });
      }
    }
    return (
      <div>
        <div id="search-bar">
          {<SearchBox changeInput={this.changeInput} />}
        </div>
        <ul id="emoji-list">
          {results.map((val, i) => {
            return <Emoji key={i} {...val} />;
          })}
        </ul>
      </div>
    );
  }
}

export default App;
