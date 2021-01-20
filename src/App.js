import "./App.css";
import { Component } from "react";
import { NavBar } from "./components/NavBar";
import { Intro } from "./components/Intro";
import { SigningUp } from "./components/SigningUp";
import { Redirecting } from "./components/Redirecting";
import { SignedIn } from "./components/SignedIn";
// import { signUp, addTask, editTask, getTasks } from "./ultis/ultis";

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
    this.state = { userId: null, UIstate: "intro" };
  }
  changeUI = (UIstate) => {
    this.setState({ UIstate: UIstate });
  };
  changeId = (id) => {
    this.setState({ userId: id });
  };
  render() {
    let { userId, UIstate } = this.state,
      content = {
        intro: <Intro changeUI={this.changeUI} />,
        "signing-up": (
          <SigningUp changeUI={this.changeUI} changeId={this.changeId} />
        ),
        "signed-in": <SignedIn userId={userId} changeUI={this.changeUI} />,
      };
    return (
      <div id="app-con">
        <NavBar
          UIstate={UIstate}
          changeUI={this.changeUI}
          changeId={this.changeId}
        />
        <div id="content">
          {content[UIstate] === undefined ? (
            <Redirecting UIstate={UIstate} changeUI={this.changeUI} />
          ) : (
            content[UIstate]
          )}
        </div>
      </div>
    );
  }
}

export default App;
