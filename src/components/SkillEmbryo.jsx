import "../assets/css/Embryo.css";
import React from "react";
import { Effects } from "./Effects";
import { HeroNames } from "./HeroNames";
import { heroes, cats } from "./data";
import { CatNames } from "./CatNames";

export class SkillEmbryo extends React.Component {
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
    let dropdown = document.getElementsByClassName("dropdown");
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
    } else if (e.key === "Tab" && this.state.dropHeroes) {
      this.setState({ dropHeroes: false });
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
  }
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }
  render() {
    const { skill, handleChange, allowDup, addCat } = this.props,
      active = skill.type?.substr(0, 3) === "Chủ";
    return (
      <div id="embryo">
        <input
          type="text"
          name="name"
          className={"regular-inp " + (active ? "active" : "passive")}
          id="eb_name"
          value={skill.name || ""}
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
            <p className="eb_left">Skill slot: </p>
            <input
              type="text"
              name="slot"
              className="regular-inp shrink"
              value={skill.slot || ""}
              onChange={handleChange}
            />
          </div>
          <div className="eb_line" id="cats">
            <p className="eb_left">Categories: </p>
            <div className="grow" id="cats_inner">
              {skill.categories?.map((cat, i) => {
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
                  if (!this.state.dropCats) {
                    this.toggleCatsL();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape" && this.state.dropCats) {
                    this.toggleCatsL();
                  }
                }}
              />
            </div>
            {this.state.dropCats
              ? <CatNames cats={this.state.cats} addCat={addCat} />
              : null}
          </div>
          <div ref={this.typeRef} className="eb_line" id="hero-name">
            <p className="eb_left">Hero: </p>
            <input
              type="text"
              name="owner"
              className="regular-inp grow"
              value={skill.owner || ""}
              onChange={(e) => {
                handleChange(e);
                this.filterHeroes(e);
                if (!this.state.dropHeroes) {
                  this.toggleHeroesL();
                }
              }}
              onKeyDown={this.handleKeyDown}
              onFocus={this.toggleHeroesL}
            />
            {this.state.dropHeroes
              ? <HeroNames
                  heroes={this.state.heroes}
                  heroI={this.state.heroI}
                  handleChange={handleChange}
                  toggleHeroesL={this.toggleHeroesL}
                />
              : null}
          </div>
          <div className="eb_line">
            <p className="eb_left">Type: </p>
            <select
              name="type"
              className="grow"
              defaultValue={skill.type || "Bị động"}
              onChange={handleChange}
            >
              <option value="Bị động">Bị động</option>
              <option value="Chủ động - Không mục tiêu">
                Chủ động - Không mục tiêu
              </option>
              <option value="Chủ động - Mục tiêu ô">
                Chủ động - Mục tiêu ô
              </option>
              <option value="Chủ động - Mục tiêu quân cờ">
                Chủ động - Mục tiêu quân cờ
              </option>
              <option value="Chủ động - Mục tiêu vùng">
                Chủ động - Mục tiêu vùng
              </option>
            </select>
          </div>
          <div className="eb_line">
            <p className="eb_left">Description: </p>
            <textarea
              type="text"
              name="desc"
              className="grow"
              id="eb_desc"
              value={skill.desc || ""}
              spellCheck={false}
              onChange={handleChange}
            />
          </div>
          <Effects
            effects={skill.effects || ""}
            handleChange={handleChange}
            submitEffectName={this.props.submitEffectName}
            deleteEffect={this.props.deleteEffect}
            addEffect={this.props.addEffect}
          />
          {active ? (
            <div className="flex-col">
              <div className="eb_line">
                <p className="eb_left">AP:</p>
                <input
                  type="text"
                  name="AP"
                  className="regular-inp shrink"
                  value={skill.AP || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="eb_line">
                <p className="eb_left">Mana cost:</p>
                <input
                  type="text"
                  name="manaCost"
                  className="regular-inp shrink"
                  value={skill.manaCost || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="eb_line">
                <p className="eb_left">Cooldown:</p>
                <input
                  type="text"
                  name="cooldown"
                  className="regular-inp shrink"
                  value={skill.cooldown || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}