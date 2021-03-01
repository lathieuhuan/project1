import "../../assets/css/cmg/Setup.css";
import React from "react";

export class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dropdownShown: false, difficulty: "easy", type: "classic" };
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
      <div className="border-2 radius-10 padding-20 col-center" id="cmgrc_setup">
        <div className="group col-center">
          <p className="cmgrc_heading">Choose difficulty:</p>
          <div>
            <input
              className="dfc-radio"
              type="radio"
              name="difficulty"
              value="easy"
              checked={difficulty === "easy"}
              onChange={this.changeState}
            />
            <label htmlFor="Easy">Easy</label>
            <input
              className="dfc-radio"
              type="radio"
              name="difficulty"
              value="hard"
              checked={difficulty === "hard"}
              onChange={this.changeState}
            />
            <label htmlFor="Hard">Hard</label>
          </div>
        </div>
        <div className="group col-center">
          <p className="cmgrc_heading">Choose card type:</p>
          <div ref={this.typeRef} className="card-type" onClick={this.toggleDropdown}>
            <p className="show-line right-bg-img border-1 radius-5 padding-5-10">{type}</p>
            {dropdownShown ? (
              <div className="dropdown border-1">
                <input
                  className="type-btn padding-5-10 radius-5"
                  type="button"
                  name="type"
                  value="classic"
                  onClick={this.changeState}
                />
                <input
                  className="type-btn padding-5-10 radius-5"
                  type="button"
                  name="type"
                  value="lol champions"
                  onClick={this.changeState}
                />
              </div>
            ) : null}
          </div>
        </div>
        <button className="start-btn radius-5 padding-5-10"
          onClick={() => this.props.startGame(difficulty, type)}
        >
          START
        </button>
      </div>
    );
  }
}