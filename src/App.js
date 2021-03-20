import "./App.css";
import { Component } from "react";
import {
  addKit,
  heroKit,
  updateKit,
  deleteKit,
  kitCate,
} from "./controllers/firestore";
import { Workbench } from "./components/Workbench";
import { Shelf } from "./components/Shelf";
import { Apprentice } from "./components/Apprentice";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UIstate: "viewing",
      skills: [],
      masteries: [],
      currentI: null,
      kitType: null,
      updating: false,
      nameExisted: false,
    };
  }
  setUI = (UIstate, kitType, currentI) => {
    const { skills, masteries } = this.state;
    this.setState({
      UIstate,
      kitType,
      currentI:
        UIstate === "creating"
          ? kitType === "skill"
            ? skills.length
            : masteries.length
          : currentI,
    });
  };
  search = (type, terms) => {
    if (type === "skills & masteries by hero") {
      heroKit(terms).then((kit) => {
        this.setState({
          skills: kit.skills.sort((a, b) => a.slot - b.slot),
          masteries: kit.masteries.sort((a, b) => a.slot - b.slot),
        });
      });
    } else {
      kitCate(terms.split(" "), type.substr(0, 5)).then((cate) => {
        if (type.substr(0, 5) === "skill") {
          this.setState({ skills: cate, masteries: [] });
        } else {
          this.setState({ skills: [], masteries: cate });
        }
      });
    }
  };
  tryUpdate = (newKit, action) => {
    this.setState({ updating: true });
    let { kitType } = this.state;
    if (action === "editing") {
      let { skills, masteries } = this.state;
      updateKit(newKit, kitType).then(() => {
        if (kitType === "skill") {
          skills[this.state.currentI] = newKit;
        } else {
          masteries[this.state.currentI] = newKit;
        }
        this.setState({ updating: false, UIstate: "viewing" });
      });
    } else if (action === "creating") {
      addKit(newKit, kitType)
        .then(() => this.setState({ updating: false, UIstate: "viewing" }))
        .catch(() => this.setState({ nameExisted: true }));
    }
  };
  tryDelete = (type, i) => {
    let { skills, masteries } = this.state;
    deleteKit(type === "skill" ? skills[i].name : masteries[i].name, type).then(
      () => {
        if (type === "skill") {
          skills.splice(i, 1);
          this.setState({ skills });
        } else {
          masteries.splice(i, 1);
          this.setState({ masteries });
        }
      }
    );
  };
  render() {
    const {
      UIstate,
      skills,
      masteries,
      currentI,
      kitType,
      updating,
    } = this.state;
    const content = {
      viewing: (
        <div>
          <Apprentice
            len={skills.length}
            search={this.search}
            setUI={this.setUI}
          />
          <Shelf
            skills={skills}
            masteries={masteries}
            setUI={this.setUI}
            tryDelete={this.tryDelete}
          />
        </div>
      ),
      editing: (
        <Workbench
          UIstate={UIstate}
          kit={kitType === "skill" ? skills[currentI] : masteries[currentI]}
          kitType={kitType}
          updating={updating}
          tryUpdate={this.tryUpdate}
          setUI={this.setUI}
        />
      ),
      creating: (
        <Workbench
          UIstate={UIstate}
          kit={kitType === "skill" ? skills[currentI] : masteries[currentI]}
          kitType={kitType}
          updating={updating}
          tryUpdate={this.tryUpdate}
          setUI={this.setUI}
        />
      ),
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
