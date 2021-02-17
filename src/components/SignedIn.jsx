import "../assets/css/SignedIn.css";
import React from "react";
import { LeftCol } from "./LeftCol";
import { RightCol } from "./RightCol";

export class SignedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentConver: null };
  }
  changeConver = (conver) => {
    this.setState({ currentConver: conver });
  };
  render() {
    const { userInfo, signOut } = this.props;
    return (
      <div className="flex" id="chat-app">
        <LeftCol userInfo={userInfo} changeConver={this.changeConver} signOut={signOut} />
        <RightCol
          userId={userInfo.id}
          conver={this.state.currentConver}
        />
      </div>
    );
  }
}