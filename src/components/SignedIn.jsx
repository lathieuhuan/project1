import "../assets/css/SignedIn.css";
import React from 'react';
import { Home } from "./Home";
import { Editing } from "./Editing";
import { getTasks, addTask, editTask } from "../ultis/ultis";

export class SignedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UIstate: "home",
      tasks: [],
      editedI: null,
    };
  }
  toEditing = (index) => {
    this.setState({ UIstate: "editing", editedI: index });
  }
  saveEdit = (i, title, content) => {
    if (i === undefined) {
      addTask({ owner: this.props.userId, title: title, content: content})
      .then(this.update).then(this.exitEdit);
    } else {
      editTask({ taskId: i, title: title, content: content })
      .then(this.update).then(this.exitEdit);
    }
  }
  update = () => {
    getTasks(this.props.userId).then((tasks) => {
      this.setState({ tasks: tasks });
    });
  }
  exitEdit = () => {
    this.setState({ UIstate: "home" });
  }
  componentDidMount() {
    getTasks(this.props.userId).then((tasks) => {
      this.setState({ tasks: tasks });
    });
  }
  render() {
    let { UIstate, tasks, editedI } = this.state;
    return UIstate === "home"
      ? <Home tasks={tasks} toEditing={this.toEditing} update={this.update} />
      : <Editing task={tasks[editedI]}
          saveEdit={this.saveEdit}
          exitEdit={this.exitEdit} />;
  }
}