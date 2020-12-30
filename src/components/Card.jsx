import React from 'react'
import '../assets/css/Card.css'

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            faceUp: false,
            isDone: false
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
        return (
            <div class="card" data-no="no-${shuffled[i]}"></div>
        )
    }
}

export {Card}