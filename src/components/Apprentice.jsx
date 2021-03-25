import "../assets/css/Apprentice.css";
import React from "react";
import { HeroNames } from "./HeroNames";
import { heroes as oriHeroes, cats as oriCats } from "./data";
import { CatNames } from "./CatNames";

export class Apprentice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: "skills & masteries by hero",
      searchTerms: "",
      dropHeroes: false,
      dropCats: false,
      heroes: [...oriHeroes],
      cats: [...oriCats],
      heroI: -1,
    };
  }
  handleChange = (e) => {
    if (e.target.name === "owner" || e.target.name === "searchTerms") {
      let { searchType, heroes, cats } = this.state;
      if (searchType === "skills & masteries by hero") {
        let len = e.target.value.length;
        heroes = oriHeroes.filter((name) => {
          return name.toLowerCase().substr(0, len) === e.target.value.toLowerCase();
        });
      } else {
        let words = e.target.value.split(" ");
        words = words[words.length - 1];
        cats = oriCats.filter((name) => {
          return name.toLowerCase().substr(0, words.length) === words.toLowerCase();
        });
      }
      this.setState({ searchTerms: e.target.value, heroes, cats });
    } else {
      this.setState({ searchType: e.target.value });
    }
  };
  addCat = (e) => {
    let { searchTerms } = this.state;
    searchTerms = searchTerms.split(" ");
    searchTerms[searchTerms.length - 1] = e.target.value;
    this.setState({ searchTerms: searchTerms.join(" ") + " " });
  }
  clearTerms = () => {
    this.setState({ searchTerms: "" });
  }
  openHeroesL = () => {
    this.setState({ dropHeroes: true, heroI: -1 });
  }
  closeHeroesL = () => {
    this.setState({ dropHeroes: false, heroI: -1 });
  }
  openCatsL = () => {
    this.setState({ dropCats: true });
  }
  closeCatsL = () => {
    this.setState({ dropCats: false });
  }
  handleKeyDown = (e) => {
    const { dropHeroes, heroes, heroI } = this.state;
    let dropdown = document.getElementsByClassName("heroes_dd");
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (heroI > -1 && e.key === "ArrowUp") {
        if (dropHeroes && Math.ceil(dropdown[0].scrollTop) / 30 === heroI) {
          dropdown[0].scroll(0, 30 * (heroI - 1));
        }
        this.setState({ dropHeroes: true, heroI: heroI - 1 });
      } else if (heroI < heroes.length - 1 && e.key === "ArrowDown") {
        if (dropHeroes && Math.ceil(dropdown[0].scrollTop) / 30 === (heroI - 4)) {
          dropdown[0].scroll(0, 30 * (heroI - 3));
        }
        this.setState({ dropHeroes: true, heroI: heroI + 1 });
      }
    } else if (e.key === "Enter") {
      if (heroI >= 0) {
        this.setState({
          searchTerms: heroes[heroI],
          dropHeroes: false,
          heroes: [heroes[heroI]],
          heroI: -1,
        });
      }
    } else if (["ArrowLeft", "ArrowRight"].indexOf(e.key) === -1) {
      if (dropHeroes) {
        dropdown[0].scrollTop = 0;
      }
      this.setState({ heroI: -1 });
    }
  }
  closeAllDD = () => {
    this.setState({ dropHeroes: false, dropCats: false });
  }
  handleWindowKey = (e) => {
    const { searchType, searchTerms } = this.state;
    if (e.key === "Escape") {
      this.closeAllDD();
    } else if (e.key === "Enter" && searchTerms !== "") {
      this.props.search(searchType, searchTerms);
      this.clearTerms();
    }
  }
  handleClickOutside = (e) => {
    if (!e.target.matches("#sb_inner")) {
      this.closeAllDD();
    }
  }
  componentDidMount() {
    window.addEventListener("keydown", this.handleWindowKey);
    window.addEventListener("click", this.handleClickOutside);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleWindowKey);
    window.removeEventListener("click", this.handleClickOutside);
  }
  render() {
    const { searchType, searchTerms, dropHeroes, dropCats } = this.state;
    return (
      <div id="apprentice">
        <button
          className="prepare-workbench"
          id="work-on-skill"
          onClick={() => this.props.setUI("creating", "skill")}
        >
          Add Skill
        </button>
        <button
          className="prepare-workbench"
          id="work-on-mastery"
          onClick={() => this.props.setUI("creating", "mastery")}
        >
          Add Mastery
        </button>
        <div id="query">
          <p>SEARCH</p>
          <select
            name="searchType"
            defaultValue="skills by hero"
            onChange={this.handleChange}
            onClick={() => {
              this.clearTerms();
            }}
          >
            <option value="skills &amp; masteries by hero">
              skills &amp; masteries by hero
            </option>
            <option value="skills by category">skills by category</option>
            <option value="masteries by category">masteries by category</option>
          </select>
          <div id="search-box">
            <input
              type="text"
              id="sb_inner"
              placeholder={"Enter " + (searchType === "skills & masteries by hero"
                ? "the hero name" : "the categories")}
              name="searchTerms"
              value={searchTerms}
              onChange={(e) => {
                this.handleChange(e);
                if (searchType === "skills & masteries by hero") {
                  this.openHeroesL();
                } else {
                  this.openCatsL();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  this.closeAllDD();
                }
                if (searchType === "skills & masteries by hero") {
                  this.handleKeyDown(e);
                } else {
                  if (e.key === "Enter") {
                    this.props.search(searchType, searchTerms);
                    this.clearTerms();
                  }
                }
              }}
              onClick={() => {
                if (searchType === "skills & masteries by hero") {
                  this.openHeroesL();
                } else {
                  this.openCatsL();
                }
              }}
            />
            {dropHeroes
              ? <HeroNames
                  heroes={this.state.heroes}
                  heroI={this.state.heroI}
                  handleChange={this.handleChange}
                  toggleHeroesL={this.closeHeroesL}
                />
              : null}
            {dropCats
              ? <CatNames cats={this.state.cats} addCat={this.addCat} />
              : null}
          </div>
          <div
            className="flex-center"
            id="search-btn"
            onClick={() => {
              if (searchTerms.match(/([a-zA-Z0-9])+([ -~])*/)) {
                this.props.search(searchType, searchTerms);
                this.clearTerms();
              }
            }}
          >
            <img
              id="search-icon"
              src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/search-512.png"
              alt="search"
            />
          </div>
        </div>
      </div>
    );
  }
}