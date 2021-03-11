import "../../assets/css/cmg/Setup.css";
import React from "react";
import fullscreenOn from "../../assets/images/fullscreen_on.png";
import fullscreenOff from "../../assets/images/fullscreen_off.png";

export class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownShown: false,
      difficulty: props.difficulty,
      type: props.type,
    };
    this.typeRef = React.createRef();
  }
  openFullscreen = () => {
    let elm = document.getElementById("cmg_app");
    if (elm.requestFullscreen) {
      elm.requestFullscreen();
    } else if (elm.webkitRequestFullscreen) { // Safari
      elm.webkitRequestFullscreen();
    } else if (elm.msRequestFullscreen) { // IE11
      elm.msRequestFullscreen();
    }
  }
  closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { // Safari
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE11
      document.msExitFullscreen();
    }
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
  handleFsChange = () => {
    this.props.toggleFullscreen();
  }
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
    document.addEventListener("fullscreenchange", this.handleFsChange);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
    document.removeEventListener("fullscreenchange", this.handleFsChange);
  }
  render() {
    const { dropdownShown, difficulty, type } = this.state;
    return (
      <div className="border-2 radius-10 col-center" id="cmg_setup">
        <div id="cmg_fs-bar">
          <p className="cmgst_heading">Full screen</p>
          <div
            id="cmg_fs-btn"
            onClick={() => {
              this.props.fullscreen ? this.closeFullscreen() : this.openFullscreen();
          }}>
            <img
              className="parent-size"
              src={this.props.fullscreen ? fullscreenOn : fullscreenOff}
              alt="fs"
            />
          </div>
        </div>
        <div className="flex mgbtm-20">
          <div className="group col-center">
            <p className="cmgst_heading">Choose difficulty:</p>
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
            <p className="cmgst_heading">Choose card type:</p>
            <div ref={this.typeRef} className="card-type" onClick={this.toggleDropdown}>
              <p className="show-line right-bg-img border-1 radius-5 padding-5-10">{type}</p>
              {dropdownShown ? (
                <div className="dropdown border-1">
                  <input
                    className="type-btn padding-5-10"
                    type="button"
                    name="type"
                    value="classic"
                    onClick={this.changeState}
                  />
                  <input
                    className="type-btn padding-5-10"
                    type="button"
                    name="type"
                    value="lol champions"
                    onClick={this.changeState}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <button className="start-btn radius-5 padding-10"
          onClick={() => this.props.startGame(difficulty, type)}
        >
          NEW GAME
        </button>
      </div>
    );
  }
}