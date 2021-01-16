import { Component } from "react";
import { SearchBar } from "./components/SearchBar";
import { CardList } from "./components/CardList";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { leftCol: [], rightCol: [] };
  }
  search = async (keyword) => {
    if (keyword !== "") {
      let leftCol = [],
        rightCol = [];
      leftCol = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=` + keyword,
        { method: "GET" }
      ).then((res) => {
        return res.json();
      });
      let items = leftCol.items;
      leftCol = items <= 20 ? items : items.splice(0, 20);
      leftCol = leftCol.map((val) => {
        return {
          info: val.volumeInfo,
          descShown: false,
        };
      });
      const br = Math.ceil(leftCol.length / 2);
      rightCol = leftCol.splice(br);
      this.setState({ leftCol: leftCol, rightCol: rightCol });
    }
  };
  toggleDesc = (place, i) => {
    this.setState((prevS) => {
      let data = JSON.parse(JSON.stringify(prevS[place]));
      data[i].descShown = !data[i].descShown;
      return { [place]: data };
    });
  };
  render() {
    return (
      <div id="app-con">
        <h1>WHAT BOOKS ARE YOU LOOKING FOR?</h1>
        <SearchBar search={this.search} />
        <div id="card-list">
          <CardList
            col="leftCol"
            data={this.state.leftCol}
            toggleDesc={this.toggleDesc}
          />
          <CardList
            col="rightCol"
            data={this.state.rightCol}
            toggleDesc={this.toggleDesc}
          />
        </div>
      </div>
    );
  }
}

export default App;
