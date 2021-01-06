import React from 'react'
import ReactDOM from 'react-dom';

class Timer extends React.Component {
  render() {
    let centis = this.props.time % 100,
        sec = (this.props.time - centis) / 100 % 60,
        min = Math.floor(this.props.time / 6000);
    return <span>
      {min + ":" + (sec < 10 ? "0" + sec : sec)
      + ":" + (centis < 10 ? "0" + centis : centis)}
    </span>;
  }
}

class Record extends React.Component {
  render() {
    return <span>{this.props.score}</span>;
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

export { Timer, Record, Portal }