import "./App.css";
import { Component } from "react";
import {
  addKit,
  heroKit,
  updateKit,
  deleteKit,
  kitCat,
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
      allowDup: false,
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
      nameExisted: false,
    });
  };
  search = (type, terms) => {
    document.documentElement.scroll(0, 0);
    if (type === "skills & masteries by hero") {
      heroKit(terms).then((kit) => {
        this.setState({
          skills: kit.skills.sort((a, b) => a.slot - b.slot),
          masteries: kit.masteries.sort((a, b) => a.slot - b.slot),
        });
      });
    } else {
      kitCat(terms.trim().split(" "), type.substr(0, 5)).then((cat) => {
        if (type.substr(0, 5) === "skill") {
          this.setState({ skills: cat, masteries: [] });
        } else {
          this.setState({ skills: [], masteries: cat });
        }
      });
    }
  };
  tryUpdate = (newKit, action) => {
    this.setState({ updating: true });
    let { kitType, allowDup } = this.state;
    if (action === "editing") {
      let { skills, masteries } = this.state;
      updateKit(newKit, kitType, allowDup)
        .then(() => {
          if (kitType === "skill") {
            skills[this.state.currentI] = newKit;
          } else {
            masteries[this.state.currentI] = newKit;
          }
          this.setState({
            UIstate: "viewing",
            nameExisted: false,
            updating: false,
            allowDup: false,
          });
        })
        .catch(() => this.setState({ nameExisted: true, updating: false }));
    } else if (action === "creating") {
      addKit(newKit, kitType, allowDup)
        .then(() =>
          this.setState({
            UIstate: "viewing",
            nameExisted: false,
            updating: false,
            allowDup: false,
          })
        )
        .catch(() => this.setState({ nameExisted: true, updating: false }));
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
  toggleDup = () => {
    this.setState({ allowDup: !this.state.allowDup });
  };
  render() {
    const { UIstate, skills, masteries, currentI, kitType } = this.state;
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
            search={this.search}
          />
        </div>
      ),
      editing: (
        <Workbench
          UIstate={UIstate}
          kit={kitType === "skill" ? skills[currentI] : masteries[currentI]}
          kitType={kitType}
          updating={this.state.updating}
          tryUpdate={this.tryUpdate}
          setUI={this.setUI}
          nameExisted={this.state.nameExisted}
          allowDup={this.state.allowDup}
          toggleDup={this.toggleDup}
        />
      ),
      creating: (
        <Workbench
          UIstate={UIstate}
          kit={kitType === "skill" ? skills[currentI] : masteries[currentI]}
          kitType={kitType}
          updating={this.state.updating}
          tryUpdate={this.tryUpdate}
          setUI={this.setUI}
          nameExisted={this.state.nameExisted}
          allowDup={this.state.allowDup}
          toggleDup={this.toggleDup}
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
