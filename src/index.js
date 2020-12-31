import React from "react";
import ReactDOM from "react-dom";

class Football extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.shoot = this.shoot.bind(this)
  // }
  shoot() {
    alert(this);
  }
  render() {
    return <button onClick={() => this.shoot()}>Take the shot!</button>;
  }
}

ReactDOM.render(<Football />, document.getElementById("root"));
