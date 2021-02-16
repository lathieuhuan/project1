import "../assets/css/RightCol.css";
import React from "react";
import { ConverContent } from "./ConverContent";

export class RightCol extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }
  handleChange = (e) => {
    this.setState({ message: e.target.value })
  }
  render() {
    const { userId, conver } = this.props;
    return (
      <div className="right-col">
        <div className="flex-col wide-padding" id="message-area">
          <div className="flex">
            <img className="avatar" src={conver?.FrInfo.avatar} alt=""/>
            <h1>{conver?.FrInfo.username}</h1>
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
          />
          <button id="send-btn">Send</button>
        </div>
      </div>
    );
  }
}