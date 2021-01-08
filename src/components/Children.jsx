import React from 'react'
import ReactDOM from 'react-dom';
import '../assets/css/Children.css'

class Timer extends React.Component {
  render() {
    let centis = this.props.time % 100,
        sec = (this.props.time - centis) / 100 % 60;
        // min = Math.floor(this.props.time / 6000);
    return <span>
      {(sec < 10 ? "0" + sec : sec) + ":" + 
      (centis < 10 ? "0" + centis : centis)}
    </span>;
  }
}

class PauseBtn extends React.Component {
  render() {
    return <div id="pause-btn" onClick={() => this.props.switchPause()}>
      <i className={
        this.props.gameState === "Paused" ? "fa fa-play" : "fa fa-pause"
      }></i>
    </div>;
  }
}

class Portal extends React.Component {
    render () {
      return ReactDOM.createPortal(
        this.props.child,
        document.getElementById(this.props.container)
      );
    }
}

export { Timer, PauseBtn, Portal }