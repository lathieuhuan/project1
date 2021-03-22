import "../assets/css/Embryo.css";
import React from "react";
import { Effects } from "./Effects";
import { HeroNames } from "./HeroNames";
import { heroes, cats } from "./data";
import { CatNames } from "./CatNames";

export class MasteryEmbryo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropHeroes: false,
      dropCats: false,
      heroes: [...heroes],
      cats: [...cats],
      heroI: -1,
    };
    this.typeRef = React.createRef();
  }
  toggleHeroesL = () => {
    this.setState({ dropHeroes: !this.state.dropHeroes, heroI: -1 });
  }
  toggleCatsL = () => {
    this.setState({ dropCats: !this.state.dropCats });
  }
  filterHeroes = (e) => {
    let len = e.target.value.length,
      result = heroes.filter((name) => {
        return name.toLowerCase().substr(0, len) === e.target.value.toLowerCase();
      });
    this.setState({ heroes: result });
  }
  filterCats = (e) => {
    let len = e.target.value.length,
      result = cats.filter((name) => {
        return name.toLowerCase().substr(0, len) === e.target.value.toLowerCase();
      });
    this.setState({ cats: result });
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
    } else if (e.key === "Enter" && heroI >= 0) {
      this.props.changeHeroName(heroes[heroI]);
      this.setState({ dropHeroes: false, heroes: [heroes[heroI]], heroI: -1 });
    } else if ((e.key === "Tab" || e.key === "Escape") && dropHeroes) {
      this.toggleHeroesL();
    } else if (["ArrowLeft", "ArrowRight"].indexOf(e.key) === -1) {
      if (dropHeroes) {
        dropdown[0].scrollTop = 0;
      }
      this.setState({ heroI: -1 });
    }
  }
  handleClickOutside = (e) => {
    if (!this.typeRef.current.contains(e.target) && this.state.dropHeroes) {
      this.toggleHeroesL();
    }
    if (!e.target.matches("#extra-cats") && this.state.dropCats) {
      this.toggleCatsL();
    }
  }
  componentDidMount() {
    window.addEventListener("click", this.handleClickOutside);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handleClickOutside);
  }
  render() {
    const { mastery, handleChange, allowDup, addCat } = this.props,
      { dropHeroes, dropCats } = this.state;
    return (
      <div id="embryo">
        <input
          type="text"
          name="name"
          className="regular-inp mastery"
          id="eb_name"
          value={mastery.name || ""}
          onChange={handleChange}
        />
        <button
          className={"fa fa-clone" + (allowDup ? " allow-dup" : "")}
          onClick={this.props.toggleDup}></button>
        {this.props.nameExisted ? <p className="warning">
          <span className="fa fa-exclamation-circle">
          </span> Name existed! <span className="fa fa-exclamation-circle">
          </span></p> : null}
        <div>
          <div className="eb_line">
            <p className="eb_left">Mastery slot: </p>
            <input
              type="text"
              name="slot"
              className="regular-inp shrink"
              value={mastery.slot || ""}
              onChange={handleChange}
            />
          </div>
          <div className="eb_line" id="cats">
            <p className="eb_left">Categories: </p>
            <div className="grow" id="cats_inner">
              {mastery.categories?.map((cat, i) => {
                return (
                  <div key={i} className="cat">
                    <p className="cat_inner">{cat}</p>
                    <span className="fa fa-close"
                      onClick={() => this.props.deleteCat(i)}></span>
                  </div>
                );
              })}
              <input
                type="text"
                id="extra-cats"
                value={this.props.extraCats}
                onChange={(e) => {
                  this.props.changeExtra(e);
                  this.filterCats(e);
                  if (!dropCats) {
                    this.toggleCatsL();
                  }
                }}
                onKeyDown={(e) => {
                  if ((e.key === "Escape" || e.key === "Tab") && dropCats) {
                    this.toggleCatsL();
                  }
                }}
              />
            </div>
            {dropCats ? <CatNames cats={this.state.cats} addCat={addCat} /> : null}
          </div>
          <div className="eb_line" id="hero-name">
            <p className="eb_left">Hero: </p>
            <input
              ref={this.typeRef}
              type="text"
              name="owner"
              className="regular-inp grow"
              value={mastery.owner || ""}
              onChange={(e) => {
                handleChange(e);
                this.filterHeroes(e);
                if (!dropHeroes) {
                  this.toggleHeroesL();
                }
              }}
              onKeyDown={this.handleKeyDown}
              onClick={this.toggleHeroesL}
            />
            {dropHeroes
              ? <HeroNames
                  heroes={this.state.heroes}
                  heroI={this.state.heroI}
                  handleChange={handleChange}
                  toggleHeroesL={this.toggleHeroesL}
                />
              : null}
          </div>
          <div className="eb_line">
            <p className="eb_left">Description: </p>
            <textarea
              type="text"
              name="desc"
              className="grow"
              id="eb_desc"
              value={mastery.desc || ""}
              spellCheck={false}
              onChange={handleChange}
            />
          </div>
          <Effects
            effects={mastery.effects || ""}
            handleChange={handleChange}
            submitEffectName={this.props.submitEffectName}
            deleteEffect={this.props.deleteEffect}
            addEffect={this.props.addEffect}
          />
        </div>
      </div>
    );
  }
}