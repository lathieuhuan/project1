import "../assets/css/RightCol.css";
import React from "react";
import { ConverContent } from "./ConverContent";
import { sendMessage } from "../ultis/ultis"

export class RightCol extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }
  handleChange = (e) => {
    this.setState({ message: e.target.value })
  }
  send = () => {
    sendMessage({
      dateVal: new Date().valueOf(),
      ownerId: this.props.userId,
      content: this.state.message,
      type: "txt",
      converId: this.props.conver.id,
    }).then(() => {
      this.setState({ message: ""});
      document.getElementById("conver-content").scroll({
        left: 0,
        top: 9999,
        behavior: "auto",
      });
    })
  }
  render() {
    const { userId, conver } = this.props;
    return (
      <div className="right-col">
        <div className="flex-col wide-padding" id="message-area">
          <div className="flex">
            <img className="avatar" src={conver?.frInfo.avatar} alt=""/>
            <h1>{conver?.frInfo.username}</h1>
          </div>
          <ConverContent userId={userId} conver={conver} />
        </div>
        <div className="flex-between narrow-padding" id="input-area">
          <input
            type="text"
            placeholder="Enter your message..."
            id="ms-box"
            value={this.state.message}
            onChange={this.handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") this.send();
            }}
          />
          <button id="send-btn" onClick={this.send}>Send</button>
        </div>
      </div>
    );
  }
}