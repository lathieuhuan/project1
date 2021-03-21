import "../assets/css/Apprentice.css";
import React from "react";
import { HeroNames } from "./HeroNames";
import { heroes } from "./data";

export class Apprentice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: "skills & masteries by hero",
      searchTerms: "",
      expanded: false,
      heroes: [...heroes],
      heroI: -1,
    };
  }
  handleChange = (e) => {
    if (e.target.name === "owner" || e.target.name === "searchTerms") {
      let len = e.target.value.length,
        result = heroes.filter((name) => {
          return name.toLowerCase().substr(0, len) === e.target.value.toLowerCase();
        });
      this.setState({ searchTerms: e.target.value, heroes: result });
    } else {
      this.setState({ searchType: e.target.value });
    }
  };
  clearTerms = () => {
    this.setState({ searchTerms: "" });
  }
  toggleHeroesL = () => {
    if (this.state.searchType === "skills & masteries by hero") {
      this.setState({ expanded: !this.state.expanded, heroI: -1 });
    }
  }
  handleKeyDown = (e) => {
    const { expanded, heroes, heroI, searchType, searchTerms } = this.state;
    let dropdown = document.getElementsByClassName("dropdown");
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (heroI > -1 && e.key === "ArrowUp") {
        if (expanded && Math.ceil(dropdown[0].scrollTop) / 30 === heroI) {
          dropdown[0].scroll(0, 30 * (heroI - 1));
        }
        this.setState({ expanded: true, heroI: heroI - 1 });
      } else if (heroI < heroes.length - 1 && e.key === "ArrowDown") {
        if (expanded && Math.ceil(dropdown[0].scrollTop) / 30 === (heroI - 4)) {
          dropdown[0].scroll(0, 30 * (heroI - 3));
        }
        this.setState({ expanded: true, heroI: heroI + 1 });
      }
    } else if (e.key === "Enter") {
      if (heroI >= 0) {
        this.setState({
          searchTerms: heroes[heroI],
          expanded: false,
          heroes: [heroes[heroI]],
          heroI: -1,
        });
      } else if (searchTerms.match(/([a-zA-Z0-9])+([ -~])*/)) {
        this.props.search(searchType, searchTerms);
        this.clearTerms();
      }
    } else if (["ArrowLeft", "ArrowRight"].indexOf(e.key) === -1) {
      if (expanded) {
        dropdown[0].scrollTop = 0;
      }
      this.setState({ heroI: -1 });
    }
  }
  render() {
    const { searchType, searchTerms } = this.state;
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
          Add Masteries
        </button>
        <div id="query">
          <p>SEARCH</p>
          <select
            name="searchType"
            defaultValue="skills by hero"
            onChange={this.handleChange}
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
                if (!this.state.expanded) {
                  this.toggleHeroesL();
                }
              }}
              onKeyDown={this.handleKeyDown}
              onFocus={this.toggleHeroesL}
            />
            {this.state.expanded
              ? <HeroNames
                  heroes={this.state.heroes}
                  heroI={this.state.heroI}
                  handleChange={this.handleChange}
                  toggleHeroesL={this.toggleHeroesL}
                />
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