import "../../assets/css/1024/TopBar.css";
import React from "react";
import fullscreenOn from "../../assets/images/fullscreen_on.png";
import fullscreenOff from "../../assets/images/fullscreen_off.png";

export class TopBar extends React.Component {
  openFullscreen = () => {
    let elm = document.getElementById("g1024_app");
    if (elm.requestFullscreen) {
      elm.requestFullscreen();
    } else if (elm.webkitRequestFullscreen) {
      elm.webkitRequestFullscreen();
    } else if (elm.msRequestFullscreen) {
      elm.msRequestFullscreen();
    }
  }
  closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
  handleFsChange = () => {
    this.props.toggleFullscreen();
  }
  componentDidMount() {
    document.addEventListener("fullscreenchange", this.handleFsChange);
  }
  componentWillUnmount() {
    document.removeEventListener("fullscreenchange", this.handleFsChange);
  }
  render() {
    const { fullscreen, plus } = this.props;
    return (
      <div id="g1024_top-bar">
        <div id="g1024_fs-bar">
          <p className="g1024tb_heading">Full screen</p>
          <div
            id="g1024_fs-btn"
            onClick={() => {
              fullscreen ? this.closeFullscreen() : this.openFullscreen();
            }}
          >
            <img
              className="parent-size"
              src={fullscreen ? fullscreenOn : fullscreenOff}
              alt="fs"
            />
          </div>
        </div>
        <div id="g1024_control-bar">
          <button
            className="start-btn"
            onClick={this.props.startGame}
            // somehow this btn stay focus after click, below is to fix it
            onMouseUp={(e) => {
              e.target.blur();
            }}
          >
            NEW GAME
          </button>
          <div id="g1024_score">
            <p className="desc">SCORE:</p>
            <p className="num">{this.props.points}</p>
            <p
              className={"plus" + (!plus ? "" : " ascend-fade")}
              onAnimationEnd={this.props.nullifyPlus}
            >
              {"+" + plus}
            </p>
          </div>
        </div>
      </div>
    );
  }
}