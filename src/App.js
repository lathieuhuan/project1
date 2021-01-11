import { Component } from "react";
import { Start } from "./components/Start";
import { End } from "./components/End";
import "./App.css";

const img = [
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/114.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/038.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/152.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/155.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/158.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/182.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/186.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/240.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/254.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/258.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/331.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/285.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/341.png",
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { pokemon: img };
  }
  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  allowDrop(ev) {
    ev.preventDefault();
  }
  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
  render() {
    return (
      <div className="App">
        <Start pokemon={this.state.pokemon} drag={this.drag} />
        <End allowDrop={this.allowDrop} drop={this.drop} />
      </div>
    );
  }
}

export default App;
