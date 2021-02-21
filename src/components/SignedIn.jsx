import "../assets/css/SignedIn.css";
import React from 'react';
import { Home } from "./Home";
import { Editing } from "./Editing";
import { getTasks, addTask, editTask, deleteTask } from "../ultis/ultis";

export class SignedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      tasks: [],
      editedI: null,
    };
  }
  toggleEditing = (index = this.state.editedI) => {
    this.setState({
      editing: !this.state.editing,
      editedI: index,
    });
  }
  saveEdit = (id, title, content) => {
    let { tasks } = this.state,
      owner = this.props.userId;
    if (id === undefined) {
      addTask({ owner, title, content})
      .then((newId) => {
        tasks.push({ owner, id: newId, title, content });
        this.setState({ tasks, editing: false });
      });
    } else if (tasks[this.state.editedI].title !== title
      && tasks[this.state.editedI].title !== title) {
      editTask({ id, title, content })
      .then(() => {
        tasks[this.state.editedI] = { owner, id, title, content };
        this.setState({ tasks, editing: false });
      });
    } else {
      this.setState({ editing: false });
    }
  }
  tryDelete = (taskId, index) => {
    deleteTask(taskId).then(() => {
      let { tasks } = this.state;
      tasks.splice(index, 1);
      this.setState({ tasks });
    });
  }
  componentDidMount() {
    getTasks(this.props.userId).then((tasks) => {
      this.setState({ tasks });
    });
  }
  render() {
    let { editing, tasks, editedI } = this.state;
    return editing
      ? <Editing
          task={tasks[editedI]}
          toggleEditing={this.toggleEditing}
          saveEdit={this.saveEdit} />
      : <Home
          tasks={tasks}
          toggleEditing={this.toggleEditing}
          tryDelete={this.tryDelete} />;
  }
}