import "../assets/css/ConverContent.css";
import React from "react";
import { subscribeConver } from "../ultis/ultis";

export class ConverContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      converId: "VQDiXB74gws3PRAdgtTx",
      messages: [],
    };
  }
  componentDidUpdate() {
    const { conver } = this.props;
    // console.log(conver);
    if (conver.converId !== this.state.converId) {
      subscribeConver(conver.converId, (data) => {
        console.log(data);
      });
    }
  }
  render() {
    return (
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
      );        
  }
}