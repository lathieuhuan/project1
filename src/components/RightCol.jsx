import "../assets/css/RightCol.css";
import React from "react";

export class RightCol extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }
  handleChange = (e) => {
    this.setState({ message: e.target.value })
  }
  render() {
    return (
      <div className="right-col">
        <div className="flex-col wide-padding" id="message-area">
          <h1>???</h1>
          <div className="flex">
            <div>
              <p>Bla bla</p>
              <p>Bla bla</p>
            </div>
            <div>
              <p>Blo Blo</p>
              <p>Blo Blo</p>
            </div>
          </div>
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