import React from 'react'
import ReactDOM from 'react-dom';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.timer = 0;
  }
  count = () => {
    this.setState(({count}) => ({count: count + 1}));
  }
  componentDidMount() {
    this.timer = setInterval(this.count, 10);
  }
  render() {
    let centis = this.state.count % 100,
        sec = (this.state.count - centis) / 100 % 60,
        min = Math.floor(this.state.count / 6000);
    if (!this.props.running) {
      clearInterval(this.timer);
    } else if (this.state.count === 1500) {
      this.props.stopGame();
    }
    if (this.props.gameState === "Won") {
      this.props.saveScore(this.state.count);
    }
    return <span>
      {min + ":" + (sec < 10 ? "0" + sec : sec)
      + ":" + (centis < 10 ? "0" + centis : centis)}
    </span>;
  }
}

class Record extends React.Component {
  render() {
    console.log(this.props.score);
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