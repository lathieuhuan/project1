import "../assets/css/Workbench.css";
import React from "react";
import { SkillEmbryo } from "./SkillEmbryo";
import { Tong } from "./Tong";
import { MasteryEmbryo } from "./MasteryEmbryo";

export class Workbench extends React.Component {
  constructor(props) {
    super(props);
    this.state = { kit: {...props.kit} };
  }
  handleChange = (e, type) => {
    let { kit } = this.state,
      { value } = e.target;
    type === "e"
    ? (kit.effects[e.target.name] = value)
    : (kit[e.target.name] = type === "c" ? value.split(", ") : value);
    this.setState({ kit });
  }
  submitEffectName = (newName, key) => {
    if (newName !== key) {
      let { kit } = this.state;
      kit.effects[newName] = kit.effects[key];
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
    this.props.tryUpdate(this.state.kit, this.props.UIstate);
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
          />
        ) : (
          <MasteryEmbryo
            mastery={this.state.kit}
            handleChange={this.handleChange}
            submitEffectName={this.submitEffectName}
            deleteEffect={this.deleteEffect}
            addEffect={this.addEffect}
            nameExisted={this.props.nameExisted}
          />
        )}
      </div>
    );
  }
}