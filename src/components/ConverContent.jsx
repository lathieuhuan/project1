import "../assets/css/ConverContent.css";
import React from "react";
import { subscribeConver } from "../ultis/ultis";

export class ConverContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      converId: null,
      messages: [],
    };
  }
  componentDidUpdate() {
    const { conver } = this.props;
    if (conver.id !== this.state.converId) {
      this.setState({ converId: conver.id, messages: [] });
      subscribeConver(conver.id, (data) => {
        let mss = this.state.messages;
        mss.push(data);
        this.setState({ messages: mss });
      });
    }
  }
  render() {
    const mss = this.state.messages.sort((a, b) => a.dateVal - b.dateVal);
    return (
      <div className="flex-col" id="conver-content" >
        {mss.map((ms, i) => {
          const type = this.props.userId === ms.ownerId ? "out" : "in";
          return (
            <p key={i} className={"message " + type}>{ms.content}</p>
          );
          })}
      </div>
    );        
  }
}