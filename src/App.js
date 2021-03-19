import "./App.css";
import { Component } from "react";
import { heroKit } from "./controllers/firestore";
import { Workbench } from "./components/Workbench";
import { Shelf } from "./components/Shelf";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UIstate: "viewing",
      skills: [],
      currentI: null,
    };
  }
  setUI = (UIstate, currentI) => {
    this.setState({ UIstate, currentI });
  };
  search = (type, terms) => {
    if (type === "skills & masteries by hero") {
      heroKit(terms).then((skills) => this.setState({ skills }));
    }
  };
  render() {
    const { UIstate, skills, currentI } = this.state;
    const content = {
      viewing: (
        <Shelf skills={skills} setUI={this.setUI} search={this.search} />
      ),
      editing: <Workbench skill={skills[currentI]} />,
    };
    return (
      <div className="parent-size">
        <div id="header"></div>
        {content[UIstate]}
      </div>
    );
  }
}

export default App;
