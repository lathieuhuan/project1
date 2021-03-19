import "../assets/css/Workbench.css";
import React from "react";
import { Embryo } from "./Embryo";

export class Workbench extends React.Component {
  constructor(props) {
    super(props);
    this.state = { skill: {...props.skill} };
  }
  handleChange = (e) => {
    let { skill } = this.state;
    skill[e.target.name] = e.target.value;
    this.setState({ skill });
  }
  changeCategories = (e) => {
    let { skill } = this.state;
    skill.categories = e.target.value.split(", ");
    this.setState({ skill });
  }
  changeEffect = (e) => {
    let { skill } = this.state;
    skill.effects[e.target.name] = e.target.value;
    this.setState({ skill });
  }
  deleteEffect = (key) => {
    let { skill } = this.state;
    delete skill.effects[key];
    this.setState({ skill });
  }
  addEffect = () => {
    this.setState();
  }
  render() {
    return (
      <div id="workbench">
        <Embryo
          skill={this.state.skill}
          handleChange={this.handleChange}
          changeCategories={this.changeCategories}
          changeEffect={this.changeEffect}
          deleteEffect={this.deleteEffect}
        />
      </div>
    );
  }
}