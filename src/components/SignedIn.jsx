import "../assets/css/SignedIn.css";
import React from 'react';
import { Home } from "./Home";
import { Editing } from "./Editing";
import { editTask, getTasks } from "../ultis/ultis";

export class SignedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UIstate: "home",
      tasks: [],
      editedI: null,
    };
  }
  cancelEdit = () => {
    this.setState({ UIstate: "home" });
  }
  toEditing = (index) => {
    this.setState({ UIstate: "editing", editedI: index });
  }
  componentDidMount() {
    getTasks(this.props.userId).then((tasks) => {
      this.setState({ tasks: tasks });
    });
  }
  render() {
    let { UIstate, tasks, editedI } = this.state;
    return UIstate === "home"
      ? <Home tasks={tasks} toEditing={this.toEditing} />
      : <Editing task={tasks[editedI]} cancelEdit={this.cancelEdit} />;
  }
}