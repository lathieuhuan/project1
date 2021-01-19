import "./App.css";
import { Component } from "react";
import { NavBar } from "./components/NavBar";
import { Intro } from "./components/Intro";
import { SigningUp } from "./components/SigningUp";
// import { signUp, addTask, editTask, getTasks } from "./ultis/ultis";

// signUp({ username: "john", password: "123" })
//   .then((userId) => {
//     console.log(userId);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// addTask({
//   owner: "w6whE4WVpHH8rHDWBNyT",
//   title: "do exercise",
//   content: "push-up",
// });

// editTask({
//   taskId: "UMHFPI1cv2bMx2deFx4K",
//   title: "homework",
//   content: "Math",
// }).then(() => {
//   console.log("Success");
// });

// getTasks("YqtfiyUu2jgt2Fwu3QsH")
//   .then((tasks) => {
//     console.log(tasks);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { UIstate: "intro" };
  }
  changeUI = (UIstate) => {
    this.setState({ UIstate: UIstate });
  };
  render() {
    let content,
      { UIstate } = this.state;
    if (UIstate === "intro") {
      content = <Intro changeUI={this.changeUI} />;
    } else if (UIstate === "signing-up") {
      content = <SigningUp changeUI={this.changeUI} />;
    }
    return (
      <div id="app-con">
        <NavBar UIstate={UIstate} changeUI={this.changeUI} />
        <div id="content">{content}</div>
      </div>
    );
  }
}

export default App;
