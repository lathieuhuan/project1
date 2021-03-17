import "../assets/css/Playground.css";
import React from "react";

export class Playground extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chosen: null };
  }
  choose = (chosen) => {
    this.setState({ chosen });
  }
  render() {
    const { index, question, answer, showMessage, score } = this.props;
    return (
      <div className="flex-col-center parent-size" id="playground">
        <button id="return-home" onClick={this.props.returnHome}>
          Main Menu
        </button>
        <p id="score">Score: {score}</p>
        <p id="pg_title">Question {index + 1}: {question.difficulty}</p>
        <p id="question">{question.content}</p>
        <div id="answers">
          {answer.content.map((val, i) => {
            return (
              <p key={i}
                className={"choice" + (i === this.state.chosen ? " chosen" : "")}
                onClick={() => this.choose(i)}
              >
                {val}
              </p>
            );
          })}
        </div>
        <button
          id="submit"
          onClick={() => {
            if (this.state.chosen !== null) {
                this.choose(null);
                if (this.state.chosen === answer.correctI) {
                showMessage("right");
                } else {
                showMessage("wrong");
                }
            }
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}