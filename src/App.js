import "./App.css";
import { Component } from "react";
import { Home } from "./components/Home";
import { Playground } from "./components/Playground";
import { Message } from "./components/Message";
import "./partA";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UIstate: "welcome",
      questions: [],
      answers: [],
      currentQA: 0,
      score: 0,
    };
  }
  returnHome = () => {
    this.setState({ UIstate: "welcome" });
  };
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
    this.setState({ UIstate: "loading" });
    new Promise((res) => {
      fetch(
        `https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple`,
        { method: "GET" }
      )
        .then((data) => {
          return data.json();
        })
        .then((json) => {
          res(json.results);
        });
    }).then((data) => {
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
    });
  };
  render() {
    const { questions, answers, currentQA, score } = this.state,
      content = {
        welcome: <Home newGame={this.newGame} />,
        playground: (
          <Playground
            returnHome={this.returnHome}
            index={currentQA}
            question={questions[currentQA]}
            answer={answers[currentQA]}
            showMessage={this.showMessage}
            score={score}
          />
        ),
        right: <Message correct={true} backToPG={this.backToPG} />,
        wrong: <Message correct={false} backToPG={this.backToPG} />,
        end: <Home newGame={this.newGame} score={score} />,
        loading: (
          <div className="flex-center parent-size">
            <img src="https://i.gifer.com/YCZH.gif" alt="..." />
          </div>
        ),
      };
    return content[this.state.UIstate];
  }
}

export default App;
