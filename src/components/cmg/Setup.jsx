import "../../assets/css/cmg/Setup.css";
import React from "react";

export class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dropdownShown: false, difficulty: "Easy", type: "Classic" };
    this.typeRef = React.createRef();
  }
  changeState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  toggleDropdown = () => {
    this.setState({ dropdownShown: !this.state.dropdownShown });
  }
  handleClickOutside = (e) => {
    if (!this.typeRef.current.contains(e.target) && this.state.dropdownShown) {
      this.toggleDropdown();
    }
  }
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }
  render() {
    const { dropdownShown, difficulty, type } = this.state;
    return (
      <div className="setup col-center wide-padding thinner-border medium-b-radius">
        <div className="group col-center">
          <label>Choose difficulty:</label>
          <div>
            <input
              type="radio"
              name="difficulty"
              value="Easy"
              checked={difficulty === "Easy"}
              onChange={this.changeState}
            />
            <label htmlFor="easy">Easy</label>
            <input
              type="radio"
              name="difficulty"
              value="Hard"
              checked={difficulty === "Hard"}
              onChange={this.changeState}
            />
            <label>Hard</label>
          </div>
        </div>
        <div className="group col-center">
          <label>Choose card type:</label>
          <div ref={this.typeRef} className="card-type" onClick={this.toggleDropdown}>
            <p className="show-line thinnest-border">{type}</p>
            <div className="dropdown thinnest-border" style={{ display: dropdownShown ? "block" : "none" }}>
              <input
                type="button"
                name="type"
                value="Classic"
                onClick={this.changeState}
              />
              <input
                type="button"
                name="type"
                value="LoL Champions"
                onClick={this.changeState}
              />
            </div>
          </div>
        </div>
        <button className="start narrow-padding small-b-radius"
          onClick={() => this.props.startGame(difficulty, type)}
        >
          START
        </button>
      </div>
    );
  }
}