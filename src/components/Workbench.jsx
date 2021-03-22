import "../assets/css/Workbench.css";
import React from "react";
import { SkillEmbryo } from "./SkillEmbryo";
import { Tong } from "./Tong";
import { MasteryEmbryo } from "./MasteryEmbryo";

export class Workbench extends React.Component {
  constructor(props) {
    super(props);
    this.state = { kit: {...props.kit}, extraCats: "" };
  }
  handleChange = (e, type) => {
    let { kit } = this.state,
      { value } = e.target;
    type === "e"
    ? (kit.effects[e.target.name] = value)
    : (kit[e.target.name] = type === "c" ? value.split(", ") : value);
    this.setState({ kit });
  }
  changeHeroName = (heroName) => {
    let { kit } = this.state;
    kit.owner = heroName;
    this.setState({ kit });
  }
  changeExtra = (e) => {
    this.setState({ extraCats: e.target.value });
  }
  addCat = (e) => {
    let { kit } = this.state;
    if (!kit.categories) {
      kit.categories = [];
    }
    kit.categories.push(e.target.value);
    this.setState({ kit, extraCats: "" });
  }
  deleteCat = (i) => {
    let { kit } = this.state;
    kit.categories.splice(i, 1);
    this.setState({ kit });
  }
  submitEffectName = (effectName, key) => {
    if (effectName !== key) {
      let { kit } = this.state;
      kit.effects[effectName] = kit.effects[key];
      delete kit.effects[key];
      this.setState({ kit });
    }
  }
  deleteEffect = (key) => {
    let { kit } = this.state;
    delete kit.effects[key];
    this.setState({ kit });
  }
  addEffect = () => {
    let { kit } = this.state;
    if (!kit.effects) {
      kit.effects = {};
    }
    kit.effects["New Effect"] = "";
    this.setState({ kit });
  }
  save = () => {
    let { kit, extraCats } = this.state;
    if (extraCats !== "") {
      if (kit.categories === undefined) {
        kit.categories = [];
      }
      kit.categories = kit.categories.concat(extraCats.split(", "));
    }
    if (this.props.kitType === "skill" && kit.type === undefined) {
      kit.type = "Bị động";
    }
    this.props.tryUpdate(kit, this.props.UIstate);
  }
  render() {
    return (
      <div id="workbench">
        <Tong
          UIstate={this.props.UIstate}
          save={this.save}
          updating={this.props.updating}
          setUI={this.props.setUI}
        />
        {this.props.kitType === "skill" ? (
          <SkillEmbryo
            skill={this.state.kit}
            handleChange={this.handleChange}
            submitEffectName={this.submitEffectName}
            deleteEffect={this.deleteEffect}
            addEffect={this.addEffect}
            nameExisted={this.props.nameExisted}
            allowDup={this.props.allowDup}
            toggleDup={this.props.toggleDup}
            changeHeroName={this.changeHeroName}
            extraCats={this.state.extraCats}
            changeExtra={this.changeExtra}
            addCat={this.addCat}
            deleteCat={this.deleteCat}
          />
        ) : (
          <MasteryEmbryo
            mastery={this.state.kit}
            handleChange={this.handleChange}
            submitEffectName={this.submitEffectName}
            deleteEffect={this.deleteEffect}
            addEffect={this.addEffect}
            nameExisted={this.props.nameExisted}
            allowDup={this.props.allowDup}
            toggleDup={this.props.toggleDup}
            changeHeroName={this.changeHeroName}
            extraCats={this.state.extraCats}
            changeExtra={this.changeExtra}
            addCat={this.addCat}
            deleteCat={this.deleteCat}
          />
        )}
      </div>
    );
  }
}