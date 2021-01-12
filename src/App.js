import "./App.css";
import { Component } from "react";
import { divideShuffle, SideCol, Cell } from "./components/Functions";

class App extends Component {
  constructor(props) {
    super(props);
    const shuffledI = divideShuffle(54);
    let indexes = [];
    for (let i = 0; i < 54; i++) {
      indexes.push(0);
    }
    this.state = {
      leftCol: shuffledI[0],
      rightCol: shuffledI[1],
      platform: indexes,
    };
  }
  move = (start, pos, end) => {
    if (start !== end) {
      this.setState((prevS) => {
        let data = JSON.parse(JSON.stringify(prevS));
        if ((end !== "leftCol") & (end !== "rightCol")) {
          data.platform[end] = data[start].splice(pos, 1)[0];
        } else {
          data[end].push(data[start].splice(pos, 1)[0]);
          console.log(data[end]);
        }
        return data;
      });
    }
  };
  render() {
    return (
      <div id="app-con">
        <SideCol imgIs={this.state.leftCol} id="leftCol" move={this.move} />
        <div id="platform">
          {this.state.platform.map((val, i) => {
            return <Cell key={i} imgI={val} index={i} move={this.move} />;
          })}
        </div>
        <SideCol imgIs={this.state.rightCol} id="rightCol" move={this.move} />
      </div>
    );
  }
}

export default App;

{
  /* <img src="https://cdn3.volusion.com/ywjzv.xdxbb/v/vspfiles/photos/89003-2.jpg" alt="" /> */
}
