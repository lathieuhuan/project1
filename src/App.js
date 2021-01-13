import "./App.css";
import { Component } from "react";
import { FilterCol, PokemonList } from "./components/Functions";
import { pokemon } from "./pokemonData";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: pokemon,
      fire: [],
      water: [],
      grass: [],
    };
  }
  move = (start, pos, end) => {
    if (start !== end) {
      this.setState((prevS) => {
        let data = JSON.parse(JSON.stringify(prevS));
        data[end].push(data[start].splice(pos, 1)[0]);
        return data;
      });
    }
  };
  render() {
    return (
      <div>
        <PokemonList data={this.state.gallery} id="gallery" move={this.move} />
        <div id="filter">
          <FilterCol data={this.state.fire} id="fire" move={this.move} />
          <FilterCol data={this.state.water} id="water" move={this.move} />
          <FilterCol data={this.state.grass} id="grass" move={this.move} />
        </div>
      </div>
    );
  }
}

export default App;
