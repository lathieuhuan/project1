import "../../assets/css/cmgCss/Setup.css";
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
      <div className="col-container" id="setup">
        <div className="group col-container">
          <label>Choose difficulty:</label>
          <div>
            <input
              type="radio"
              name="difficulty"
              className="difficulty"
              value="Easy"
              checked={difficulty === "Easy"}
              onChange={this.changeState}
            />
            <label htmlFor="easy">Easy</label>
            <input
              type="radio"
              name="difficulty"
              className="difficulty"
              value="Hard"
              checked={difficulty === "Hard"}
              onChange={this.changeState}
            />
            <label htmlFor="hard">Hard</label>
          </div>
        </div>
        <div className="group col-container">
          <label>Choose card type:</label>
          <div ref={this.typeRef} id="card-type" onClick={this.toggleDropdown}>
            <p id="show-line">{type}</p>
            <div id="dropdown" style={{ display: dropdownShown ? "block" : "none" }}>
              <input type="button" name="type" className="type" value="Classic"
                onClick={this.changeState} />
              <input type="button" name="type" className="type" value="LoL Champions"
                onClick={this.changeState} />
            </div>
          </div>
        </div>
        <button id="start" onClick={() => this.props.startGame(difficulty, type)}>
          START
        </button>
      </div>
    );
  }
}