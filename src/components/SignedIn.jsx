import "../assets/css/SignedIn.css";
import React from 'react';
import { Home } from "./Home";
import { Editing } from "./Editing";
import { getTasks } from "../ultis/ultis";

export class SignedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UIstate: "home",
      tasks: null,
    };
  }
  componentDidMount() {
    getTasks(this.props.userId).then((tasks) => {
      this.setState({ tasks: tasks });
    });
  }
  render() {
    let { UIstate, tasks } = this.state;
    return this.state.tasks === null ? null
      : UIstate === "home" ? <Home tasks={tasks} /> : <Editing />;
  }
}