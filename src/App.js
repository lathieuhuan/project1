import "./App.css";
import { Component } from "react";
import { Welcome } from "./components/Welcome";
import { Playground } from "./components/Playground";
import { Message } from "./components/Message";
import "./components/partA";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UIstate: "welcome",
      data: [],
      questions: [],
      answers: [],
      currentQA: 0,
      score: 0,
    };
  }
  showMessage = (UIstate) => {
    const { score } = this.state;
    this.setState({ UIstate, score: UIstate === "right" ? score + 10 : score });
  };
  backToPG = () => {
    let { questions, currentQA } = this.state;
    currentQA++;
    if (currentQA === questions.length) {
      this.setState({ UIstate: "end" });
    } else {
      this.setState({
        UIstate: "playground",
        currentQA: this.state.currentQA + 1,
      });
    }
  };
  newGame = () => {
    const { data } = this.state;
    let questions = [],
      answers = [];
    data.forEach((ele) => {
      questions.push({ content: ele.question, difficulty: ele.difficulty });
      let rand = Math.floor(Math.random() * ele.incorrect_answers.length);
      ele.incorrect_answers.splice(rand, 0, ele.correct_answer);
      answers.push({
        content: ele.incorrect_answers,
        correctI: rand,
      });
    });
    this.setState({
      UIstate: "playground",
      questions,
      answers,
      currentQA: 0,
      score: 0,
    });
  };
  componentDidMount() {
    new Promise((res) => {
      fetch(
        `https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple`,
        { method: "GET" }
      )
        .then((data) => {
          return data.json();
        })
        .then((json) => {
          res(json.results);
        });
    }).then((data) => {
      this.setState({ data });
    });
  }
  render() {
    const { questions, answers, currentQA, score } = this.state,
      content = {
        welcome: <Welcome newGame={this.newGame} />,
        playground: (
          <Playground
            index={currentQA}
            question={questions[currentQA]}
            answer={answers[currentQA]}
            showMessage={this.showMessage}
            score={score}
          />
        ),
        right: <Message correct={true} backToPG={this.backToPG} />,
        wrong: <Message correct={false} backToPG={this.backToPG} />,
        end: <Welcome newGame={this.newGame} score={score} />,
      };
    return content[this.state.UIstate];
  }
}

export default App;
