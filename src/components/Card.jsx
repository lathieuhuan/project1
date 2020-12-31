import React from 'react'
import '../assets/css/Card.css'

let chosen = [];

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      faceUp: false,
      isDone: false,
    }
  }
  turnOver() {
    if (!this.state.faceUp) {
      this.setState({faceUp: true});
    } else {
      this.setState({faceUp: false});
    }
  }
  render () {
    // if (chosen.length === 2) {
    //   this.setState({isDone: chosen[0] === chosen[1] ? true : false});
    // }
    return (
      <div className={this.state.isDone ? "card invis" : "card"} data-no={this.props.cardNo} id={this.props.id}
      onClick={() => {
        this.turnOver();
        if (chosen.length < 2) {
          chosen.push(this.props.cardNo);
        }
        if (chosen.length === 2) {
          this.setState({isDone: chosen[0] === chosen[1] ? true : false});
          chosen = [this.props.cardNo];
        }
        console.log(chosen);
        }}>
        <img src={this.state.faceUp ? this.props.img : "cardback.jpg"} alt=""/>
      </div>
    )
  }
}

export {Card}