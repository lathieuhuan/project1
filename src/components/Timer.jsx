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
    // console.log(this.props.run);
    let centis = this.state.count % 100,
      sec = (this.state.count - centis) / 100 % 60,
      min = Math.floor(this.state.count / 6000);
    return <span>
      {min + ":" + (sec < 10 ? "0" + sec : sec)
      + ":" + (centis < 10 ? "0" + centis : centis)}
    </span>;
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

export { Timer, Portal }