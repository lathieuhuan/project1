import "../../assets/css/2048/TopBar.css";
import React from "react";

export class TopBar extends React.Component {
  openFullscreen = () => {
    let elm = document.getElementById("g2048_app");
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
      <div id="g2048_top-bar">
        <div id="g2048_fs-bar">
          <p className="g2048tb_heading">Full screen</p>
          <div
            id="g2048_fs-btn"
            onClick={() => {
              fullscreen ? this.closeFullscreen() : this.openFullscreen();
            }}
          >
            <img
              className="parent-size"
              src={fullscreen
                ? "http://www.clker.com/cliparts/8/8/2/2/1195423990759977006molumen_multicolor_power_buttons_5.svg.med.png"
                : "https://images.all-free-download.com/images/graphiclarge/red_power_button_clip_art_9034.jpg"}
              alt="fs"
            />
          </div>
        </div>
        <div id="g2048_control-bar">
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
          <div id="g2048_score">
            <p className="desc">SCORE:</p>
            <p className="num">{this.props.points}</p>
            <p
              className={"plus" + (plus === null ? "" : " ascend-fade")}
              onAnimationEnd={this.props.nullifyPlus}
            >
              {plus}
            </p>
          </div>
        </div>
      </div>
    );
  }
}